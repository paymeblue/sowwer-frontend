"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import FormAmount from "@components/ui/formAmount";
import FormButton from "@components/ui/formButton";
import FormCheckbox from "@components/ui/formCheckbox";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import FormRadio from "@components/ui/formRadio";
import FormSelect from "@components/ui/formSelect";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
// import useUserAuth from "@hooks/auth/useUserAuth";
import usePaystackConfig, {
  IPaystackConfig,
} from "@hooks/payments/usePaystackConfig";
import {
  dadProjectAuthSchema,
  dadProjectAuthType,
  dadProjectSchema,
  dadProjectType,
} from "lib/validations/donations";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePaystackPayment } from "react-paystack";
import {
  useInitiateDadDonationAuthMutation,
  useInitiateDadDonationUnauthMutation,
  useVerifyDadDonationMutation,
} from "services/dad-project";
import { Input as InputV2 } from "@components/ui/input-with-icon";
import { cn } from "@lib/cn";
import useUserAuth from "@hooks/auth/useUserAuth";

const DEFAULT_PAYSTACK_CONFIG: IPaystackConfig = {
  email: "",
  reference: "",
  publicKey: "",
  amount: 0,
};

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
  // { label: "USD", value: "USD" },
];
const country_codes = [{ label: "+234", value: "+234" }];
const selectOptions = [
  {
    label: "South-South",
    value: "south-south",
    amountPerTerm: "100,000",
    amountPerSession: "300,000",
  },
  {
    label: "South-East",
    value: "south-east",
    amountPerTerm: "100,000",
    amountPerSession: "300,000",
  },
  {
    label: "South-West",
    value: "south-west",
    amountPerTerm: "100,000",
    amountPerSession: "300,000",
  },
  {
    label: "North-West",
    value: "north-west",
    amountPerTerm: "100,000",
    amountPerSession: "300,000",
  },
  {
    label: "North-Central",
    value: "north-central",
    amountPerTerm: "100,000",
    amountPerSession: "300,000",
  },
];

const DADProject = () => {
  const router = useRouter();
  const [paystackLoading, setPaystackLoading] = useState(false);
  const { isAuthenticated, user } = useUserAuth();
  // const { isAuthenticated, user } = useUserAuth();
  const [initiateDadDonationUnauth, { isLoading }] =
    useInitiateDadDonationUnauthMutation();
  const [initiateDadDonationAuth, { isLoading: isInitiatingAuth }] =
    useInitiateDadDonationAuthMutation();
  const [verifyDadDonation, { isLoading: isVerifying }] =
    useVerifyDadDonationMutation();
  const { getConfig: getPaystackConfig } = usePaystackConfig();
  const { toast } = useToast();
  const [paystackConfig, setPaystackConfig] = useState<IPaystackConfig>(
    DEFAULT_PAYSTACK_CONFIG
  );
  const [referencesHash, setReferencesHash] = useState<Record<string, boolean>>(
    {}
  );
  const initializePayment = usePaystackPayment(paystackConfig);

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

  const formAuth = useForm<dadProjectAuthType>({
    mode: "onBlur",
    defaultValues: {
      sponsorship_type: "full-sponsorship",
      payment_frequency: "per-term",
      form_amount: { currency: "NGN", amount: "" },
      geo_location: "south-south",
    },
    resolver: zodResolver(dadProjectAuthSchema),
  });

  const sponsorshipTypeFormValue = form.watch("sponsorship_type");
  const geoLocationFormValue = form.watch("geo_location");
  const paymentFrequencyFormValue = form.watch("payment_frequency");

  const sponsorshipTypeFormValueAuth = formAuth.watch("sponsorship_type");
  const geoLocationFormValueAuth = formAuth.watch("geo_location");
  const paymentFrequencyFormValueAuth = formAuth.watch("payment_frequency");

  useEffect(() => {
    if (sponsorshipTypeFormValue === "full-sponsorship") {
      const geoZone = selectOptions.find(
        (option) => option.value === geoLocationFormValue
      );
      form.setValue(
        "form_amount.amount",
        paymentFrequencyFormValue === "per-session"
          ? geoZone?.amountPerSession || ""
          : geoZone?.amountPerTerm || ""
      );
    }
  }, [
    sponsorshipTypeFormValue,
    geoLocationFormValue,
    paymentFrequencyFormValue,
    form,
  ]);

  useEffect(() => {
    if (sponsorshipTypeFormValueAuth === "full-sponsorship") {
      const geoZone = selectOptions.find(
        (option) => option.value === geoLocationFormValueAuth
      );
      formAuth.setValue(
        "form_amount.amount",
        paymentFrequencyFormValueAuth === "per-session"
          ? geoZone?.amountPerSession || ""
          : geoZone?.amountPerTerm || ""
      );
    }
  }, [
    sponsorshipTypeFormValueAuth,
    geoLocationFormValueAuth,
    paymentFrequencyFormValueAuth,
    formAuth,
  ]);

  useEffect(() => {
    if (
      paystackConfig.publicKey === "" ||
      paystackConfig.reference === "" ||
      referencesHash[paystackConfig.reference]
    )
      return;
    setPaystackLoading(true);
    setReferencesHash((prev) => ({
      ...prev,
      [paystackConfig.reference]: true,
    }));
    initializePayment(
      () => {
        const verify = async () => {
          try {
            const email = form.getValues().email;

            // Verify payment
            await verifyDadDonation({
              txn_ref: paystackConfig.reference,
            }).unwrap();
            toast({
              title: "Thank you!",
              description: "Your submission was successful.",
            });
            setPaystackConfig(DEFAULT_PAYSTACK_CONFIG);
            reset();
            router.push(`?success=true&email=${email || user?.email}`);
          } catch (error) {
            setPaystackConfig(DEFAULT_PAYSTACK_CONFIG);
            toast({
              variant: "destructive",
              title: "Payment failed",
              description:
                "Unfortunately, we couldn't process your payment. Please try again later.",
            });
          } finally {
            setPaystackLoading(false);
          }
        };
        verify();
      },
      () => {
        setPaystackConfig(DEFAULT_PAYSTACK_CONFIG);
        setPaystackLoading(false);
      }
    );
  }, [paystackConfig, initializePayment, toast, router]);

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmitAuth = async (data: dadProjectAuthType) => {
    try {
      const res = await initiateDadDonationAuth({
        amount: Number(data.form_amount.amount.replace(/,/g, "")),
        currency: data.form_amount.currency || "NGN",
        frequency: data.payment_frequency,
        geo_location: data.geo_location,
        sponsorship_type:
          data.sponsorship_type === "full-sponsorship" ? "full" : "partial",
      }).unwrap();
      const { txn_reference: txnRef, amount: amn } = res.data;

      const config = getPaystackConfig({
        amount: amn * 100,
        email: user?.email || "",
        reference: txnRef,
      });
      setPaystackConfig(config);

      // reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error submitting form";
      toast({
        title: "Submission Failed",
        description: errorMessage,
      });
    }
  };

  const onSubmit = async (data: dadProjectType) => {
    try {
      if (data.t_and_c) {
        if (!data.password) {
          setError("password", {
            message: "Please enter a password",
          });
          return;
        }

        if (!data.confirmPassword) {
          setError("confirmPassword", {
            message: "Required",
          });
          return;
        }

        if (data.password !== data.confirmPassword) {
          setError("password", {
            message: "Passwords dont match",
          });
          setError("confirmPassword", {
            message: "Passwords dont match",
          });
          return;
        }
      }
      const res = await initiateDadDonationUnauth({
        amount: Number(data.form_amount.amount.replace(/,/g, "")),
        confirm_password: data.t_and_c ? data.confirmPassword || "" : "",
        createAccount: data.t_and_c,
        currency: data.form_amount.currency || "NGN",
        frequency: data.payment_frequency,
        email: data.email,
        first_name: data.f_name,
        last_name: data.l_name,
        geo_location: data.geo_location,
        password: data.t_and_c ? data.password || "" : "",
        phone: `${data.phone.phone_code}${data.phone.phone_number}`,
        sponsorship_type:
          data.sponsorship_type === "full-sponsorship" ? "full" : "partial",
      }).unwrap();
      const { txn_reference: txnRef, amount: amn } = res.data.donation;

      const config = getPaystackConfig({
        amount: amn * 100,
        email: data.email,
        reference: txnRef,
      });
      setPaystackConfig(config);

      // reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error submitting form";
      toast({
        title: "Submission Failed",
        description: errorMessage,
      });
    }
  };

  if (isAuthenticated) {
    return (
      <Form {...formAuth}>
        <form
          onSubmit={formAuth.handleSubmit(onSubmitAuth)}
          className="w-full space-y-5"
        >
          <FormRadio
            name="sponsorship_type"
            label="Choose a sponsorship type"
            options={sponsorshipType}
          />
          {sponsorshipTypeFormValue === "full-sponsorship" && (
            <FormSelect
              label="Geolocation"
              name="geo_location"
              options={selectOptions}
            />
          )}
          <FormAmount
            disabled={sponsorshipTypeFormValueAuth === "full-sponsorship"}
            name={{
              currency: "form_amount.currency",
              amount: "form_amount.amount",
            }}
            label="Amount"
            options={currency}
            desc={
              sponsorshipTypeFormValueAuth === "full-sponsorship"
                ? `Per session = NGN ${
                    selectOptions.find(
                      (option) => option.value === geoLocationFormValueAuth
                    )?.amountPerSession
                  }`
                : ""
            }
          />
          {sponsorshipTypeFormValueAuth === "full-sponsorship" && (
            <FormRadio
              name="payment_frequency"
              label="Payment frequency"
              options={paymentFrequency}
            />
          )}
          <div className="flex items-center justify-end pt-6">
            <FormButton
              text="Donate Now"
              loadingText="Submitting..."
              loading={
                isSubmitting ||
                isLoading ||
                paystackLoading ||
                isVerifying ||
                isInitiatingAuth
              }
              // disabled={!isDirty || !isValid}
            />
          </div>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormRadio
          name="sponsorship_type"
          label="Choose a sponsorship type"
          options={sponsorshipType}
        />
        {sponsorshipTypeFormValue === "full-sponsorship" && (
          <FormSelect
            label="Geolocation"
            name="geo_location"
            options={selectOptions}
          />
        )}
        <FormAmount
          disabled={form.watch("sponsorship_type") === "full-sponsorship"}
          name={{
            currency: "form_amount.currency",
            amount: "form_amount.amount",
          }}
          label="Amount"
          options={currency}
          desc={
            sponsorshipTypeFormValue === "full-sponsorship"
              ? `Per session = NGN ${
                  selectOptions.find(
                    (option) => option.value === geoLocationFormValue
                  )?.amountPerSession
                }`
              : ""
          }
        />
        {sponsorshipTypeFormValue === "full-sponsorship" && (
          <FormRadio
            name="payment_frequency"
            label="Payment frequency"
            options={paymentFrequency}
          />
        )}
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
        {form.watch("t_and_c") && (
          <div className="w-fullflex-col flex items-center justify-center gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel required>Password</FormLabel>
                  <FormControl>
                    <InputV2
                      className={cn(
                        "m-0 rounded-xl border border-input bg-white focus-within:border-primary focus-within:shadow-input focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 hover:border-primary hover:shadow-input focus-visible:ring-0 focus-visible:ring-offset-0",
                        error &&
                          "focus-within:border-error focus-within:shadow-input-error"
                      )}
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="w-full flex-1 ">
                  <FormLabel required>Confirm Password</FormLabel>
                  <FormControl>
                    <InputV2
                      placeholder="Confirm password"
                      type="password"
                      className={cn(
                        "m-0 rounded-xl border border-input bg-white focus-within:border-primary focus-within:shadow-input focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 hover:border-primary hover:shadow-input focus-visible:ring-0 focus-visible:ring-offset-0",
                        error &&
                          "focus-within:border-error focus-within:shadow-input-error"
                      )}
                      {...field}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <div className="flex items-center justify-end pt-6">
          <FormButton
            text="Donate Now"
            loadingText="Submitting..."
            loading={
              isSubmitting || isLoading || paystackLoading || isVerifying
            }
            // disabled={!isDirty || !isValid}
          />
        </div>
      </form>
    </Form>
  );
};

export default DADProject;
