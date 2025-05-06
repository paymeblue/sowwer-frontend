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
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserAuth from "@hooks/auth/useUserAuth";
import usePaystackConfig, {
  IPaystackConfig,
} from "@hooks/payments/usePaystackConfig";
import { cn } from "@lib/cn";
import {
  authDonationSchema,
  authDonationType,
  unAuthDonationSchema,
  unAuthDonationType,
} from "lib/validations/donations";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePaystackPayment } from "react-paystack";
import {
  useInitiateDonationAuthMutation,
  useInitiateDonationUnauthMutation,
  useVerifyDonationMutation,
} from "services/donate";
import { Input as InputV2 } from "@components/ui/input-with-icon";
import { ErrorResponse } from "services/typings";

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

const DEFAULT_PAYSTACK_CONFIG: IPaystackConfig = {
  email: "",
  reference: "",
  publicKey: "",
  amount: 0,
};

const GeneralDonation = () => {
  const { id } = useParams();
  const { isAuthenticated: isAuth, user } = useUserAuth();
  const [paystackLoading, setPaystackLoading] = useState(false);
  const router = useRouter();
  const { getConfig: getPaystackConfig } = usePaystackConfig();
  const { toast } = useToast();
  const [paystackConfig, setPaystackConfig] = useState<IPaystackConfig>(
    DEFAULT_PAYSTACK_CONFIG
  );
  const [referencesHash, setReferencesHash] = useState<Record<string, boolean>>(
    {}
  );
  const initializePayment = usePaystackPayment(paystackConfig);

  const [initiateDonationAuth, { isLoading: isInitiatingAuth }] =
    useInitiateDonationAuthMutation();
  const [initiateDonationUnauth, { isLoading: isInitiatingUnauth }] =
    useInitiateDonationUnauthMutation();
  const [verifyDonation, { isLoading: isVerifying }] =
    useVerifyDonationMutation();

  const defaultValues: authDonationType = {
    frequency: "one-time",
    form_amount: { currency: "NGN", amount: "" },
  };

  const getDonationType = () => {
    switch (id) {
      case "widow-care":
        return "widows-care";
      case "mission-care":
        return "mission-care";
      default:
        return "general";
    }
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

  const authform = useForm<authDonationType>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(authDonationSchema),
  });

  const unauthform = useForm<unAuthDonationType>({
    mode: "onBlur",
    defaultValues: initialValues,
    resolver: zodResolver(unAuthDonationSchema),
  });

  const {
    handleSubmit: unauthHandleSubmit,
    setError,
    reset: unauthReset,
    formState: {
      isDirty: unauthIsDirty,
      isValid: unauthIsValid,
      isSubmitting: unauthIsSubmitting,
    },
    getValues: getUnauthValues,
  } = unauthform;

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = authform;
  // const terms = watch("t_and_c");

  // Effect to handle payment initialization and verification
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
            const email = getUnauthValues().email || user?.email || "";

            // Verify payment
            await verifyDonation({
              txn_ref: paystackConfig.reference,
            }).unwrap();

            toast({
              title: "Thank you!",
              description: "Your donation was successful.",
            });

            setPaystackConfig(DEFAULT_PAYSTACK_CONFIG);
            reset();
            unauthReset();
            router.push(`?success=true&email=${email}`);
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
  }, [
    paystackConfig,
    initializePayment,
    toast,
    router,
    getUnauthValues,
    user,
    reset,
    unauthReset,
  ]);

  const onAuthSubmit = async (data: authDonationType) => {
    try {
      const res = await initiateDonationAuth({
        amount: Number(data.form_amount.amount.replace(/,/g, "")),
        currency: data.form_amount.currency,
        frequency: data.frequency,
        type: getDonationType(), // Adding required type field
      }).unwrap();

      const { txn_reference: txnRef, amount: amn } = res.data;

      const config = getPaystackConfig({
        amount: amn * 100,
        email: user?.email || "",
        reference: txnRef,
      });

      setPaystackConfig(config);
    } catch (error) {
      const acutalError = error as ErrorResponse;
      const errorMessage = acutalError?.data.message || "Error submitting form";
      toast({
        title: "Submission Failed",
        description: errorMessage,
      });
    }
  };

  const onUnauthSubmit = async (data: unAuthDonationType) => {
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

    try {
      const res = await initiateDonationUnauth({
        amount: Number(data.form_amount.amount.replace(/,/g, "")),
        currency: data.form_amount.currency,
        frequency: data.frequency,
        email: data.email,
        first_name: data.f_name,
        last_name: data.l_name,
        phone: `${data.phone.phone_code}${data.phone.phone_number}`,
        createAccount: data.t_and_c,
        password: data.t_and_c ? data.password || "" : "",
        confirm_password: data.t_and_c ? data.confirmPassword || "" : "",
        type: getDonationType(), // Adding required type field
      }).unwrap();

      // Extract data from the response structure
      const txnRef = res.data.donation.txn_reference;
      const amn = res.data.donation.amount;

      const config = getPaystackConfig({
        amount: amn * 100,
        email: data.email,
        reference: txnRef,
      });

      setPaystackConfig(config);
    } catch (error) {
      const acutalError = error as ErrorResponse;
      const errorMessage = acutalError?.data.message || "Error submitting form";
      toast({
        title: "Submission Failed",
        description: errorMessage,
      });
    }
  };

  const unAuthForm = (
    <Form {...unauthform}>
      <form
        onSubmit={unauthHandleSubmit(onUnauthSubmit)}
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
        {unauthform.watch("t_and_c") && (
          <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
            <FormField
              control={unauthform.control}
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
              control={unauthform.control}
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
            text="Donate now"
            loadingText="Processing..."
            loading={
              unauthIsSubmitting ||
              isInitiatingUnauth ||
              paystackLoading ||
              isVerifying
            }
            disabled={!unauthIsDirty || !unauthIsValid}
          />
        </div>
      </form>
    </Form>
  );

  const authForm = (
    <Form {...authform}>
      <form onSubmit={handleSubmit(onAuthSubmit)} className="w-full space-y-5">
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
            loadingText="Processing..."
            loading={
              isSubmitting || isInitiatingAuth || paystackLoading || isVerifying
            }
            // disabled={!isDirty || !isValid}
          />
        </div>
      </form>
    </Form>
  );

  return isAuth ? authForm : unAuthForm;
};

export default GeneralDonation;
