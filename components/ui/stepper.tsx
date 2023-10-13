import { Check } from "lucide-react";
import React from "react";

interface Props {
  steps: string[];
  activeStep: number;
}

const Stepper = ({ steps, activeStep }: Props) => {
  function getStepClass(step: number) {
    let cls = `step ${step === 0 && "w-fit"}`;
    if (activeStep === step) {
      cls += " step-active";
    } else if (activeStep > step) {
      cls += " step-done";
    } else {
      cls += " step-inactive";
    }
    return cls;
  }

  return (
    <div className="steps-container">
      {steps.map((label, index) => (
        <div className={getStepClass(index)} key={index}>
          <div
            className={`z-20 flex w-fit flex-col items-center justify-between space-y-2 ${
              index !== 0 ? "ml-auto" : "mr-auto"
            }`}
          >
            <div className="z-20">
              <div className="circle flex items-center justify-center">
                {index < activeStep && <Check size={12} />}
              </div>
            </div>
            <div className="label w-[4rem] text-center !text-black lg:w-[8rem]">
              {label}
            </div>
          </div>
          {index !== 0 && <div className="line"></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
