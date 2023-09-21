"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { WidowRegisterationStart } from "lib/validations/join-registry";
import { useForm } from "react-hook-form";
import * as z from "zod";
import RegistrationForSomeone from "./RegistrationForSomeone";
import Registration from "./Registration";

const WidowRegistrationForm = () => {
  const form = useForm<z.infer<typeof WidowRegisterationStart>>({
    resolver: zodResolver(WidowRegisterationStart),
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="isRegisteringForSomeone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text_regular_body_b font-[600]">
                  Are you registering on behalf of somebody?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex items-center space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="No" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-8">
        {form.watch("isRegisteringForSomeone") === "Yes" && (
          <RegistrationForSomeone />
        )}
        {form.watch("isRegisteringForSomeone") === "No" && <Registration />}
      </div>
    </div>
  );
};

export default WidowRegistrationForm;
