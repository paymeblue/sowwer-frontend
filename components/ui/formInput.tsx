import { cn } from "@lib/cn";
import React, { memo } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input-with-icon";

type Props = {
  label: string;
  name: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  type?: string;
};

const FormInput = ({ label, name, inputProps, type }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="w-full flex-1 space-y-0">
          <FormLabel
            htmlFor={name}
            className="mb-0.5 ms-2 font-montreal text-sm font-medium"
          >
            {label}
          </FormLabel>
          <FormControl className="flex flex-col">
            <Input
              {...field} // Ensures proper field binding
              ref={field.ref} // Properly attaches the ref
              className={cn(
                "m-0 rounded-xl border border-input bg-white focus-within:border-primary focus-within:shadow-input focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 hover:border-primary hover:shadow-input focus-visible:ring-0 focus-visible:ring-offset-0",
                error &&
                  "focus-within:border-error focus-within:shadow-input-error",
                inputProps?.className
              )}
              {...inputProps}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(FormInput);
