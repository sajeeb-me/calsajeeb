import { EmptyState } from "@/app/components/EmptyState";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import React from "react";

async function getData(userId: string) {
    const userData = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            grantId: true,
            grantEmail: true,
        },
    });

    if (!userData) {
        throw new Error("User not found");
    }
    const data = await nylas.events.list({
        identifier: userData?.grantId as string,
        queryParams: {
            calendarId: userData?.grantEmail as string,
        },
    });

    return data;
}

const MeetingsPage = async () => {
    const session = await requireUser();
    const data = await getData(session?.user?.id as string);

    console.log("data", data.data.map((item) => item.conferencing));

    return (
        <>
            {data.data.length < 1 ? (
                <EmptyState
                    title="No meetings found"
                    description="You don't have any meetings yet."
                    buttonText="Create a new event type"
                    href="/dashboard/new"
                />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Bookings</CardTitle>
                        <CardDescription>
                            See upcoming and past events booked through your event type links.
                        </CardDescription>
                    </CardHeader>
                </Card>
            )}
        </>
    );
};

export default MeetingsPage;