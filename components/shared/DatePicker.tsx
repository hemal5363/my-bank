"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

const DatePicker = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (date: Date | undefined) => void;
}) => {
  const [date, setDate] = useState<Date>();
  const [isOpen, setOpen] = useState(false);

  return (
    <Popover onOpenChange={(open) => setOpen(open)} open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "sm:w-[280px] justify-start text-left font-normal rounded-md",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d);
            setOpen(false);
            onChange(d);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
