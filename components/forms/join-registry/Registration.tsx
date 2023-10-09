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
import { WidowRegistration } from "lib/validations/join-registry";
import { ArrowRight } from "react-iconly";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { useToast } from "@components/ui/use-toast";
import { useWidowMutation } from "services/join-soower-registry";
import { WidowJoinSoowerRequest1 } from "services/typings";
import { useEffect } from "react";
import { RegistryRegistrationFormProps } from "./WidowRegistrationForm";

const Registration = ({ onSuccess }: RegistryRegistrationFormProps) => {
  const { toast } = useToast();
  const [joinWidowRegistry, { isLoading, isSuccess }] = useWidowMutation();
  const form = useForm<z.infer<typeof WidowRegistration>>({
    resolver: zodResolver(WidowRegistration),
    defaultValues: {
      range: "year",
    },
  });

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const onSubmit = async (values: z.infer<typeof WidowRegistration>) => {
    const {
      acceptTerms,
      address,
      age,
      doesWidowHaveKids,
      duration,
      email,
      isWidowChristian,
      name,
      phoneNumber,
      range,
    } = values;

    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "You must accept the declaration.",
      });
      return;
    }

    try {
      const data = {
        address,
        age: Number(age),
        christianity: isWidowChristian === "Yes" ? true : false,
        declaration: acceptTerms,
        duration: Number(duration),
        timestamp: range,
        email,
        kids: doesWidowHaveKids === "Yes" ? true : false,
        name,
        phone: String(phoneNumber),
      } as WidowJoinSoowerRequest1;
      await joinWidowRegistry(data).unwrap();
      toast({
        title: "Widow registration successful",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to complete registration. Please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col"
      >
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
            name="age"
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
          <div className="flex w-full items-end">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="w-[65%]">
                  <FormLabel required className="whitespace-nowrap">
                    How long have you been a widow?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="No of months/years"
                      type="number"
                      className="rounded-br-none rounded-tr-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="range"
              render={({ field }) => (
                <FormItem className="w-[35%]">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-bl-none rounded-tl-none bg-gray-200 text-[.8rem]">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[30vh]">
                      <SelectItem value="year">Years</SelectItem>
                      <SelectItem value="month">Months</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.getFieldState("duration").error && (
                    <FormMessage>Enter duration</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
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
                <FormLabel required className="!text_regular_body_b font-[600]">
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
                <FormLabel required className="!text_regular_body_b font-[600]">
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
                  <FormMessage />
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
        <Button
          variant="secondary"
          loading={isLoading}
          type="submit"
          className="ml-auto mt-10 w-fit space-x-2"
        >
          <span>Submit</span>
          <ArrowRight set="light" size={18} />
        </Button>
      </form>
    </Form>
  );
};
export default Registration;
