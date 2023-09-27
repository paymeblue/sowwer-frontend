"use client";
import SelectMinistryCategory from "@components/sections/auth/SelectMinistryCategory";
import SideLayoutWrapper from "@components/shared/Layouts/Side/SideLayoutWrapper";
import Stepper from "@components/ui/stepper";
import { useState } from "react";

const MinistrySignupPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Ministry Details",
    "Personal Information",
    "Terms and Conditions",
  ];
  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <SelectMinistryCategory setActiveStep={setActiveStep} />;
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
