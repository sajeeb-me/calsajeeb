"use server";

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import { aboutSettingsSchema, EventTypeServerSchema, onboardingSchemaValidation } from "./lib/zodSchemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function OnboardingAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: onboardingSchemaValidation({
            async isUsernameUnique() {
                const existingUsername = await prisma.user.findUnique({
                    where: {
                        userName: formData.get("userName") as string,
                    },
                });

                return !existingUsername;
            }
        }),

        async: true,
    });

    if (submission.status !== "success") {
        return submission.reply()
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            userName: submission.value.userName,
            name: submission.value.fullName,
            availability: {
                createMany: {
                    data: [
                        {
                            day: "Monday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Tuesday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Wednesday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Thursday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Friday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Saturday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Sunday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                    ]
                }
            }
        },
    });

    return redirect("/onboarding/grant-id");
}

export async function SettingsAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: aboutSettingsSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const user = await prisma.user.update({
        where: {
            id: session.user?.id as string,
        },
        data: {
            name: submission.value.fullName,
            image: submission.value.profileImage,
        },
    });

    return redirect("/dashboard");
}

export async function updateAvailabilityAction(formData: FormData) {
    const session = await requireUser();

    const rawData = Object.fromEntries(formData.entries());
    const availabilityData = Object.keys(rawData)
        .filter((key) => key.startsWith("id-"))
        .map((key) => {
            const id = key.replace("id-", "");
            return {
                id,
                isActive: rawData[`isActive-${id}`] === "on",
                fromTime: rawData[`fromTime-${id}`] as string,
                tillTime: rawData[`tillTime-${id}`] as string,
            };
        });

    try {
        await prisma.$transaction(
            availabilityData.map((item) =>
                prisma.availability.update({
                    where: { id: item.id },
                    data: {
                        isActive: item.isActive,
                        fromTime: item.fromTime,
                        tillTime: item.tillTime,
                    },
                })
            )
        );

        revalidatePath("/dashboard/availability");
        return { status: "success", message: "Availability updated successfully" };
    } catch (error) {
        console.error("Error updating availability:", error);
        return { status: "error", message: "Failed to update availability" };
    }
}

export async function CreateEventTypeAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: EventTypeServerSchema({
            async isUrlUnique() {
                const data = await prisma.eventType.findFirst({
                    where: {
                        userId: session.user?.id,
                        url: formData.get("url") as string,
                    },
                });
                return !data;
            },
        }),

        async: true,
    });
    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.eventType.create({
        data: {
            title: submission.value.title,
            duration: submission.value.duration,
            url: submission.value.url,
            description: submission.value.description,
            userId: session.user?.id as string,
            videoCallSoftware: submission.value.videoCallSoftware,
        },
    });

    return redirect("/dashboard");
}