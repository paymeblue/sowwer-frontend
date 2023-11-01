"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useUpdateUserPasswordMutation } from "services/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@components/ui/input-with-icon";
import { DonorPasswordSettingsValidation } from "lib/validations/donor";
import { Button } from "@components/ui/button";
import useUserAuth from "@hooks/auth/useUserAuth";
import { useToast } from "@components/ui/use-toast";

const PasswordSettingsForm = () => {
  const { logout } = useUserAuth();
  const form = useForm<z.infer<typeof DonorPasswordSettingsValidation>>({
    resolver: zodResolver(DonorPasswordSettingsValidation),
  });
  const [updatePassword, { isLoading }] = useUpdateUserPasswordMutation();
  const { toast } = useToast();

  const onSubmit = async (
    values: z.infer<typeof DonorPasswordSettingsValidation>
  ) => {
    const { confirmNewPassword, currentPassword, newPassword } = values;

    try {
      await updatePassword({
        confirm_password: confirmNewPassword,
        old_password: currentPassword,
        new_password: newPassword,
      }).unwrap();
      toast({
        title:
          "Password change successfully, you will be logged out in 3 seconds",
      });
      setTimeout(async () => {
        await logout();
      }, 3000);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title:
          err?.data?.message ||
          "Failed to update passwords, please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-10"
      >
        <div className="flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="password"
                    placeholder="Enter your current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>New Password</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="password"
                    placeholder="Create a password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Confirm new password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          loading={isLoading}
          variant="secondary"
          className="ml-auto w-fit"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default PasswordSettingsForm;
