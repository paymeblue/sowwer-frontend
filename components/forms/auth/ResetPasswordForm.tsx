"use client";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input-with-icon";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPassword } from "lib/validations/auth";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "services/auth";
import * as z from "zod";

interface Props {
  onSuccess: () => void;
  token: string;
}

const ResetPasswordForm = ({ onSuccess, token }: Props) => {
  const form = useForm<z.infer<typeof ResetPassword>>({
    resolver: zodResolver(ResetPassword),
    defaultValues: {
      password: "",
    },
  });
  const { toast } = useToast();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (values: z.infer<typeof ResetPassword>) => {
    const { confirmPassword, password } = values;
    try {
      await resetPassword({
        password,
        confirm_password: confirmPassword,
        token,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Unable to reset your password",
        description: err.message
          ? err.message
          : err ||
            "There was a problem reseting your password, please try again later.",
      });
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col justify-start gap-5">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button loading={isLoading} type="submit" className="mt-16 w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
