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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { WidowRegistrationForSomeone } from "lib/validations/join-registry";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight } from "react-iconly";
import { useWidowMutation } from "services/join-soower-registry";
import { WidowJoinSoowerRequest2 } from "services/typings";
import * as z from "zod";
import { RegistryRegistrationFormProps } from "./WidowRegistrationForm";
import statesInNigeria from "@lib/NigeriaStates";

const RegistrationForSomeone = ({
  onSuccess,
}: RegistryRegistrationFormProps) => {
  const form = useForm<z.infer<typeof WidowRegistrationForSomeone>>({
    resolver: zodResolver(WidowRegistrationForSomeone),
    defaultValues: {
      range: "year",
    },
  });
  const { toast } = useToast();
  const [joinWidowRegistry, { isLoading, isSuccess }] = useWidowMutation();

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const onSubmit = async (
    values: z.infer<typeof WidowRegistrationForSomeone>
  ) => {
    const {
      acceptTerms,
      doesWidowHaveKids,
      email,
      isWidowChristian,
      name,
      phoneNumber,
      range,
      widowAddress,
      widowAge,
      widowDuration,
      widowEmail,
      widowName,
      widowPhone,
      nextOfKinName,
      nextOfKinPhone,
      state,
    } = values;

    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "You must accept the declaration.",
        duration: 2000,
      });
      return;
    }

    try {
      const data = {
        address: widowAddress,
        age: Number(widowAge),
        christianity: isWidowChristian === "Yes" ? true : false,
        declaration: acceptTerms,
        duration: Number(widowDuration),
        timestamp: range,
        email: widowEmail,
        kids: doesWidowHaveKids === "Yes" ? true : false,
        name: widowName,
        phone: String(widowPhone),
        registrar_name: name,
        registrar_email: email,
        registrar_phone: phoneNumber,
        next_of_kin_name: nextOfKinName,
        next_of_kin_phone: nextOfKinPhone,
        state_of_origin: state,
      } as WidowJoinSoowerRequest2;
      await joinWidowRegistry(data).unwrap();
      toast({
        title: "Widow registration successful",
        duration: 2500,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to complete registration.",
        description: `${
          err ||
          "There seems to be a problem with your registration, please try again later."
        }`,
        duration: 2500,
      });
    }
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
          <div className="grid grid-cols-1 gap-x-4 gap-y-5 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
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
          <div className="flex flex-col gap-x-4 gap-y-5 lg:grid lg:grid-cols-2">
            <FormField
              control={form.control}
              name="widowName"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
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
              name="state"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel required className="">
                    State of origin
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger defaultValue={field.value}>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[30vh]">
                      {statesInNigeria.map((state, i) => {
                        return (
                          <SelectItem value={state} key={state + i}>
                            {state}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="widowAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>How old are you?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Age"
                      type="text"
                      inputMode="numeric"
                      {...field}
                      onChange={(e) => {
                        const sanitizedValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        field.onChange(sanitizedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-end">
              <FormField
                control={form.control}
                name="widowDuration"
                render={({ field }) => (
                  <FormItem className="w-[65%]">
                    <FormLabel required className="whitespace-nowrap">
                      How long have you been a widow?
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="No of months/years"
                        type="text"
                        // min="0"
                        inputMode="numeric"
                        className="rounded-br-none rounded-tr-none"
                        {...field}
                        onChange={(e) => {
                          const sanitizedValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          field.onChange(sanitizedValue);
                        }}
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
                    {form.getFieldState("widowDuration").error && (
                      <FormMessage>Enter duration</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
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
              name="nextOfKinName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>Next of Kin Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nextOfKinPhone"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>Next of Kin Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone" type="number" {...field} />
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
                  <FormMessage />
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
                  <FormMessage />
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
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="secondary"
          loading={isLoading}
          className="ml-auto mt-10 w-fit space-x-2"
        >
          <span>Submit</span>
          <ArrowRight set="light" size={18} />
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForSomeone;
