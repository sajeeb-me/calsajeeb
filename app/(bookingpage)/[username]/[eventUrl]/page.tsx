import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import { TimeTable } from "@/app/components/bookingForm/TimeTable";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(userName: string, eventUrl: string) {
    const eventType = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            user: {
                userName: userName,
            },
            active: true,
        },
        select: {
            id: true,
            description: true,
            title: true,
            duration: true,
            videoCallSoftware: true,

            user: {
                select: {
                    image: true,
                    name: true,
                    availability: {
                        select: {
                            day: true,
                            isActive: true,
                        },
                    },
                },
            },
        },
    });

    if (!eventType) {
        return notFound();
    }

    return eventType;
}

export default async function BookingFormRoute({
    params,
    searchParams,
}: {
    params: { username: string; eventUrl: string };
    searchParams: { date?: string; time?: string };
}) {
    const selectedDate = searchParams.date
        ? new Date(searchParams.date)
        : new Date();

    const eventType = await getData(params.username, params.eventUrl);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(selectedDate);

    const showForm = !!searchParams.date && !!searchParams.time;

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            {
                showForm ? (
                    <Card className="max-w-[600px]">
                        <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr] gap-4">
                            <div>
                                <Image
                                    src={eventType.user?.image as string}
                                    alt={`${eventType.user?.name}'s profile picture`}
                                    className="size-9 rounded-full"
                                    width={30}
                                    height={30}
                                />
                                <p className="text-sm font-medium text-muted-foreground mt-1">
                                    {eventType.user?.name}
                                </p>
                                <h1 className="text-xl font-semibold mt-2">{eventType.title}</h1>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {eventType.description}
                                </p>

                                <div className="mt-5 grid gap-y-3">
                                    <p className="flex items-center">
                                        <CalendarX2 className="size-4 mr-2 text-primary" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {formattedDate}
                                        </span>
                                    </p>
                                    <p className="flex items-center">
                                        <Clock className="size-4 mr-2 text-primary" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {eventType.duration} Mins
                                        </span>
                                    </p>
                                    <p className="flex items-center">
                                        <VideoIcon className="size-4 mr-2 text-primary" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {eventType.videoCallSoftware}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <Separator
                                orientation="vertical"
                                className="hidden md:block h-full w-[1px]"
                            />

                        </CardContent>
                    </Card>
                ) : (
                    <Card className="w-full max-w-[1000px] mx-auto">
                        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
                            <div>
                                <Image
                                    src={eventType.user?.image as string}
                                    alt={`${eventType.user?.name}'s profile picture`}
                                    className="size-9 rounded-full"
                                    width={30}
                                    height={30}
                                />
                                <p className="text-sm font-medium text-muted-foreground mt-1">
                                    {eventType.user?.name}
                                </p>
                                <h1 className="text-xl font-semibold mt-2">{eventType.title}</h1>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {eventType.description}
                                </p>
                                <div className="mt-5 grid gap-y-3">
                                    <p className="flex items-center">
                                        <CalendarX2 className="size-4 mr-2 text-primary" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {formattedDate}
                                        </span>
                                    </p>
                                    <p className="flex items-center">
                                        <Clock className="size-4 mr-2 text-primary" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {eventType.duration} Mins
                                        </span>
                                    </p>
                                    <p className="flex items-center">
                                        <VideoIcon className="size-4 mr-2 text-primary" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Google Meet
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <Separator
                                orientation="vertical"
                                className="hidden md:block h-full w-[1px]"
                            />

                            <div className="my-4 md:my-0">
                                {/* <RenderCalendar daysOfWeek={eventType.user?.availability as any} /> */}
                                <RenderCalendar daysOfWeek={eventType.user?.availability?.map(({ day, isActive }) => ({ day: day.toString(), isActive })) || []} />
                            </div>

                            <Separator
                                orientation="vertical"
                                className="hidden md:block h-full w-[1px]"
                            />

                            <TimeTable
                                selectedDate={selectedDate}
                                userName={params.username}
                                meetingDuration={eventType.duration}
                            />
                        </CardContent>
                    </Card>
                )
            }
        </div>
    )
}