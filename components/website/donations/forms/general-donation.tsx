"use client";

import { Form } from "@components/ui/form";
import FormAmount from "@components/ui/formAmount";
import FormButton from "@components/ui/formButton";
import FormCheckbox from "@components/ui/formCheckbox";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import FormRadio from "@components/ui/formRadio";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authDonationSchema,
  authDonationType,
  unAuthDonationSchema,
  unAuthDonationType,
} from "lib/validations/donations";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const frequency = [
  {
    label: "One-time",
    value: "one-time",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
];
const currency = [
  { label: "NGN", value: "NGN" },
  { label: "USD", value: "USD" },
];
const country_codes = [
  { label: "+1", value: "+1" },
  { label: "+234", value: "+234" },
];
type generalDonationType = authDonationType | unAuthDonationType;
const GeneralDonation = () => {
  const searchParams = useSearchParams();
  const isAuth = searchParams.get("isAuth") === "true";
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: authDonationType = {
    frequency: "one-time",
    form_amount: { currency: "NGN", amount: "" },
  };

  const initialValues: unAuthDonationType = {
    frequency: "one-time",
    form_amount: { currency: "NGN", amount: "" },
    f_name: "",
    l_name: "",
    email: "",
    phone: { phone_code: "+234", phone_number: "" },
    t_and_c: false,
  };

  const authform = useForm<generalDonationType>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(authDonationSchema),
  });

  const unauthform = useForm<generalDonationType>({
    mode: "onBlur",
    defaultValues: initialValues,
    resolver: zodResolver(unAuthDonationSchema),
  });

  const {
    handleSubmit: unauthHandleSubmit,
    watch,
    setError,
    reset: unauthReset,
    formState: {
      isDirty: unauthIsDirty,
      isValid: unauthIsValid,
      isSubmitting: unauthIsSubmitting,
    },
  } = unauthform;

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = authform;
  const terms = watch("t_and_c");

  const onSubmit = async (data: generalDonationType) => {
    if (!isAuth && !terms) {
      setError("t_and_c", {
        type: "manual",
        message: "You must accept the terms and conditions",
      });
      return;
    }
    // submit the form data to the server
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(data);
      router.push("?success=true");
      toast({
        title: "Thank you!",
        description: "Your submission was successful.",
      });
      reset();
      unauthReset();
    } catch (error) {
      // More specific error handling
      const errorMessage =
        error instanceof Error ? error.message : "Error submitting form";
      toast({
        title: "Submission Failed",
        description: errorMessage,
      });
    }
  };
  const unAuthForm = (
    <Form {...unauthform}>
      <form
        onSubmit={unauthHandleSubmit(onSubmit)}
        className="w-full space-y-5"
      >
        <FormRadio
          name="frequency"
          label="Donation frequency"
          options={frequency}
        />
        <FormAmount
          name={{
            currency: "form_amount.currency",
            amount: "form_amount.amount",
          }}
          label="Amount"
          options={currency}
        />
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <FormInput
            name="f_name"
            label="First name"
            inputProps={{
              placeholder: "First name",
              type: "text",
            }}
          />
          <FormInput
            name="l_name"
            label="Last name"
            inputProps={{
              placeholder: "Last name",
              type: "text",
            }}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <FormInput
            name="email"
            label="Email address"
            inputProps={{
              placeholder: "johndoe@gmail.com",
              type: "email",
            }}
          />
          <FormPhone
            name={{
              phone_code: "phone.phone_code",
              phone_number: "phone.phone_number",
            }}
            label="Phone number"
            options={country_codes}
          />
        </div>
        <FormCheckbox
          name="t_and_c"
          label="I would like to sign up as a donor on SOOWER"
        />
        <div className="flex items-center justify-end pt-6">
          <FormButton
            text="Donate now"
            loadingText="Submitting..."
            loading={unauthIsSubmitting}
            disabled={!unauthIsDirty || !unauthIsValid}
          />
        </div>
      </form>
    </Form>
  );
  const authForm = (
    <Form {...authform}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormRadio
          name="frequency"
          label="Donation frequency"
          options={frequency}
        />
        <FormAmount
          name={{
            currency: "form_amount.currency",
            amount: "form_amount.amount",
          }}
          label="Amount"
          options={currency}
        />
        <div className="flex items-center justify-end pt-6">
          <FormButton
            text="Donate now"
            loadingText="Submitting..."
            loading={isSubmitting}
            disabled={!isDirty || !isValid}
          />
        </div>
      </form>
    </Form>
  );
  return isAuth ? authForm : unAuthForm;
};

export default GeneralDonation;
