"use client";

import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@lib/cn";
import { useFormContext } from "react-hook-form";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Props = {
  label: string;
  name: string;
  mode: "default" | "multiple" | "range" | "single";
  fromYear?: number;
  toYear?: number;
  className?: string;
};

const FormDate = ({
  label,
  name,
  mode,
  fromYear,
  toYear,
  className,
}: Props) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormItem className="w-full flex-1 space-y-0">
          <FormLabel
            htmlFor={name}
            className="mb-0.5 ms-2 font-montreal text-sm font-medium"
          >
            {label}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full items-center rounded-xl px-3 text-left font-normal",
                    !value && "text-muted-foreground",
                    "m-0 rounded-xl border border-input bg-white focus-within:border-primary focus-within:shadow-input focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 hover:border-primary hover:bg-white hover:shadow-input focus-visible:ring-0 focus-visible:ring-offset-0",
                    error &&
                      "focus-within:border-error focus-within:shadow-input-error",
                    className
                  )}
                >
                  <span className="flex-1">
                    {value ? (
                      format(value, "dd/MM/yyyy")
                    ) : (
                      <span>DD/MM/YYYY</span>
                    )}
                  </span>
                  <CalendarDays className="opacity-85 h-4 w-4" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode={mode}
                selected={value}
                onSelect={onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                fromYear={fromYear}
                toYear={toYear || new Date().getFullYear()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FormDate;
