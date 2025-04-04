import { cn } from "@lib/cn";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type Option = { label: string; value: string };

type Props = {
  label: string;
  name: { interval: string; period: string };
  options: Option[];
};

const FormDuration = ({ name, label, options }: Props) => {
  const { control, setValue, getFieldState } = useFormContext();

  const phoneCodeError = getFieldState(name.interval)?.error;
  const phoneNumberError = getFieldState(name.period)?.error;
  const errorMessage = phoneCodeError?.message || phoneNumberError?.message;

  return (
    <div className="flex-1">
      <FormLabel
        htmlFor={name.period}
        className="mb-0.5 ms-2 font-montreal text-sm font-medium"
      >
        {label}
      </FormLabel>
      <div
        className={cn(
          "flex w-full items-center rounded-xl border hover:border-primary hover:shadow-input",
          (phoneCodeError || phoneNumberError) &&
            "border-error shadow-input-error"
        )}
      >
        {/* No. of years/months Input */}
        <FormField
          control={control}
          name={name.period}
          render={({ field }) => (
            <FormItem className="w-full flex-1 rounded-xl rounded-l-none border-none">
              <FormControl>
                <Input
                  placeholder="No. of years/months"
                  type="number"
                  min="0"
                  max="150"
                  className="rounded-l-xl rounded-r-none bg-white focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                  onChange={(event) => {
                    const rawValue = event.target.value.replace(/\D/g, ""); // Keep only numbers
                    setValue(name.period, rawValue, {
                      shouldValidate: true,
                    });
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Interval Select */}
        <FormField
          control={control}
          name={name.interval}
          render={({ field: { onBlur, value } }) => (
            <FormItem>
              <Select
                onValueChange={(val) =>
                  setValue(name.interval, val, { shouldValidate: true })
                }
                value={value}
              >
                <FormControl>
                  <SelectTrigger
                    onBlur={onBlur}
                    className="w-16 flex-auto shrink-0 rounded-xl rounded-l-none border-none bg-[#F7F8FA] focus:ring-0 focus:ring-offset-0"
                  >
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      {/* Error Message */}
      {errorMessage && <small className="text-error">{errorMessage}</small>}
    </div>
  );
};

export default memo(FormDuration);
