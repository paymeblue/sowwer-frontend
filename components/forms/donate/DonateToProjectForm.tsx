"use client";
import * as z from "zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DonateToProjectAuthValidation,
  DonateToProjectValidation,
} from "lib/validations/donate";
import { useForm } from "react-hook-form";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

import {
  useInitiatePaymentToProjectUnauthMutation,
  useInitiatePaymentToProjectAuthMutation,
} from "services/auth";
import { useVerifyProjectPaymentMutation } from "services/payouts";
import useFlutterConfig, { IConfig } from "@hooks/payments/useFlutterConfig";

import { Checkbox } from "@components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
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
import { Heart2 } from "react-iconly";
import { useToast } from "@components/ui/use-toast";
import useUserAuth from "@hooks/auth/useUserAuth";

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
    description: `Project Donation`,
    logo: "",
  },
};

interface Props {
  id: string;
  title: string;
  setPaymentSuccessful: Dispatch<SetStateAction<boolean>>;
}

const DonateToProjectForm = ({ id, title, setPaymentSuccessful }: Props) => {
  const { toast } = useToast();
  const [flutterLoading, setFlutterLoading] = useState(false);
  const { isAuthenticated, user } = useUserAuth();
  const form = useForm<z.infer<typeof DonateToProjectValidation>>({
    resolver: zodResolver(DonateToProjectValidation),
    defaultValues: {
      currency: "NGN",
      shouldSignup: false,
      isAnonymous: false,
    },
  });
  const formAuth = useForm<z.infer<typeof DonateToProjectAuthValidation>>({
    resolver: zodResolver(DonateToProjectAuthValidation),
    defaultValues: {
      currency: "NGN",
      isAnonymous: false,
    },
  });
  const [initiatePaymentToProjectUnauth, { isLoading }] =
    useInitiatePaymentToProjectUnauthMutation();
  const [initiatePaymentToProjectAuth, { isLoading: loadingPaymentAuth }] =
    useInitiatePaymentToProjectAuthMutation();
  const { getConfig } = useFlutterConfig();
  const [verifyProjectPayment, { isLoading: verifyingPayment }] =
    useVerifyProjectPaymentMutation();
  const [config, setConfig] = useState<IConfig>(DEFAULT_CONFIG);
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
          setConfig(DEFAULT_CONFIG);
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

  const onSubmit = async (
    values: z.infer<typeof DonateToProjectValidation>
  ) => {
    const {
      firstName,
      lastName,
      email,
      amount,
      currency,
      isAnonymous,
      phoneNumber,
      shouldSignup,
    } = values;
    try {
      const res = await initiatePaymentToProjectUnauth({
        id,
        firstName,
        lastName,
        email,
        anonymous: isAnonymous,
        amount: Number(amount.replace(/,/g, "")),
        createAccount: shouldSignup,
        phone: phoneNumber,
        password: "",
        confirm_password: "",
        currency,
      }).unwrap();

      const { txn_reference: txnRef, amount: amn } = res.data.donation;
      const config = getConfig({
        amount: amn,
        currency,
        desc: title || "Project Donation",
        txnRef,
        customer: {
          email,
          name: `${firstName} ${lastName}`,
          phone_number: phoneNumber,
        },
      });
      setConfig(config);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error occured initiating payment, please try again later",
      });
    }
  };

  const onSubmitAuth = async (
    values: z.infer<typeof DonateToProjectAuthValidation>
  ) => {
    const { amount, currency, isAnonymous } = values;
    try {
      const res = await initiatePaymentToProjectAuth({
        id,
        anonymous: isAnonymous,
        amount: Number(amount.replace(/,/g, "")),
        currency,
      }).unwrap();

      const { txn_reference: txnRef, amount: amn } = res.data;
      const config = getConfig({
        amount: amn,
        currency,
        desc: title || "Project Donation",
        txnRef,
        customer: {
          email: user?.email || "",
          name: `${user?.firstName} ${user?.lastName}`,
          phone_number: user?.phone || "",
        },
      });
      console.log({ config });
      setConfig(config);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error occured initiating payment, please try again later",
      });
    }
  };

  // Authorized user form: TODO: Can possibly refactor this out of here.
  if (isAuthenticated) {
    return (
      <Form {...formAuth}>
        <form
          className="flex w-full flex-col"
          onSubmit={formAuth.handleSubmit(onSubmitAuth)}
        >
          <div className="mb-2 space-y-1">
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
            loading={loadingPaymentAuth || verifyingPayment || flutterLoading}
            type="submit"
            className="ml-auto mt-8 w-fit space-x-2"
          >
            {!flutterLoading && !loadingPaymentAuth && !verifyingPayment && (
              <Heart2 set="bold" size={19} />
            )}
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
        <div className="mb-10 space-y-1">
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

        <div className="text_regular_body_b">
          <h4>Personal Information</h4>
          <div className="mt-2 flex items-center space-x-2">
            <Checkbox
              id="terms"
              className=""
              checked={form.watch("shouldSignup")}
              onClick={() =>
                form.setValue("shouldSignup", !form.watch("shouldSignup"))
              }
            />
            <label htmlFor="terms" className="text_small_body_r">
              I would like to sign up on Soower.
            </label>
          </div>
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
          loading={isLoading || verifyingPayment || flutterLoading}
          type="submit"
          className="ml-auto mt-8 w-fit space-x-2"
        >
          {!flutterLoading && !isLoading && !verifyingPayment && (
            <Heart2 set="bold" size={19} />
          )}
          <span>Donate now</span>
        </Button>
      </form>
    </Form>
  );
};

export default DonateToProjectForm;
