"use client";

import { Switch } from "@/components/ui/switch";

export function MenuActiveSwitcher({
    initialChecked,
    eventTypeId,
}: {
    eventTypeId: string;
    initialChecked: boolean;
}) {
    return (
        <Switch />
    )
}