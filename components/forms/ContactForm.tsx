"use client";
import { Fragment, useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import codes from "@lib/CountryCode";
import { FixedSizeList as List } from "react-window";
import Script from "next/script";
import { useToast } from "@components/ui/use-toast";

const FList = List as any;
// Trigger deploy
const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof ContactUsValidation>>({
    resolver: zodResolver(ContactUsValidation),
    defaultValues: {
      email: "",
      fullName: "",
      message: "",
      countryCode: "🇳🇬,+234",
    },
  });
  const selectedCode = form.watch("countryCode");

  const onSubmit = async (
    values: z.infer<typeof ContactUsValidation>,
    e: any
  ) => {
    const formData = new FormData(e?.target);
    const { email, fullName, message, countryCode, phoneNumber } = values;
    formData.append("email", email);
    formData.append("fullName", fullName);
    formData.append("message", message);
    formData.append("countryCode", countryCode as string);
    formData.append("phoneNumber", phoneNumber as string);

    try {
      setIsLoading(true);
      const res = await fetch("/api/contact-us", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        toast({
          title: "Contact message sent successfully",
        });
      } else {
        throw new Error(result);
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title:
          err?.message || "Unable to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const phone = form.watch("phoneNumber")?.split(" ")[1] || "";
    const countryCode = form.watch("countryCode")?.split(",")[1] || "";
    form.setValue("phoneNumber", `${countryCode} ${phone}`);
  }, [selectedCode, form]);

  return (
    <Fragment>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async={true}
        defer={true}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col"
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
            <div className="flex flex-col space-y-2">
              <FormLabel>Phone number</FormLabel>

              <div className="flex w-full items-end">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="">
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-[4rem] rounded-br-none rounded-tr-none bg-[#D9D9D9]">
                          <SelectValue className="text-lg">
                            {form.watch("countryCode")?.split(",")[0]}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <FList
                            height={200}
                            itemCount={codes.length}
                            itemSize={40}
                            width="100%"
                          >
                            {({ index, style }: any) => {
                              const option = codes[index];
                              const key = `${index}-${option.code}`;
                              return (
                                <div key={key} style={style}>
                                  <SelectItem
                                    key={key}
                                    value={`${option.flag},${option.code}`}
                                    className="flex items-center"
                                  >
                                    <span>{option.flag}</span>
                                    <span className="ml-2 text-[.6rem] text-gray-500">
                                      {option.code}
                                    </span>
                                  </SelectItem>
                                </div>
                              );
                            }}
                          </FList>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="phone" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
            <div
              className="cf-turnstile"
              data-theme="light"
              data-retry-interval={3000}
              data-sitekey={
                process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
              }
            />
          </div>
          <Button
            loading={isLoading}
            type="submit"
            variant="secondary"
            className="ml-auto mt-10 w-fit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </Fragment>
  );
};

export default ContactForm;
