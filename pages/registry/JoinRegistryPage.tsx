"use client";
import SelectCategory from "@components/sections/join-registry/SelectCategory";
import SideLayoutWrapper from "@components/shared/Layouts/Side/SideLayoutWrapper";
import Stepper from "@components/ui/stepper";
import { useState } from "react";

function Payment() {
  return <h2>Payment information</h2>;
}

function Confirmation() {
  return <h2>Booking is confirmed</h2>;
}

const JoinRegistryPage = () => {
  const [activeStep] = useState(0);

  const steps = ["Select Category", "Personal Information"];

  // const nextStep = () => {
  //   if (activeStep < steps.length) {
  //     setActiveStep(activeStep + 1);
  //   }
  // };

  // const prevStep = () => {
  //   if (activeStep > 1) {
  //     setActiveStep(activeStep - 1);
  //   }
  // };

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <SelectCategory />;
      case 1:
        return <Payment />;
      case 2:
        return <Confirmation />;
      default:
        return null;
    }
  }
  return (
    <SideLayoutWrapper
      title="Are you a widow or a missionary? We’d love to know more about you!"
      desc="Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim."
    >
      <div className="w-full">
        <div className="w-full ">
          <Stepper steps={steps} activeStep={activeStep} />
        </div>
        {getSectionComponent()}
      </div>
    </SideLayoutWrapper>
  );
};

export default JoinRegistryPage;
