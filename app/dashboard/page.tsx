import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import { EmptyState } from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import { Users2 } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            userName: true,
            eventType: {
                select: {
                    id: true,
                    active: true,
                    title: true,
                    url: true,
                    duration: true,
                }
            }
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export default async function DashboardPage() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);

    return (
        <>
            <div className="flex items-center justify-between px-2">
                <div className="sm:grid gap-1 hidden">
                    <h1 className="font-semibold text-3xl md:text-4xl">Event Types</h1>
                    <p className="text-lg text-muted-foreground">
                        Create and manage your event types.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/new">Create New Event</Link>
                </Button>
            </div>
            {data.eventType.length === 0 ? (
                <EmptyState
                    title="You have no Event Types"
                    description="You can create your first event type by clicking the button below."
                    buttonText="Add Event Type"
                    href="/dashboard/new"
                />
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {data.eventType.map((item) => (
                        <div
                            className="overflow-hidden shadow rounded-lg border relative"
                            key={item.id}
                        >

                            <Link href={`/dashboard/event/${item.id}`}>
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Users2 className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium truncate ">
                                                    {item.duration} Minutes Meeting
                                                </dt>
                                                <dd>
                                                    <div className="text-lg font-medium ">
                                                        {item.title}
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="bg-muted dark:bg-gray-900 px-5 py-3 flex justify-between items-center">
                                <Switch />
                                <Link href={`/dashboard/event/${item.id}`}>
                                    <Button className="">Edit Event</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}  