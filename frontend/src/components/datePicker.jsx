"use client"

import React, { useState } from 'react';
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CustomDatePicker() {
  const [date, setDate] = useState();

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full md:w-[240px] justify-start text-left font-normal gap-2",
              !date && "text-white"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 shadow-md rounded-md border border-gray-200 dark:border-gray-800"
        >
          <Select
            onValueChange={(value) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-white dark:bg-gray-950">
              <SelectValue placeholder="Quick select" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white dark:bg-gray-950">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 text-red">
          <Calendar 
            mode="single" 
            selected={date} 
            onSelect={setDate}
            className="text-gray-900 dark:text-gray-100 
                      [&_[aria-selected=true]]:bg-blue-500 
                      [&_[aria-selected=true]]:text-white 
                      [&_[aria-selected=true]]:hover:bg-blue-600"
          />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default CustomDatePicker;