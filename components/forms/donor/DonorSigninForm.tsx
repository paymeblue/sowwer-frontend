"use client";
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
import { DonorSigninValidation } from "lib/validations/donor";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { Input as InputV2 } from "@components/ui/input-with-icon";
import { Input } from "@components/ui/input";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import { useLoginMutation } from "services/auth";

const DonorSigninForm = () => {
  const router = useRouter();
  const [login, { isSuccess }] = useLoginMutation();
  const form = useForm<z.infer<typeof DonorSigninValidation>>({
    resolver: zodResolver(DonorSigninValidation),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: z.infer<typeof DonorSigninValidation>) => {
    const { email, password } = values;
    login({
      identifier: email,
      password,
      type: "donor",
    });

    if (isSuccess) {
      router.push("/donor");
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col justify-start gap-5">
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
            <Link href="/auth/forgot-password" className="text-right">
              <span className="cursor-pointer text-right font-body text-[.7rem] font-[600] text-accent transition-all duration-200 hover:underline">
                Forgot Password?
              </span>
            </Link>
          </div>
          <Button type="submit" className="mt-8 w-full">
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DonorSigninForm;
