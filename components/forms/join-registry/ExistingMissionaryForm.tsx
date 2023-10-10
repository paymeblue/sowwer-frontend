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
import { ExisitingMissionRegistration } from "lib/validations/join-registry";
import { ArrowRight } from "react-iconly";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@components/ui/textarea";
import { RegistryRegistrationFormProps } from "./WidowRegistrationForm";
import { useToast } from "@components/ui/use-toast";
import { useMissionaryMutation } from "services/join-soower-registry";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { MissionaryJoinSoowerRequest2 } from "services/typings";

const ExistingMissionaryForm = ({
  onSuccess,
}: RegistryRegistrationFormProps) => {
  const form = useForm<z.infer<typeof ExisitingMissionRegistration>>({
    resolver: zodResolver(ExisitingMissionRegistration),
    defaultValues: {
      range: "year",
    },
  });
  const { toast } = useToast();
  const [joinMissionaryRegistry, { isLoading, isSuccess }] =
    useMissionaryMutation();

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const onSubmit = async (
    values: z.infer<typeof ExisitingMissionRegistration>
  ) => {
    const {
      acceptTerms,
      address,
      duration,
      email,
      isAffiliatedWithChurch,
      name,
      phoneNumber,
      previousWork,
      serviceArea,
      range,
    } = values;

    try {
      const data = {
        address,
        affiliated_to_church: isAffiliatedWithChurch === "Yes" ? true : false,
        email,
        phone: phoneNumber,
        service_area: serviceArea,
        declaration: acceptTerms,
        status: "existing",
        name,
        duration: Number(duration),
        timestamp: range,
        reason_about: previousWork,
      } as MissionaryJoinSoowerRequest2;
      await joinMissionaryRegistry(data).unwrap();
      toast({
        title: "Missionary registration successful, we will be in touch.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Unable to complete registration.",
        description:
          err ||
          "There seems to be a problem with your registration, please try again later.",
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
                  <Input placeholder="Phone number" type="number" {...field} />
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

          <div className="col-span-2 flex w-full items-end">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="w-[75%]">
                  <FormLabel required className="whitespace-nowrap">
                    How long have you been a missionary?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="No of months/years"
                      type="text"
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
                <FormItem className="w-[25%]">
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
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="serviceArea"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>
                  Where are you serving as a missionary?
                </FormLabel>
                <FormControl>
                  <Input placeholder="Service Area" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previousWork"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>
                  Tell us about some of your previous missionary work?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter some text..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isAffiliatedWithChurch"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required className="!text_regular_body_b font-[600]">
                  Are you affiliated to any church?
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
export default ExistingMissionaryForm;
