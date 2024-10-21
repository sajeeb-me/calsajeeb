import { SettingsForm } from "@/app/components/SettingsForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(id: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            name: true,
            email: true,
            image: true,
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export default function SettingsRoute() {
    return (
        <>
            <SettingsForm />
        </>
    )
}