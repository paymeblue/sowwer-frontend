"use client";

import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  WidowRegisterationStart,
  WidowRegistrationForSomeone,
} from "lib/validations/join-registry";
import { ArrowRight } from "react-iconly";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
      </div>
    </div>
  );
};

const RegistrationForSomeone = () => {
  const form = useForm<z.infer<typeof WidowRegistrationForSomeone>>({
    resolver: zodResolver(WidowRegistrationForSomeone),
  });

  const onSubmit = async (
    values: z.infer<typeof WidowRegistrationForSomeone>
  ) => {
    console.log("Submitted", { values });
    alert("Your message has been sent successfully");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col"
      >
        {/* Personal Detaills */}
        <div>
          <h4 className="text_regular_body_b mb-4">Your Personal Details</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" type="text" {...field} />
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
                    <Input placeholder="Email" type="text" {...field} />
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
                  <FormLabel required>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Widows Detaills */}
        <div className="mt-8">
          <h4 className="text_regular_body_b mb-4">Widow's Personal Details</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <FormField
              control={form.control}
              name="widowName"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="widowAge"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>How old are you?</FormLabel>
                  <FormControl>
                    <Input placeholder="Age" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="widowDuration"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>
                    How long have you been a widow?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="No of months/years"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="widowEmail"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johnsmith@gmail.com"
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
              name="widowPhone"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="widowAddress"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel required>Address Line</FormLabel>
                  <FormControl>
                    <Input placeholder="Address Line" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isWidowChristian"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel
                    required
                    className="!text_regular_body_b font-[600]"
                  >
                    Are you a Christian?
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
            <FormField
              control={form.control}
              name="doesWidowHaveKids"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel
                    required
                    className="!text_regular_body_b font-[600]"
                  >
                    Do you have kids?
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

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="col-span-2 flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-[#BDBDBD]"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I declare that all information by me is true, and I can be
                      held liable legally if it is found that I declared false
                      information, and also that registration doesn’t guarantee
                      that I would benefit from Soower.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="ml-auto mt-10 w-fit space-x-2 bg-accent text-white"
        >
          <span>Submit</span>
          <ArrowRight set="light" size={18} />
        </Button>
      </form>
    </Form>
  );
};

export default WidowRegistrationForm;
