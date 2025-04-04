import { cn } from "@lib/cn";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
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
  name: string;
  className?: string;
  options: Option[];
};

const FormSelect = ({ name, label, options, className }: Props) => {
  const { control, setValue } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onBlur, value }, fieldState: { error } }) => (
        <FormItem className="w-full flex-1 space-y-0">
          <FormLabel
            htmlFor={name}
            className="mb-0.5 ms-2 font-montreal text-sm font-medium"
          >
            {label}
          </FormLabel>
          <Select
            onValueChange={(val) =>
              setValue(name, val, { shouldValidate: true })
            }
            value={value}
          >
            <FormControl>
              <SelectTrigger
                onBlur={onBlur}
                // className="w-full flex-auto shrink-0 rounded-xl border-none bg-[#F7F8FA] focus:ring-0 focus:ring-offset-0"
                className={cn(
                  "m-0 rounded-xl border border-input bg-white focus-within:border-primary focus-within:shadow-input focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 hover:border-primary hover:shadow-input focus-visible:ring-0 focus-visible:ring-offset-0",
                  error &&
                    "focus-within:border-error focus-within:shadow-input-error",
                  className
                )}
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
  );
};

export default memo(FormSelect);
