"use client";
import { useDonorRegisterMutation } from "services/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DonorSignupValidation } from "lib/validations/donor";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Input as InputV2 } from "@components/ui/input-with-icon";
import { useToast } from "@components/ui/use-toast";
import useDonorSignin from "@hooks/auth/useDonorSignin";

const DonorSignupForm = () => {
  const [signupDonor, { isLoading }] = useDonorRegisterMutation();
  const { loginDonor } = useDonorSignin();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof DonorSignupValidation>>({
    resolver: zodResolver(DonorSignupValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      confirmPassword: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof DonorSignupValidation>) => {
    const {
      confirmPassword,
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
    } = values;
    try {
      await signupDonor({
        confirm_password: confirmPassword,
        email,
        firstName,
        lastName,
        password,
        phone: phoneNumber,
      }).unwrap();
      await loginDonor({
        email,
        password,
      });
    } catch (err) {
      console.log({ err });
      toast({
        variant: "destructive",
        title: "Unable to signup. Please try again later",
      });
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col justify-start gap-4">
            <div className="grid grid-cols-2 gap-5">
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
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel required>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
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
                    <FormLabel required>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone number"
                        type="number"
                        inputMode="numeric"
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
                  <FormItem className="">
                    <FormLabel required>Password</FormLabel>
                    <FormControl>
                      <InputV2
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel required>Confirm Password</FormLabel>
                    <FormControl>
                      <InputV2
                        placeholder="Confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <span className="-mt-1 font-body text-[.7rem] text-body-2">
              Password must be at least 8 characters
            </span>
          </div>
          <Button type="submit" className="mt-16 w-full" loading={isLoading}>
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DonorSignupForm;
