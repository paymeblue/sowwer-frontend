"use client";

import { Form } from "@components/ui/form";
import FormAmount from "@components/ui/formAmount";
import FormButton from "@components/ui/formButton";
import FormCheckbox from "@components/ui/formCheckbox";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import FormRadio from "@components/ui/formRadio";
import FormSelect from "@components/ui/formSelect";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { dadProjectSchema, dadProjectType } from "lib/validations/donations";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const sponsorshipType = [
  {
    label: "Full Sponsorship",
    value: "full-sponsorship",
    desc: "Commit to changing a child's future by covering their education completely.",
  },
  {
    label: "Partial Sponsorship",
    value: "partial-sponsorship",
    desc: "Contribute any amount to our general education fund for orphans.",
  },
];
const paymentFrequency = [
  {
    label: "Per term",
    value: "per-term",
  },
  {
    label: "Per session",
    value: "per-session",
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
const selectOptions = [
  {
    label: "South-South",
    value: "south-south",
  },
  {
    label: "South-East",
    value: "south-east",
  },
];

const DADProject = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<dadProjectType>({
    mode: "onBlur",
    defaultValues: {
      sponsorship_type: "full-sponsorship",
      payment_frequency: "per-term",
      geo_location: "south-south",
      form_amount: { currency: "NGN", amount: "" },
      f_name: "",
      l_name: "",
      email: "",
      phone: { phone_code: "+234", phone_number: "" },
      t_and_c: false,
    },
    resolver: zodResolver(dadProjectSchema),
  });
  const {
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { isDirty, isValid, isSubmitting },
  } = form;
  const terms = watch("t_and_c");

  const onSubmit = async (data: dadProjectType) => {
    if (!terms) {
      setError("t_and_c", {
        type: "manual",
        message: "You must accept the terms and conditions",
      });
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(data);
      router.push("?success=true");
      toast({
        title: "Thank you!",
        description: "Your submission was successful.",
      });
      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error submitting form";
      toast({
        title: "Submission Failed",
        description: errorMessage,
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormRadio
          name="sponsorship_type"
          label="Choose a sponsorship type"
          options={sponsorshipType}
        />
        <FormSelect
          label="Geolocation"
          name="geo_location"
          options={selectOptions}
        />
        <FormAmount
          name={{
            currency: "form_amount.currency",
            amount: "form_amount.amount",
          }}
          label="Amount"
          options={currency}
          desc="Per session = NGN 450,000.00"
        />
        <FormRadio
          name="payment_frequency"
          label="Payment frequency"
          options={paymentFrequency}
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
            text="Donate Now"
            loadingText="Submitting..."
            loading={isSubmitting}
            disabled={!isDirty || !isValid}
          />
        </div>
      </form>
    </Form>
  );
};

export default DADProject;
