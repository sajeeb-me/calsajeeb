import { format } from "date-fns";


interface iappProps {
    selectedDate: Date;
    userName: string;
    meetingDuration: number;
}


export function TimeTable({
    selectedDate,
    userName,
    meetingDuration,
}: iappProps) {
    return (
        <div>
            <p className="text-base font-semibold">
                {format(selectedDate, "EEE")}.{" "}
                <span className="text-sm text-muted-foreground">
                    {format(selectedDate, "MMM. d")}
                </span>
            </p>
        </div>
    )
}