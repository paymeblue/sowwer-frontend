import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

import { MinistrySignupPersonalInformationValidation } from "lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Input as InputV2 } from "@components/ui/input-with-icon";
import { Button } from "@components/ui/button";
import { ArrowLeft, ArrowRight } from "react-iconly";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<
    z.infer<typeof MinistrySignupPersonalInformationValidation>
  >;
}

const MinistryPersonalInformation = ({ setActiveStep, form }: Props) => {
  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  const handleContinue = () => {
    setActiveStep((step) => step + 1);
  };
  return (
    <section className="mt-10 p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleContinue)}
          className="flex w-full flex-col"
        >
          <div className="flex flex-col gap-x-4 gap-y-6 lg:grid lg:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" type="text" {...field} />
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
                    <Input placeholder="Last name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel required>Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your role in your ministry"
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
                <FormItem>
                  <FormLabel required>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="text"
                      inputMode="email"
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
                <FormItem>
                  <FormLabel required>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      type="number"
                      min={0}
                      inputMode="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="col-span-2">
                  <FormItem>
                    <FormLabel required>Password</FormLabel>
                    <FormControl>
                      <InputV2
                        placeholder="Create a password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <p className="mt-4 font-body text-[.7rem] text-body-2">
                    Password must be at least 8 characters
                  </p>
                </div>
              )}
            />
          </div>
          <div className="mt-8 flex w-full items-center justify-between">
            <Button
              type="submit"
              variant="outline"
              className="space-x-2"
              onClick={handleBack}
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </Button>
            <Button type="submit" variant="secondary" className="space-x-2">
              <span>Continue</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default MinistryPersonalInformation;
