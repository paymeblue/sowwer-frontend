"use client";
import PersonalInformation from "@components/sections/join-registry/PersonalInformation";
import SelectCategory from "@components/sections/join-registry/SelectCategory";
import SideLayoutWrapper from "@components/shared/Layouts/Side/SideLayoutWrapper";
import Stepper from "@components/ui/stepper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const categories = ["Widow", "Missionary", "Orphanage"];

const JoinRegistryPage = () => {
  const searchParams = useSearchParams();
  const defaultCatgory = searchParams.get("category") as
    | "Widow"
    | "Missionary"
    | "Orphanage"
    | null;
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<
    null | "Widow" | "Missionary" | "Orphanage"
  >(null);
  const steps = ["Select Category", "Personal Information"];

  useEffect(() => {
    if (defaultCatgory && categories.includes(defaultCatgory)) {
      setSelectedCategory(defaultCatgory);
      setActiveStep(1);
    }
  }, [defaultCatgory]);

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
      title="Are you a widow, missionary or orphanage home? We’d love to know more about you!"
      shouldGoBack
      desc="Join the Soower Registry as a widow (or on behalf of a widow), a serving missionary (or aspiring missionary) or an orphanage home and we would be in touch."
    >
      <div className="w-full overflow-hidden">
        <Stepper steps={steps} activeStep={activeStep} />
        {getSectionComponent()}
      </div>
    </SideLayoutWrapper>
  );
};

export default JoinRegistryPage;
