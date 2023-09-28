"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import MinistryDetails from "@components/sections/auth/MinistryDetails";
import SideLayoutWrapper from "@components/shared/Layouts/Side/SideLayoutWrapper";
import Stepper from "@components/ui/stepper";
import {
  MinistrySignupMinistryDetailsValidation,
  MinistrySignupPersonalInformationValidation,
} from "lib/validations/auth";
import MinistryPersonalInformation from "@components/sections/auth/MinistryPersonalInformation";
import MinistryTermsAndConditions from "@components/sections/auth/MinstryTermsAndConditions";

const MinistrySignupPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<
    null | "church" | "christian organization"
  >(null);
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

  const submitForm = () => {
    // TODO: Implememt form submission
    console.log("Submitting");
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
        {getSectionComponent()}
      </div>
    </SideLayoutWrapper>
  );
};

export default MinistrySignupPage;
