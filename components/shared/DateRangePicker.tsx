"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";

const DateRangePicker = ({
  placeholder,
  onChange,
  date,
}: {
  placeholder: string;
  onChange: (date: DateRange | undefined) => void;
  date: DateRange | undefined;
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={cn("grid gap-2")}>
      <Popover onOpenChange={(open) => setOpen(open)} open={isOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "sm:w-[300px] justify-start text-left font-normal h-full",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-4 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <div className="sm:flex-center">
                  {format(date.from, "LLL dd, y")}
                  <Separator className="sm:w-2 h-[2px] bg-slate-600 sm:mx-2 my-2" />
                  {format(date.to, "LLL dd, y")}
                </div>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(d) => {
              setOpen(false);
              onChange(d);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
