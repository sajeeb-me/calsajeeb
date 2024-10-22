import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";

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
            {data.eventType.length === 0 ? (
                <p> no data </p>
            ) : (
                <p>we have data</p>
            )}
        </>
    )
}  