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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import codes from "@lib/CountryCode";
import { FixedSizeList as List } from "react-window";
import { useEffect } from "react";

const FList = List as any;

const ContactForm = () => {
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

  const onSubmit = async (values: z.infer<typeof ContactUsValidation>) => {
    console.log("Submitted", { values });
    alert("Your message has been sent successfully");
  };

  useEffect(() => {
    const phone = form.watch("phoneNumber")?.split(" ")[1] || "";
    const countryCode = form.watch("countryCode")?.split(",")[1] || "";
    form.setValue("phoneNumber", `${countryCode} ${phone}`);
  }, [selectedCode, form]);

  return (
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
                    {/* <span>{form.watch("countryCode")?.split(",")[1]}</span> */}
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
        </div>
        <Button type="submit" className="ml-auto mt-10 w-fit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
