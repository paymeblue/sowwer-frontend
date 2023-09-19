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
import { ContactUsValidation } from "lib/validations/contactUs";
import * as z from "zod";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";

const ContactForm = () => {
  const form = useForm<z.infer<typeof ContactUsValidation>>({
    resolver: zodResolver(ContactUsValidation),
    defaultValues: {
      email: "",
      fullName: "",
      message: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactUsValidation>) => {
    console.log("Submitted", { values });
    alert("Your message has been sent successfully");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-between"
      >
        <div className="flex w-full flex-col justify-start gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    type="text"
                    {...field}
                  />
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
                    placeholder="Enter email address"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Message</FormLabel>
                <FormControl>
                  <Textarea rows={6} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
