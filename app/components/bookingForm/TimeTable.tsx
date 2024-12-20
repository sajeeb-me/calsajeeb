import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { addMinutes, format, fromUnixTime, isAfter, isBefore, parse } from "date-fns";
import Link from "next/link";
import { GetFreeBusyResponse, NylasResponse } from "nylas";


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

    const nylasCalendarData = await nylas.calendars.getFreeBusy({
        identifier: data?.User?.grantId as string,
        requestBody: {
            startTime: Math.floor(startOfDay.getTime() / 1000),
            endTime: Math.floor(endOfDay.getTime() / 1000),
            emails: [data?.User?.grantEmail as string],
        },
    });

    return { data, nylasCalendarData };
}

function calculateAvailableTimeSlots(
    dbAvailability: {
        fromTime: string | undefined;
        tillTime: string | undefined;
    },
    nylasData: NylasResponse<GetFreeBusyResponse[]>,
    date: string,
    duration: number
) {
    const now = new Date();

    const availableFrom = parse(
        `${date} ${dbAvailability.fromTime}`,
        "yyyy-MM-dd HH:mm",
        new Date()
    )
    const availableTill = parse(
        `${date} ${dbAvailability.tillTime}`,
        "yyyy-MM-dd HH:mm",
        new Date()
    )

    // Extract busy slots from Nylas data
    // @ts-ignore
    const busySlots = nylasData.data[0].timeSlots.map((slot: any) => ({
        start: fromUnixTime(slot.startTime),
        end: fromUnixTime(slot.endTime),
    }));

    // Generate all possible 30-minute slots within the available time
    const allSlots = [];
    let currentSlot = availableFrom;
    while (isBefore(currentSlot, availableTill)) {
        allSlots.push(currentSlot);
        currentSlot = addMinutes(currentSlot, duration);
    }

    // Filter out busy slots and slots before the current time
    const freeSlots = allSlots.filter((slot) => {
        const slotEnd = addMinutes(slot, duration);
        return (
            isAfter(slot, now) && // Ensure the slot is after the current time
            !busySlots.some(
                (busy: { start: any; end: any }) =>
                    (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
                    (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) ||
                    (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
            )
        );
    });

    // Format the free slots
    return freeSlots.map((slot) => format(slot, "HH:mm"));
}

export async function TimeTable({
    selectedDate,
    userName,
    meetingDuration,
}: iappProps) {
    const { data, nylasCalendarData } = await getAvailability(selectedDate, userName);

    const dbAvailability = { fromTime: data?.fromTime, tillTime: data?.tillTime };

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    const availableSlots = calculateAvailableTimeSlots(
        dbAvailability,
        nylasCalendarData,
        formattedDate,
        meetingDuration
    );

    return (
        <div>
            <p className="text-base font-semibold">
                {format(selectedDate, "EEE")}.{" "}
                <span className="text-sm text-muted-foreground">
                    {format(selectedDate, "MMM. d")}
                </span>
            </p>

            <div className="mt-3 max-h-[350px] overflow-y-auto">
                {availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => (
                        <Link
                            key={index}
                            href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
                        >
                            <Button variant="outline" className="w-full mb-2">
                                {slot}
                            </Button>
                        </Link>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-sm font-medium text-muted-foreground mt-12">
                            No available time slots for this date.
                        </p>
                        <svg
                            className="w-16 h-16 text-gray-400 mt-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                            ></path>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    )
}