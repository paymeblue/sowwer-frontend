import { memo } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { RadioGroup, RadioGroupItem } from "./radio-group";

type Option = { label: string; value: string; desc?: string };

type Props = {
  label: string;
  name: string;
  options: Option[];
};

const FormRadio = ({ label, name, options }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value } }) => (
        <FormItem>
          <FormLabel
            htmlFor={name}
            className="font-montreal text-sm font-medium"
          >
            {label}
          </FormLabel>
          <FormControl>
            <RadioGroup
              value={value}
              onValueChange={onChange}
              className="flex flex-col max-lg:space-y-0 lg:flex-row lg:space-x-8"
              onBlur={onBlur}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem
                      value={option.value}
                      className="border-input"
                    />
                  </FormControl>
                  <FormLabel
                    className="font-montreal text-[13px] font-normal text-body-1"
                    desc={option.desc}
                  >
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(FormRadio);
