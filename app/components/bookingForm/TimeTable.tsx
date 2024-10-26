import prisma from "@/app/lib/db";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";


interface iappProps {
    selectedDate: Date;
    userName: string;
    meetingDuration: number;
}

async function getAvailability(selectedDate: Date, userName: string) {
    const currentDay = format(selectedDate, "EEEE");

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);
    const data = await prisma.availability.findFirst({
        where: {
            day: currentDay as Prisma.EnumDayFilter,
            User: {
                userName: userName,
            },
        },
        select: {
            fromTime: true,
            tillTime: true,
            id: true,
            User: {
                select: {
                    grantEmail: true,
                    grantId: true,
                },
            },
        },
    });

    return data;
}

export async function TimeTable({
    selectedDate,
    userName,
    meetingDuration,
}: iappProps) {
    const data = await getAvailability(selectedDate, userName);

    return (
        <div>TimeTable</div>
    )
}
