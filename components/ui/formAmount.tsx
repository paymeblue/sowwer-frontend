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
  desc?: string;
  name: { currency: string; amount: string };
  options: Option[];
  disabled?: boolean;
};

const formatNumberWithCommas = (value: string) => {
  if (!value) return "";
  return parseFloat(value.replace(/,/g, "")).toLocaleString("en-US");
};

const FormAmount = ({ name, label, desc, options, disabled }: Props) => {
  const { control, setValue, getFieldState } = useFormContext();

  const currencyError = getFieldState(name.currency)?.error;
  const amountError = getFieldState(name.amount)?.error;
  const errorMessage = currencyError?.message || amountError?.message;

  return (
    <div className="flex-1">
      <FormLabel
        htmlFor={name.amount}
        className="mb-0.5 ms-2 font-montreal text-sm font-medium"
      >
        {label}
      </FormLabel>
      <div
        className={cn(
          "flex w-full items-center rounded-xl border hover:border-primary hover:shadow-input",
          (currencyError || amountError) && "border-error shadow-input-error"
        )}
      >
        {/* Currency Select */}
        <FormField
          control={control}
          name={name.currency}
          render={({ field: { onBlur, value } }) => (
            <FormItem>
              <Select
                disabled={disabled}
                onValueChange={(val) =>
                  setValue(name.currency, val, { shouldValidate: true })
                }
                value={value}
              >
                <FormControl>
                  <SelectTrigger
                    onBlur={onBlur}
                    className="w-16 flex-auto shrink-0 rounded-xl rounded-r-none border-none bg-[#F7F8FA] focus:ring-0 focus:ring-offset-0"
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

        {/* Amount Input */}
        <FormField
          control={control}
          name={name.amount}
          render={({ field }) => (
            <FormItem className="w-full flex-1 rounded-xl rounded-l-none border-none">
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="0.00"
                  inputMode="decimal"
                  className="rounded-l-none rounded-r-xl bg-white focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-[#F7F8FA]"
                  {...field}
                  value={formatNumberWithCommas(field.value)}
                  onChange={(event) => {
                    const rawValue = event.target.value.replace(/,/g, ""); // Remove commas
                    if (!/^\d*\.?\d*$/.test(rawValue)) return; // Allow only numbers
                    setValue(name.amount, rawValue, { shouldValidate: true });
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {/* Description Message */}
      {desc && (
        <small className="font-montreal text-[13px] font-normal text-body-1">
          {desc}
        </small>
      )}
      {/* Error Message */}
      {errorMessage && <small className="text-error">{errorMessage}</small>}
    </div>
  );
};

export default memo(FormAmount);
