import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Input } from "./input";

interface DatePickerProps {
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    date: Date | undefined;
    id?: string;
}

export default function DatePicker({ date, setDate, id }: DatePickerProps) {
    const [time, setTime] = React.useState<string>("11:00");

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);

        if (date) {
            const [hours, minutes] = newTime.split(":").map(Number);
            const updatedDate = new Date(date);
            updatedDate.setHours(hours, minutes);
            setDate(updatedDate);
        }
    };

    return (
        <Popover>
            <PopoverTrigger id={id || ""} asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[260px] sm:w-[280px] justify-start text-left font-normal rounded-full",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "EEE, d MMM 'at' h:mm a") : <span>Pick a date & time</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4 flex flex-col gap-2" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                <div className="place-self-center">
                    <Input
                        type="time"
                        value={time}
                        placeholder="Select time"
                        onChange={handleTimeChange}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}
