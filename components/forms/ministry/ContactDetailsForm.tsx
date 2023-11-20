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
import { useGetMinistryDetailsQuery } from "services/ministry";
import useUserAuth from "@hooks/auth/useUserAuth";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";

const ContactDetailsForm = () => {
  const { user } = useUserAuth();
  const form = useForm<z.infer<typeof MinistryContactDetailsValidation>>({
    resolver: zodResolver(MinistryContactDetailsValidation),
  });
  const { data: ministry } = useGetMinistryDetailsQuery(
    user?.ministry?.id ?? skipToken
  );

  useEffect(() => {
    if (ministry?.data) {
      form.reset({
        email: ministry.data.email,
        phone: ministry.data.phone,
      });
    }
  }, [ministry, form]);

  const onSubmit = async (
    values: z.infer<typeof MinistryContactDetailsValidation>
  ) => {
    return;
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
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
