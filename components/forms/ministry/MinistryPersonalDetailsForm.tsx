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
import { useGetUserProfileQuery } from "services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@components/ui/input";
import { MinistryPersonalDetailsValidation } from "lib/validations/ministry";
import Loader from "@components/shared/Loader";
import { useEffect } from "react";

const MinistryPersonalDetailsForm = () => {
  const { data: userProfile, isLoading } = useGetUserProfileQuery(null, {
    refetchOnFocus: true,
  });

  const form = useForm<z.infer<typeof MinistryPersonalDetailsValidation>>({
    resolver: zodResolver(MinistryPersonalDetailsValidation),
  });

  useEffect(() => {
    if (userProfile?.data) {
      const { firstName, lastName, email, phone } = userProfile?.data;
      form.reset({
        firstName,
        lastName,
        email,
        phone,
      });
    }
  }, [userProfile, form]);

  const onSubmit = async (
    values: z.infer<typeof MinistryPersonalDetailsValidation>
  ) => {
    return;
  };

  if (isLoading) {
    return <Loader className="h-[40vh]" />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 gap-x-2 gap-y-4 lg:grid-cols-2">
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
                <FormLabel required>Email address</FormLabel>
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
