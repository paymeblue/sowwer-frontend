"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useForgotPasswordMutation } from "services/auth";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPassword } from "lib/validations/auth";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";

const ForgotPasswordForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<z.infer<typeof ForgotPassword>>({
    resolver: zodResolver(ForgotPassword),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (values: z.infer<typeof ForgotPassword>) => {
    const { email } = values;
    try {
      await forgotPassword({ email }).unwrap();
      onSuccess();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to send password reset request",
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
          </div>
          <Button type="submit" className="mt-16 w-full" loading={isLoading}>
            Send email
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
