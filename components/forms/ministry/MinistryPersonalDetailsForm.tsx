"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@components/ui/input";
import { MinistryPersonalDetailsValidation } from "lib/validations/ministry";

const MinistryPersonalDetailsForm = () => {
  const form = useForm<z.infer<typeof MinistryPersonalDetailsValidation>>({
    resolver: zodResolver(MinistryPersonalDetailsValidation),
    defaultValues: {
      firstName: "Victor",
      lastName: "Whyte",
      email: "victordavidwhyte@gmail.com",
      phone: "08166406459",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof MinistryPersonalDetailsValidation>
  ) => {
    console.log("Submitted", { values });
    alert("Your message has been sent successfully");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>First name</FormLabel>
                <FormControl>
                  <Input disabled type="text" value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Last name</FormLabel>
                <FormControl>
                  <Input disabled type="text" value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Enter email address"
                    type="text"
                    value={field.value}
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
              <FormItem className="">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter phone number"
                    disabled
                    type="text"
                    value={field.value}
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

export default MinistryPersonalDetailsForm;
