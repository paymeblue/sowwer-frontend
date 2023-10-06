"use client";
import * as z from "zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DonateToMinistryAuthValidation,
  DonateToMinistryValidation,
} from "lib/validations/donate";
import { useForm } from "react-hook-form";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import useFlutterConfig, {
  useFlutterConfigReccuring,
  IConfig,
  IConfigReccuring,
} from "@hooks/payments/useFlutterConfig";

import { useVerifyMinistryPaymentMutation } from "services/payouts";
import {
  useInitiatePaymentToMinistryUnauthMutation,
  useInitiatePaymentToMinistryAuthMutation,
} from "services/auth";

import { Checkbox } from "@components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { Input } from "@components/ui/input";
import { Input as InputV2 } from "@components/ui/input-with-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Button } from "@components/ui/button";
import { Heart2, InfoCircle } from "react-iconly";
import { Toggle } from "@components/ui/toggle";
import { useToast } from "@components/ui/use-toast";
import useUserAuth from "@hooks/auth/useUserAuth";

interface Props {
  id: string;
  title: string;
  setPaymentSuccessful: Dispatch<SetStateAction<boolean>>;
}

const DEFAULT_CONFIG = {
  public_key: "",
  tx_ref: "",
  amount: 0,
  currency: "NGN",
  payment_options: "card,mobilemoney,ussd",
  customer: {
    email: "",
    name: "",
    phone_number: "",
  },
  customizations: {
    title: "Soower Donations",
    description: `Ministry Donation`,
    logo: "",
  },
};

const DonateToMinistryForm = ({ setPaymentSuccessful, id, title }: Props) => {
  const { toast } = useToast();
  const [flutterLoading, setFlutterLoading] = useState(false);
  const form = useForm<z.infer<typeof DonateToMinistryValidation>>({
    resolver: zodResolver(DonateToMinistryValidation),
    defaultValues: {
      currency: "NGN",
      shouldSignup: false,
      isAnonymous: false,
    },
  });
  const formAuth = useForm<z.infer<typeof DonateToMinistryAuthValidation>>({
    resolver: zodResolver(DonateToMinistryAuthValidation),
    defaultValues: {
      currency: "NGN",
      isAnonymous: false,
    },
  });
  const { getConfig } = useFlutterConfig();
  const { getConfig: getRecuringConfig } = useFlutterConfigReccuring();
  const [initiatePaymentToMinistryUnauth, { isLoading: paymentAuthLoading }] =
    useInitiatePaymentToMinistryUnauthMutation();
  const { isAuthenticated, user } = useUserAuth();
  const [
    initiatePaymentToMinistryAuth,
    { isLoading: paymentLoadingForAuthUsers },
  ] = useInitiatePaymentToMinistryAuthMutation();
  const [verifyProjectPayment, { isLoading: verifyingPayment }] =
    useVerifyMinistryPaymentMutation();
  const [config, setConfig] = useState<IConfig | IConfigReccuring>(
    DEFAULT_CONFIG
  );
  const handleFlutterwavePayment = useFlutterwave(config);

  /* eslint-disable */
  useEffect(() => {
    if (config.public_key === "" && config.tx_ref === "") return; // it's the default config
    setFlutterLoading(true);

    handleFlutterwavePayment({
      callback: async (response) => {
        try {
          await verifyProjectPayment({
            txn_id: response.transaction_id.toString(),
            txn_reference: response.tx_ref,
          });

          setPaymentSuccessful(true);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Payment failed",
            description:
              "Unfortunately, we couldn't process your payment. Please try again later.",
          });
        } finally {
          setFlutterLoading(false);
        }
        closePaymentModal();
      },
      onClose: () => {
        setConfig(DEFAULT_CONFIG);
        setFlutterLoading(false);
        toast({
          variant: "destructive",
          title: "Payment was unsuccessful.",
        });
      },
    });
  }, [config]);
  /* eslint-enable */

  const donationType = form.watch("donationType");
  useEffect(() => {
    if (donationType === "recurring") {
      form.setValue("shouldSignup", true);
    }
  }, [donationType, form]);

  const onSubmit = async (
    values: z.infer<typeof DonateToMinistryValidation>
  ) => {
    const {
      amount,
      confirmPassword,
      currency,
      donationType,
      email,
      firstName,
      isAnonymous,
      lastName,
      password,
      phoneNumber,
      shouldSignup,
      frequency,
    } = values;

    try {
      const res = await initiatePaymentToMinistryUnauth({
        amount: Number(amount.replace(/,/g, "")),
        id,
        firstName,
        lastName,
        anonymous: isAnonymous,
        payment_mode: donationType,
        createAccount: shouldSignup,
        confirm_password: confirmPassword || "",
        password: password || "",
        currency,
        email,
        interval: frequency!,
        phone: phoneNumber,
      }).unwrap();

      const { txn_reference: txnRef, amount: amn } = res.data.donation;
      if (donationType === "one-time") {
        const config = getConfig({
          amount: amn,
          currency,
          desc: title || "Ministry Donation",
          txnRef,
          customer: {
            email,
            name: `${firstName} ${lastName}`,
            phone_number: phoneNumber,
          },
        });
        setConfig(config);
      }

      if (donationType === "recurring") {
        const config = getRecuringConfig({
          amount: amn,
          currency,
          desc: title || "Ministry Donation",
          txnRef,
          customer: {
            email,
            name: `${firstName} ${lastName}`,
            phone_number: phoneNumber,
          },
          paymentPlan: frequency,
        });
        setConfig(config);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error occured initiating payment, please try again later",
      });
    }
  };

  const onSubmitAuth = async (
    values: z.infer<typeof DonateToMinistryAuthValidation>
  ) => {
    const { amount, currency, donationType, isAnonymous, frequency } = values;

    if (!user) return;

    try {
      const res = await initiatePaymentToMinistryAuth({
        amount: Number(amount.replace(/,/g, "")),
        id,
        anonymous: isAnonymous,
        payment_mode: donationType,
        currency,
        interval: frequency!,
      }).unwrap();

      const { txn_reference: txnRef, amount: amn } = res.data;
      if (donationType === "one-time") {
        const config = getConfig({
          amount: amn,
          currency,
          desc: title || "Ministry Donation",
          txnRef,
          customer: {
            email: user?.email,
            name: `${user?.firstName} ${user?.lastName}`,
            phone_number: user?.lastName,
          },
        });
        setConfig(config);
      }

      if (donationType === "recurring") {
        const config = getRecuringConfig({
          amount: amn,
          currency,
          desc: title || "Ministry Donation",
          txnRef,
          customer: {
            email: user?.email,
            name: `${user?.firstName} ${user?.lastName}`,
            phone_number: user?.lastName,
          },
          paymentPlan: frequency,
        });
        setConfig(config);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error occured initiating payment, please try again later",
      });
    }
  };

  if (isAuthenticated) {
    return (
      <Form {...formAuth}>
        <form
          onSubmit={formAuth.handleSubmit(onSubmitAuth)}
          className="flex w-full flex-col"
        >
          {/* Donation type */}
          <FormField
            control={formAuth.control}
            name="donationType"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required className="!text_regular_body_b font-[600]">
                  Donation Type
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex items-center space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="one-time" />
                      </FormControl>
                      <FormLabel className="font-normal">One-Time</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="recurring" />
                      </FormControl>
                      <FormLabel className="font-normal">Recurring</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {formAuth.watch("donationType") === "recurring" && (
            <div className="mt-3 flex items-center">
              <FormField
                control={formAuth.control}
                name="frequency"
                render={() => (
                  <FormItem>
                    <Toggle
                      variant="outline"
                      className="rounded-r-none"
                      pressed={formAuth.watch("frequency") === "monthly"}
                      onClick={() => formAuth.setValue("frequency", "monthly")}
                    >
                      Monthly
                    </Toggle>
                    <Toggle
                      variant="outline"
                      pressed={formAuth.watch("frequency") === "quarterly"}
                      onClick={() =>
                        formAuth.setValue("frequency", "quarterly")
                      }
                      className="rounded-none border-b border-t"
                    >
                      Quaterly
                    </Toggle>
                    <Toggle
                      variant="outline"
                      className="rounded-l-none"
                      pressed={formAuth.watch("frequency") === "yearly"}
                      onClick={() => formAuth.setValue("frequency", "yearly")}
                    >
                      Yearly
                    </Toggle>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="mb-2 mt-10 space-y-1">
            <FormLabel required>Enter donation amount</FormLabel>
            <div className="flex w-full items-start">
              <FormField
                control={formAuth.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-r-none bg-[#F2F2F2]">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[30vh]">
                        <SelectItem value="NGN">NGN</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formAuth.control}
                name="amount"
                render={() => (
                  <FormItem className="w-[80%]">
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        type="text"
                        className="rounded-l-none"
                        value={formAuth.watch("amount")}
                        onChange={(event) => {
                          const rawValue = event?.target?.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Remove non-numeric characters
                          if (isNaN(+rawValue)) {
                            return formAuth.setValue("amount", "");
                          }
                          const formattedValue = new Intl.NumberFormat(
                            "en-US"
                          ).format(parseInt(rawValue || "0", 10));

                          formAuth.setValue(
                            "amount",
                            formattedValue !== "0" ? `${formattedValue}` : ""
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-2 flex items-center space-x-2">
            <Checkbox
              id="terms"
              className=""
              checked={formAuth.watch("isAnonymous")}
              onClick={() =>
                formAuth.setValue("isAnonymous", !formAuth.watch("isAnonymous"))
              }
            />
            <label htmlFor="terms" className="text_small_body_r">
              Don’t display my name publicly on the donor list.
            </label>
          </div>

          <Button
            loading={
              paymentLoadingForAuthUsers || verifyingPayment || flutterLoading
            }
            type="submit"
            className="ml-auto mt-8 w-fit space-x-2"
          >
            {!paymentLoadingForAuthUsers &&
              !flutterLoading &&
              !verifyingPayment && <Heart2 set="bold" size={19} />}
            <span>Donate now</span>
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        {/* Donation type */}
        <FormField
          control={form.control}
          name="donationType"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel required className="!text_regular_body_b font-[600]">
                Donation Type
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex items-center space-x-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="one-time" />
                    </FormControl>
                    <FormLabel className="font-normal">One-Time</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="recurring" />
                    </FormControl>
                    <FormLabel className="font-normal">Recurring</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("donationType") === "recurring" && (
          <div className="mt-3 flex items-center">
            <FormField
              control={form.control}
              name="frequency"
              render={() => (
                <FormItem>
                  <Toggle
                    variant="outline"
                    className="rounded-r-none"
                    pressed={form.watch("frequency") === "monthly"}
                    onClick={() => form.setValue("frequency", "monthly")}
                  >
                    Monthly
                  </Toggle>
                  <Toggle
                    variant="outline"
                    pressed={form.watch("frequency") === "quarterly"}
                    onClick={() => form.setValue("frequency", "quarterly")}
                    className="rounded-none border-b border-t"
                  >
                    Quaterly
                  </Toggle>
                  <Toggle
                    variant="outline"
                    className="rounded-l-none"
                    pressed={form.watch("frequency") === "yearly"}
                    onClick={() => form.setValue("frequency", "yearly")}
                  >
                    Yearly
                  </Toggle>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="my-10 space-y-1">
          <FormLabel required>Enter donation amount</FormLabel>
          <div className="flex w-full items-start">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-[20%]">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-r-none bg-[#F2F2F2]">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[30vh]">
                      <SelectItem value="NGN">NGN</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={() => (
                <FormItem className="w-[80%]">
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="text"
                      className="rounded-l-none"
                      value={form.watch("amount")}
                      onChange={(event) => {
                        const rawValue = event?.target?.value.replace(
                          /[^0-9]/g,
                          ""
                        ); // Remove non-numeric characters
                        if (isNaN(+rawValue)) {
                          return form.setValue("amount", "");
                        }
                        const formattedValue = new Intl.NumberFormat(
                          "en-US"
                        ).format(parseInt(rawValue || "0", 10));

                        form.setValue(
                          "amount",
                          formattedValue !== "0" ? `${formattedValue}` : ""
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="text_regular_body_b">
          <h4>Personal Information</h4>
          {form.watch("donationType") === "recurring" ? (
            <div className="flex items-center space-x-2 text-accent">
              <InfoCircle />
              <span className="font-body text-[.8rem] font-[300]">
                You are required to create an account on Soower for recurring
                donations.
              </span>
            </div>
          ) : (
            <div className="mt-2 flex items-center space-x-2">
              <Checkbox
                id="shoudSignup"
                className=""
                checked={form.watch("shouldSignup")}
                onClick={() =>
                  form.setValue("shouldSignup", !form.watch("shouldSignup"))
                }
              />
              <label htmlFor="shoudSignup" className="text_small_body_r">
                I would like to sign up on Soower.
              </label>
            </div>
          )}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone number"
                    type="number"
                    inputMode="numeric"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("shouldSignup") === true && (
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
          )}
          {form.watch("shouldSignup") === true && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>Confirm Password</FormLabel>
                  <FormControl>
                    <InputV2
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        {form.watch("shouldSignup") === true && (
          <p className="mt-2 font-body text-[.7rem] text-body-2">
            Password must be at least 8 characters
          </p>
        )}

        <div className="mt-6 flex items-center space-x-2">
          <Checkbox
            id="terms"
            className=""
            checked={form.watch("isAnonymous")}
            onClick={() =>
              form.setValue("isAnonymous", !form.watch("isAnonymous"))
            }
          />
          <label htmlFor="terms" className="text_small_body_r">
            Don’t display my name publicly on the donor list.
          </label>
        </div>

        <Button
          loading={paymentAuthLoading || verifyingPayment || flutterLoading}
          type="submit"
          className="ml-auto mt-8 w-fit space-x-2"
        >
          {!paymentAuthLoading && !flutterLoading && !verifyingPayment && (
            <Heart2 set="bold" size={19} />
          )}
          <span>Donate now</span>
        </Button>
      </form>
    </Form>
  );
};

export default DonateToMinistryForm;
