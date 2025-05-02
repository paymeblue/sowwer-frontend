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
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.object({
    phone_code: z.string().min(1, "Phone code is required"),
    phone_number: z.string().min(1, "Phone number is required"),
  }),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type FormType = z.infer<typeof schema>;

const ContactUs = () => {
  const { toast } = useToast();

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
    formState: { isDirty, isValid, isSubmitting },
  } = form;
  const onSubmit = async (values: FormType) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      toast({
        title: "Thank you for reaching out!",
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
        title: "Thank you for reaching out!",
        description: "Your message has been sent successfully.",
      });
    }
  };
  return (
    <section className="space-y-8 p-6 max-lg:mt-20 sm:space-y-12 sm:p-10 md:space-y-16 md:p-20 lg:p-40">
      <div className="mx-auto w-full max-w-[739px] md:mx-0">
        <div className="mb-4 sm:mb-8">
          <p className="w-max rounded-full rounded-br-sm bg-[#FCF9F2] px-4 py-3 font-aeonik text-2xl font-bold leading-tight tracking-[-0.12px] text-black sm:px-6 sm:py-4 sm:text-3xl md:px-8 md:py-6 md:text-4xl md:leading-[61px] lg:text-[45px]">
            Contact Us.
          </p>
          <p className="mt-4 font-montreal text-base leading-normal text-body-2 sm:mt-8 sm:text-lg sm:leading-[26px]">
            Want to make an inquiry or give us some feedback? You can reach us
            through any of our channels below or fill out the form, and we'll be
            in touch within 24hours.
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
                href="https://www.linkedin.com/company/soower"
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
              <div className="justify-self-end pt-4 sm:pt-6">
                <FormButton
                  loading={isSubmitting}
                  loadingText="Submitting..."
                  text="Submit"
                  disabled={!isDirty || !isValid}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
