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
    <section className="space-y-16 p-40">
      <div className=" w-full max-w-[739px]">
        <div className="mb-8">
          <p className="w-max rounded-full rounded-br-sm bg-[#FCF9F2] px-8 py-6 font-aeonik text-[45px] font-bold leading-[61px] tracking-[-0.12px] text-black">
            Contact Us.
          </p>
          <p className="mt-8 font-montreal text-lg leading-[26px] text-body-2">
            Want to make an inquiry or give us some feedback? You can reach us
            through any of our channels below or fill out the form, and we'll be
            in touch within 24hours.
          </p>
        </div>

        <div className=" flex w-full items-start justify-between">
          <div className="space-y-2">
            <h5 className="text-[13px] font-bold uppercase leading-[23px] text-black">
              SOCIAL MEDIA
            </h5>
            <p className="font-montreal text-[15px] text-body-2 ">
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
            <p className="font-montreal text-[15px] text-body-2 ">
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
            <p className="font-montreal text-[15px] text-body-2 ">
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
      <div className="w-full rounded-[2rem] bg-[#F7F8FA] p-20">
        <div className="mx-auto w-full max-w-3xl rounded-xl bg-white px-8 py-6 shadow-[0px_4px_20px_0px_#0000000F]">
          <Form {...form}>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <FormInput name="name" label="Name" />
              <div className="flex w-full items-center justify-center gap-4">
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
              <div className="justify-self-end pt-6">
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
