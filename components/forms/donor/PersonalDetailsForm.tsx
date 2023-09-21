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
import { DonorPersonalDetailsValidation } from "lib/validations/donor";

const PersonalDetailsForm = () => {
  const form = useForm<z.infer<typeof DonorPersonalDetailsValidation>>({
    resolver: zodResolver(DonorPersonalDetailsValidation),
    defaultValues: {
      firstName: "Victor",
      lastName: "Whyte",
      email: "victordavidwhyte@gmail.com",
      phoneNumber: "08166406459",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof DonorPersonalDetailsValidation>
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
                  <Input disabled type="text" value={form.watch("firstName")} />
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
                  <Input disabled type="text" value={form.watch("lastName")} />
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
                    value={form.watch("email")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    disabled
                    type="text"
                    value={form.watch("phoneNumber")}
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

export default PersonalDetailsForm;
