"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useDispatch } from "react-redux";
import { setCredentials } from "redux/auth/reducer";
import { useMinistrySignupMutation } from "services/auth";

import MinistryDetails from "@components/sections/auth/MinistryDetails";
import SideLayoutWrapper from "@components/shared/Layouts/Side/SideLayoutWrapper";
import Stepper from "@components/ui/stepper";
import {
  MinistrySignupMinistryDetailsValidation,
  MinistrySignupPersonalInformationValidation,
} from "lib/validations/auth";
import MinistryPersonalInformation from "@components/sections/auth/MinistryPersonalInformation";
import MinistryTermsAndConditions from "@components/sections/auth/MinstryTermsAndConditions";
import { useToast } from "@components/ui/use-toast";
import SuccessState from "@components/shared/SuccessState";
import { Button } from "@components/ui/button";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { MinistrySignupRequest } from "services/typings";
import { convertBase64toFile } from "@lib/functions";
import Link from "next/link";

const MinistrySignupPageComp = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<
    null | "church" | "christian organization"
  >(null);
  const [ministrySignup, { isLoading }] = useMinistrySignupMutation();
  const ministryDetailsForm = useForm<
    z.infer<typeof MinistrySignupMinistryDetailsValidation>
  >({
    resolver: zodResolver(MinistrySignupMinistryDetailsValidation),
  });
  const personInformationForm = useForm<
    z.infer<typeof MinistrySignupPersonalInformationValidation>
  >({
    resolver: zodResolver(MinistrySignupPersonalInformationValidation),
  });
  const steps = [
    "Ministry Details",
    "Personal Information",
    "Terms and Conditions",
  ];

  const submitForm = async () => {
    const {
      address,
      cacDocument,
      description,
      email,
      name,
      phoneNumber,
      state,
      websiteLink,
    } = ministryDetailsForm.getValues();
    const {
      email: adminEmail,
      firstName,
      lastName,
      password,
      phoneNumber: adminPhoneNumber,
      role,
    } = personInformationForm.getValues();

    if (!selectedCategory) {
      toast({
        variant: "destructive",
        title: "Please select a ministry type",
      });
      return;
    }

    try {
      const credentials: MinistrySignupRequest = {
        cacDocument: convertBase64toFile(
          cacDocument,
          "CAC_document",
          "image/png"
        ),
        ministryEmail: email,
        email: adminEmail,
        firstName,
        lastName,
        ministryAddress: address,
        ministryName: name,
        ministryPhone: phoneNumber,
        ministrySocialLink: websiteLink || "",
        ministryState: state,
        ministryType:
          selectedCategory === "christian organization"
            ? "organisation"
            : selectedCategory,
        password,
        phone: adminPhoneNumber,
        projectDescription: description,
        role,
      };
      const res = await ministrySignup(credentials).unwrap();
      dispatch(
        setCredentials({
          user: res.data.user,
          token: res.data.token.accessToken,
          refreshToken: res.data.token.refreshToken,
          context: "ministry",
        })
      );
      setRegistrationSuccessful(true);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error occured creating a ministry",
        description:
          err?.message ||
          "We were unable to create this ministry. Please try again later or contact support",
      });
    }
  };

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <MinistryDetails
            setActiveStep={setActiveStep}
            form={ministryDetailsForm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 1:
        return (
          <MinistryPersonalInformation
            setActiveStep={setActiveStep}
            form={personInformationForm}
          />
        );
      case 2:
        return (
          <MinistryTermsAndConditions
            setActiveStep={setActiveStep}
            submitForm={submitForm}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  }

  return (
    <SideLayoutWrapper
      title="Are you a ministry with widow, orphan or mission programs? Register with us today!"
      desc="Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. "
    >
      <div className="w-full overflow-hidden">
        <Stepper steps={steps} activeStep={activeStep} />
        {registrationSuccessful ? (
          <div className="mt-10">
            <SuccessState
              title="We’ve received your application!"
              desc="Thank you for registering your ministry on Soower. Your application has been received and you’ll be able to start creating projects and receiving donations once your details are verified. This should typically take 24-48 hours. In the meantime you can proceed to your dashboard to set up your remaining account details."
              action={
                <Link href="/ministry">
                  <Button variant="secondary">Go to Dashboard</Button>
                </Link>
              }
            />
          </div>
        ) : (
          <>{getSectionComponent()}</>
        )}
      </div>
    </SideLayoutWrapper>
  );
};

const MinistrySignupPage = () => {
  return (
    <NoSSRWrapper>
      <MinistrySignupPageComp />
    </NoSSRWrapper>
  );
};

export default MinistrySignupPage;
