"use client";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@components/assets/icons";
import SectionContainer from "@components/sections/SectionContainer";
import PageHero from "@components/shared/PageHero";
import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import FormTextArea from "@components/ui/formTextArea";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
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

const CHANNELS = [
  {
    icon: Phone,
    label: "Phone",
    items: [
      { text: "(+234) 905 555 3431", href: "tel:+2349055553431" },
      { text: "(+234) 707 601 6055", href: "tel:+2347076016055" },
    ],
  },
  {
    icon: Mail,
    label: "Email",
    items: [{ text: "info@soower.org", href: "mailto:info@soower.org" }],
  },
  {
    icon: MapPin,
    label: "Office",
    // Address as printed in SOOWER Newsletter Vol 2 Issue 3.
    items: [
      {
        text: "4th Floor, Kojo Motors Building, Shehu Yar'adua Way, Mabushi, Abuja, Nigeria",
        href: "",
      },
    ],
  },
];

const SOCIALS = [
  {
    label: "SOOWER on Instagram",
    href: "https://www.instagram.com/soo.wer?igsh=bXBldGV0dmNtNTc1",
    Icon: InstagramIcon,
  },
  {
    label: "SOOWER on Facebook",
    href: "https://www.facebook.com/profile.php?id=61559724273051&mibextid=ZbWKwL",
    Icon: FacebookIcon,
  },
  {
    label: "SOOWER on LinkedIn",
    href: "https://www.linkedin.com/company/soower-foundation/",
    Icon: LinkedinIcon,
  },
];

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
      <PageHero
        eyebrow="Contact us"
        title="Let's"
        accent="talk."
        lede="Want to make an inquiry, partner with us or give feedback? Reach us through any channel below or send a message, and we'll be in touch within 24 hours."
      />

      <section className="bg-white py-14 md:py-20">
        <SectionContainer>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
            {/* Channels */}
            <aside className="relative overflow-hidden rounded-[2rem] bg-secondary-black p-8 text-white md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 50% at 100% 0%, rgba(255,198,41,0.22) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                <h2 className="font-aeonik text-2xl font-medium tracking-[-0.02em] md:text-3xl">
                  Reach us directly
                </h2>

                <dl className="mt-10 space-y-8">
                  {CHANNELS.map(({ icon: Icon, label, items }) => (
                    <div key={label} className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10">
                        <Icon size={18} className="text-primary" />
                      </span>
                      <div>
                        <dt className="font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/[0.45]">
                          {label}
                        </dt>
                        {items.map((item) => (
                          <dd key={item.text} className="mt-1.5">
                            {item.href ? (
                              <a
                                href={item.href}
                                className="font-montreal text-[0.95rem] text-white transition-colors hover:text-primary"
                              >
                                {item.text}
                              </a>
                            ) : (
                              <span className="font-montreal text-[0.95rem] leading-relaxed text-white/[0.85]">
                                {item.text}
                              </span>
                            )}
                          </dd>
                        ))}
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-12 border-t border-white/10 pt-8">
                  <p className="font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/[0.45]">
                    Follow us
                  </p>
                  <div className="mt-4 flex gap-3">
                    {SOCIALS.map(({ href, label, Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10 transition-colors hover:bg-primary"
                      >
                        <Icon />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="rounded-[2rem] bg-[#FCF9F2] p-6 ring-1 ring-black/[0.05] sm:p-8 md:p-10">
              <h2 className="font-aeonik text-2xl font-medium tracking-[-0.02em] text-black md:text-3xl">
                Send a message
              </h2>
              <p className="mt-2 font-montreal text-sm text-body-2">
                All fields are required.
              </p>
              <div className="mt-8">
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

                    <div className="flex justify-end pt-4 sm:pt-6">
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
          </div>
        </SectionContainer>
      </section>
    </Fragment>
  );
};

export default ContactUs;
