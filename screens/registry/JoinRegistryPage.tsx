"use client";
import PersonalInformation from "@components/sections/join-registry/PersonalInformation";
import SelectCategory from "@components/sections/join-registry/SelectCategory";
import SideLayoutWrapper from "@components/shared/Layouts/Side/SideLayoutWrapper";
import Stepper from "@components/ui/stepper";
import { useState } from "react";

const JoinRegistryPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<
    null | "Widow" | "Missionary"
  >(null);
  const steps = ["Select Category", "Personal Information"];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <SelectCategory
            setActiveStep={setActiveStep}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 1:
        return (
          <PersonalInformation
            setActiveStep={setActiveStep}
            selectedCategory={selectedCategory}
          />
        );
      default:
        return null;
    }
  }
  return (
    <SideLayoutWrapper
      title="Are you a widow or a missionary? We’d love to know more about you!"
      desc="Join the Soower Registry as a widow (or on behalf of a widow) or as a serving missionary (or aspiring missionary) and we would be in touch."
    >
      <div className="w-full overflow-hidden">
        <Stepper steps={steps} activeStep={activeStep} />
        {getSectionComponent()}
      </div>
    </SideLayoutWrapper>
  );
};

export default JoinRegistryPage;
