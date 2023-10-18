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
import { AdminSigninValidation } from "lib/validations/donor";
import { Button } from "@components/ui/button";
import { Input as InputV2 } from "@components/ui/input-with-icon";
import { Input } from "@components/ui/input";
import { useRouter } from "next/navigation";

const AdminSigninForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof AdminSigninValidation>>({
    resolver: zodResolver(AdminSigninValidation),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof AdminSigninValidation>) => {
    // await loginDonor(values);
    router.push("/admin");
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
          </div>
          <Button type="submit" className="mt-8 w-full">
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminSigninForm;
