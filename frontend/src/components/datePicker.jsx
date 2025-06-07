"use client"

import React, { useState, useEffect } from 'react';
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

function CustomDatePicker({ onDateChange }) {
  const [date, setDate] = useState();
  const [isHovered, setIsHovered] = useState(false);

  // Communicate date changes to parent component
  useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  // Handle date selection
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
  };

  // Handle quick selection
  const handleQuickSelect = (value) => {
    const newDate = addDays(new Date(), parseInt(value));
    setDate(newDate);
  };

  return (
    <div 
      className={cn(
        "w-full p-4 border border-gray-200 dark:border-gray-800 bg-gray-900 shadow-lg rounded-xl transition-all duration-300",
        isHovered ? "transform -translate-y-1 shadow-xl" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal gap-2",
              "text-white border-white hover:bg-gray-800 hover:border-gray-700"
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
            onValueChange={handleQuickSelect}
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
          <div className="rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="text-gray-900 dark:text-gray-100"
            classNames={{
              day_selected: "bg-[#0A65B3] text-white hover:bg-blue-600 hover:text-white",
              day_today: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
            }}
            disabled={(date) =>
              date < new Date() 
            }
          />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default CustomDatePicker;