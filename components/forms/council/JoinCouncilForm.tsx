"use client";

import SuccessState from "@components/shared/SuccessState";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";

import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import statesInNigeria from "@lib/NigeriaStates";
import { JoinSoowerCouncil as JoinSoowerCouncilValidation } from "lib/validations/council";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowRight } from "react-iconly";
import { useJoinCouncilMutation } from "services/join-council";
import { JoinCouncilRegistrationRequest } from "services/join-council/typings";
import * as z from "zod";

const JoinCouncilForm = () => {
  const { toast } = useToast();
  const [joinCouncil, { isLoading, isSuccess }] = useJoinCouncilMutation();
  const form = useForm<z.infer<typeof JoinSoowerCouncilValidation>>({
    resolver: zodResolver(JoinSoowerCouncilValidation),
  });

  const onSubmit = async (
    values: z.infer<typeof JoinSoowerCouncilValidation>
  ) => {
    const {
      acceptTerms,
      address,
      email,
      name,
      nameOfChurch,
      phoneNumber,
      reason,
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
      const data: JoinCouncilRegistrationRequest = {
        address,
        church_name: nameOfChurch,
        declaration: acceptTerms,
        email,
        name,
        phone: phoneNumber,
        reason_to_join: reason,
        residential_state: state,
      };
      await joinCouncil(data).unwrap();
      toast({
        title: "Success",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to complete registration.",
        description: `${"There seems to be a problem with your registration, please try again later."}`,
        duration: 2500,
      });
    }
  };

  if (isSuccess) {
    return (
      <SuccessState
        title="Successful"
        desc="Thanks for showing interest to join the council. We will be in touch."
        className="h-[80vh]"
        action={
          <Link href="/">
            <Button variant="secondary">Back to homepage</Button>
          </Link>
        }
      />
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col"
      >
        <div className="flex flex-col gap-x-4 gap-y-5 lg:grid lg:grid-cols-2">
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
                  <Input placeholder="Email address" type="text" {...field} />
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
            name="state"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required className="">
                  Residential state
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
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>Residential address</FormLabel>
                <FormControl>
                  <Input placeholder="Address Line" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameOfChurch"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>What church do you attend?</FormLabel>
                <FormControl>
                  <Input placeholder="Name of church" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>
                  Why do you want to join the SOOWER Council?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly explain why you want to be a part of the council..."
                    rows={10}
                    {...field}
                  />
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
                  <FormMessage />
                  <FormLabel>
                    I commit to abide by Soower’s mission and affirm to work for
                    the good of the foundation.
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

export default JoinCouncilForm;
