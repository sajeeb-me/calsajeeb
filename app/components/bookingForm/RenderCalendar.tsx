"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "./Calender";
import { useState, useEffect } from "react";
import { CalendarDate, DateValue, getLocalTimeZone, today, parseDate } from "@internationalized/date";

interface iAppProps {
    daysOfWeek: { day: string; isActive: boolean }[];
}

export function RenderCalendar({ daysOfWeek }: iAppProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [date, setDate] = useState<CalendarDate>(() => {
        const dateParam = searchParams.get("date");
        return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
    });

    useEffect(() => {
        const dateParam = searchParams.get("date");
        if (dateParam) {
            setDate(parseDate(dateParam));
        }
    }, [searchParams]);

    const handleChangeDate = (date: DateValue) => {
        setDate(date as CalendarDate);
        const url = new URL(window.location.href);

        url.searchParams.set("date", date.toString());

        router.push(url.toString());
    };

    const isDateUnavailable = (date: DateValue) => {
        const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
        // Adjust the index to match the daysOfWeek array
        const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        return !daysOfWeek[adjustedIndex].isActive;
    };

    return (
        <Calendar
            minValue={today(getLocalTimeZone())}
            defaultValue={today(getLocalTimeZone())}
            value={date}
            onChange={handleChangeDate}
            isDateUnavailable={isDateUnavailable}
        />
    );
}