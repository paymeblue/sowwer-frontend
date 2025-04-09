"use client";

import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormInput from "@components/ui/formInput";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SuccessCard from "./success-card";

const schema = z
  .object({
    new_password: z
      .string()
      .refine((value) => value && value.length > 0, "Your password is required")
      .refine(
        (value) => {
          return (
            value &&
            value.length >= 8 &&
            /\d/.test(value) &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
          );
        },
        {
          message:
            "Password must have at least one lowercase character, one uppercase character, one digit, one special character, and be at least 8 characters long",
        }
      ),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match!",
    path: ["confirm_password"],
  });

type FormType = z.infer<typeof schema>;

const ResetPasswordPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: FormType) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      setShowSuccess(true);
      reset();
    } catch (error) {
      // More specific error handling
      const errorMessage =
        error instanceof Error ? error.message : "Error submitting form";
      console.log(errorMessage);
      toast({
        variant: "destructive",
        title: "Error!",
        description: "An error occured while signing up.",
      });
    }
  };

  return (
    <Fragment>
      {showSuccess ? (
        <SuccessCard />
      ) : (
        <div
          className="m-6 w-full -translate-y-[40%] space-y-6 rounded-xl bg-white p-6 text-center shadow-[0rem_.25rem_1.25rem_0rem_#0000000F]
lg:mx-auto lg:w-[500px]"
        >
          <div className="my-4 w-full">
            <h5 className="m-0 p-0 text-center font-aeonik text-[22px] font-medium leading-[-0.12px] text-black">
              Reset Password
            </h5>
            <p className="m-0 to-body-2 p-0 text-center font-montreal text-sm">
              Enter and confirm your new password below
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-5 text-start"
            >
              <FormInput
                name="new_password"
                label="New Password"
                inputProps={{
                  placeholder: "Create new password",
                  type: "password",
                }}
              />
              <FormInput
                name="confirm_password"
                label="Confirm Password"
                inputProps={{
                  placeholder: "Confirm new password",
                  type: "password",
                }}
              />

              <FormButton
                text="Reset password"
                loading={isSubmitting}
                loadingText="Submitting..."
                disabled={!isDirty || !isValid}
                className="w-full"
              />
            </form>
          </Form>
        </div>
      )}
    </Fragment>
  );
};

export default ResetPasswordPage;
