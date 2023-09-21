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
import { MinistrySigninValidation } from "lib/validations/ministry";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MinistrySigninForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof MinistrySigninValidation>>({
    resolver: zodResolver(MinistrySigninValidation),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof MinistrySigninValidation>) => {
    console.log("Submitted", { values });
    router.push("/ministry");
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
                    <Input placeholder="Password" type="password" {...field} />
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

export default MinistrySigninForm;
