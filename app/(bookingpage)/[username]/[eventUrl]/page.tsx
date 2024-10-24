import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

async function getData(username: string, eventName: string) {
    const eventType = await prisma.eventType.findFirst({
        where: {
            url: eventName,
            user: {
                userName: username,
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
                    Availability: {
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

export default function BookingFormRoute() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="max-w-[600px]">
                <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr] gap-4">
                    <Separator
                        orientation="vertical"
                        className="hidden md:block h-full w-[1px]"
                    />


                </CardContent>
            </Card>
        </div>
    )
}