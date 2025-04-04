import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "./checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type Props = {
  name: string;
  label: string;
};

const FormCheckbox = ({ label, name }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onBlur, onChange } }) => (
        <FormItem className="space-y-0">
          <div className="flex flex-row items-center space-x-3">
            <FormControl>
              <Checkbox
                name={name}
                checked={!!value} // Ensures value is always a boolean
                onCheckedChange={(checked) => onChange(!!checked)} // Ensures correct type
                onBlur={onBlur}
              />
            </FormControl>
            <FormLabel className="mt- font-montreal text-[13px] font-normal text-body-1">
              {label}
            </FormLabel>
          </div>
          <FormMessage className="m-0" />
        </FormItem>
      )}
    />
  );
};

export default memo(FormCheckbox);
