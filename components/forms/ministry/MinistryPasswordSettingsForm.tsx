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
import { Input } from "@components/ui/input-with-icon";
import { Button } from "@components/ui/button";
import { MinistryPasswordSettingsValidation } from "lib/validations/ministry";

const MinistryPasswordSettingsForm = () => {
  const form = useForm<z.infer<typeof MinistryPasswordSettingsValidation>>({
    resolver: zodResolver(MinistryPasswordSettingsValidation),
  });

  const onSubmit = async (
    values: z.infer<typeof MinistryPasswordSettingsValidation>
  ) => {
    console.log("Submitted", { values });
    alert("Your message has been sent successfully");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-10"
      >
        <div className="flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="password"
                    placeholder="Enter your current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>New Password</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="password"
                    placeholder="Create a password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Confirm new password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant="secondary" className="ml-auto w-fit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default MinistryPasswordSettingsForm;
