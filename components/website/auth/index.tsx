"use client";

import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormInput from "@components/ui/formInput";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z
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
});

type FormType = z.infer<typeof schema>;

const LoginPage = () => {
  const { toast } = useToast();
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
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
      toast({
        title: "Thank you for signing up!",
        description: "Your message has been sent successfully.",
      });
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
    <div
      className="m-6 w-full -translate-y-[40%] space-y-6 rounded-xl bg-white p-6 text-center shadow-[0rem_.25rem_1.25rem_0rem_#0000000F]
lg:mx-auto lg:w-[500px]"
    >
      <div className="my-4 w-full">
        <h5 className="m-0 p-0 text-center font-aeonik text-[22px] font-medium leading-[-0.12px] text-black">
          Admin Log In
        </h5>
        <p className="m-0 to-body-2 p-0 text-center font-montreal text-sm">
          Enter your account details below to login to your admin account.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 text-start"
        >
          <FormInput
            name="email"
            label="Email address"
            inputProps={{
              placeholder: "Email address",
              type: "email",
            }}
          />
          <FormInput
            name="password"
            label="Password"
            inputProps={{
              placeholder: "Password",
              type: "password",
            }}
          />

          <FormButton
            text="Log in"
            loading={isSubmitting}
            loadingText="Submitting..."
            disabled={!isDirty || !isValid}
            className="w-full"
          />
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
