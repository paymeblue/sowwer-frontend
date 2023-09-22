"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MinistryContactDetailsValidation } from "lib/validations/ministry";
import { Input } from "@components/ui/input";

const ContactDetailsForm = () => {
  const form = useForm<z.infer<typeof MinistryContactDetailsValidation>>({
    resolver: zodResolver(MinistryContactDetailsValidation),
    defaultValues: {
      email: "info@fwcabuja.org",
      phone: "+234 123 456 7890",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof MinistryContactDetailsValidation>
  ) => {
    console.log("Submitted", { values });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email address</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Name of ministry"
                    type="text"
                    value={field.value}
                    //   {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Phone number</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Address"
                    type="text"
                    value={field.value}
                    //   {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default ContactDetailsForm;
