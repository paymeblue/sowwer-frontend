"use client";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@components/assets/icons";
import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import FormTextArea from "@components/ui/formTextArea";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Script from "next/script";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    turnstile?: { reset: (widgetId?: string) => void };
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
    onTurnstileError?: () => void;
  }
}

const options = [
  {
    value: "+1",
    label: "+1",
  },
  {
    value: "+234",
    label: "+234",
  },
];

// Kept in step with lib/validations/contactUs.ts, which the /api/contact-us
// route actually enforces — a looser check here just means the form looks
// valid to the visitor and then 400s at the server for no visible reason.
const schema = z.object({
  name: z.string().min(2, "Minimum 2 characters"),
  phone: z.object({
    phone_code: z.string().min(1, "Phone code is required"),
    phone_number: z.string().min(7, "Minimum 7 characters"),
  }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(254),
  message: z.string().min(3, "Minimum 3 characters").max(1000),
});

type FormType = z.infer<typeof schema>;

const ContactUs = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  // Cloudflare's implicit widget looks these up on window by name — set them
  // before the api.js script runs its DOM scan, so the widget actually has
  // somewhere to report a solved token to.
  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => setTurnstileToken(token);
    window.onTurnstileExpired = () => setTurnstileToken("");
    window.onTurnstileError = () => setTurnstileToken("");
  }, []);

  const form = useForm<FormType>({
    defaultValues: {
      name: "",
      phone: {
        phone_code: "+234",
        phone_number: "",
      },
      email: "",
      message: "",
    },
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = async (values: FormType, e?: any) => {
    const formData = new FormData(e?.target);
    const { name, email, phone, message } = values;

    formData.append("fullName", name);
    formData.append("email", email);
    formData.append("countryCode", phone.phone_code);
    formData.append("phoneNumber", phone.phone_number);
    formData.append("message", message);

    try {
      setIsLoading(true);
      const res = await fetch("/api/contact-us", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        toast({
          title: "Thank you for reaching out!",
          description: "Your message has been sent successfully.",
        });
        reset();
      } else {
        throw new Error(result);
      }
    } catch (error) {
      // More specific error handling
      const errorMessage =
        error instanceof Error ? error.message : "Error submitting form";
      console.log(errorMessage);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description:
          "There was an error sending your message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
      // Tokens are single-use either way (accepted or rejected) — reset so
      // a retry gets a fresh one instead of resubmitting a dead token.
      window.turnstile?.reset();
      setTurnstileToken("");
    }
  };

  return (
    <Fragment>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async={true}
        defer={true}
      />
      <section className="space-y-8 p-6 max-lg:mt-20 sm:space-y-12 sm:p-10 md:space-y-16 md:p-20 lg:p-40">
        <div className="mx-auto w-full max-w-[739px] md:mx-0">
          <div className="mb-4 sm:mb-8">
            <p className="w-max rounded-full rounded-br-sm bg-[#FCF9F2] px-4 py-3 font-aeonik text-2xl font-bold leading-tight tracking-[-0.12px] text-black sm:px-6 sm:py-4 sm:text-3xl md:px-8 md:py-6 md:text-4xl md:leading-[61px] lg:text-[45px]">
              Contact Us.
            </p>
            <p className="mt-4 font-montreal text-base leading-normal text-body-2 sm:mt-8 sm:text-lg sm:leading-[26px]">
              Want to make an inquiry or give us some feedback? You can reach us
              through any of our channels below or fill out the form, and we'll
              be in touch within 24hours.
            </p>
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:gap-4">
            <div className="space-y-2">
              <h5 className="text-[13px] font-bold uppercase leading-[23px] text-black">
                SOCIAL MEDIA
              </h5>
              <p className="font-montreal text-[15px] text-body-2">
                Follow our social profiles:
              </p>
              <div className="flex gap-4">
                <Link
                  target="_blank"
                  className="rounded-full bg-[#75808A] p-4"
                  href="https://www.instagram.com/soo.wer?igsh=bXBldGV0dmNtNTc1"
                >
                  <InstagramIcon />
                </Link>
                <Link
                  target="_blank"
                  className="rounded-full bg-[#75808A] p-4"
                  href="https://www.facebook.com/profile.php?id=61559724273051&mibextid=ZbWKwL"
                >
                  <FacebookIcon />
                </Link>
                <Link
                  target="_blank"
                  className="rounded-full bg-[#75808A] p-4"
                  href="https://www.linkedin.com/company/soower-foundation/"
                >
                  <LinkedinIcon />
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-[13px] font-bold uppercase leading-[23px] text-black">
                PHONE
              </h5>
              <p className="font-montreal text-[15px] text-body-2">
                Dial our numbers:
              </p>
              <div className="flex flex-col gap-0">
                <Link
                  target="_blank"
                  className="font-montreal text-[15px] font-medium text-accent"
                  href="tel:(+234)9055553431"
                >
                  (+234) 905 555 3431
                </Link>
                <Link
                  target="_blank"
                  className="font-montreal text-[15px] font-medium text-accent"
                  href="tel:(+234)7076016055"
                >
                  (+234) 707 601 6055
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-[13px] font-bold uppercase leading-[23px] text-black">
                EMAIL
              </h5>
              <p className="font-montreal text-[15px] text-body-2">
                Leave us an email:
              </p>
              <div className="flex flex-col gap-0">
                <Link
                  target="_blank"
                  className="font-montreal text-[15px] font-medium text-accent"
                  href="mailto:info@soower.org"
                >
                  info@soower.org
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg bg-[#F7F8FA] p-4 sm:rounded-xl sm:p-8 md:rounded-[2rem] md:p-12 lg:p-20">
          <div className="mx-auto w-full max-w-3xl rounded-xl bg-white px-4 py-4 shadow-[0px_4px_20px_0px_#0000000F] sm:px-6 sm:py-6 md:px-8">
            <Form {...form}>
              <form
                className="space-y-4 sm:space-y-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormInput name="name" label="Name" />
                <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
                  <FormInput
                    name="email"
                    label="Email Address"
                    inputProps={{ type: "email" }}
                  />
                  <FormPhone
                    name={{
                      phone_code: "phone.phone_code",
                      phone_number: "phone.phone_number",
                    }}
                    label="Phone Number"
                    options={options}
                  />
                </div>
                <FormTextArea label="Message" name="message" />

                <div
                  className="cf-turnstile mt-4"
                  data-theme="light"
                  data-retry-interval={3000}
                  data-refresh-expired="manual"
                  data-callback="onTurnstileSuccess"
                  data-expired-callback="onTurnstileExpired"
                  data-error-callback="onTurnstileError"
                  data-sitekey={
                    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
                  }
                />

                <div className="justify-self-end pt-4 sm:pt-6">
                  <FormButton
                    loading={isLoading}
                    loadingText="Submitting..."
                    text="Submit"
                    disabled={!isDirty || !isValid || !turnstileToken}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ContactUs;
