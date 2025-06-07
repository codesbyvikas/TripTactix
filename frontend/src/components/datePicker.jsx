"use client";

import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { ChevronDownIcon, CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
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

function CustomDatePicker({ onDateChange }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  const handleQuickSelect = (value) => {
    const newDate = addDays(new Date(), parseInt(value));
    setDate(newDate);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Date of birth
      </Label>
      <div
        className={cn(
          "w-full p-4 border border-gray-200 dark:border-gray-800 bg-gray-900 shadow-lg rounded-xl transition-all duration-300",
          isHovered ? "transform -translate-y-1 shadow-xl" : ""
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className={cn(
                "w-full justify-between font-normal text-white border-white hover:bg-gray-800 hover:border-gray-700"
              )}
            >
              <span className="flex gap-2 items-center">
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </span>
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="flex w-auto flex-col space-y-2 p-2 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 shadow-md rounded-md border border-gray-200 dark:border-gray-800"
            align="start"
          >
            <Select onValueChange={handleQuickSelect}>
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
            <div className="rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setOpen(false);
                }}
                className="text-gray-900 dark:text-gray-100"
                classNames={{
                  day_selected: "bg-[#0A65B3] text-white hover:bg-blue-600 hover:text-white",
                  day_today: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
                }}
                disabled={(date) => date < new Date()}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default CustomDatePicker;