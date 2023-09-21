import WidowRegistrationForm from "@components/forms/join-registry/WidowRegistrationForm";
import { CardSelector } from "@components/ui/card-selector";
import { Dispatch, SetStateAction } from "react";

interface Props {
  selectedCategory: "Widow" | "Missinoary" | null;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const PersonalInformation = ({ selectedCategory, setActiveStep }: Props) => {
  return (
    <section className="w-full p-8 ">
      <CardSelector
        title={selectedCategory || ""}
        containerClassname="cursor-default"
        right={
          <span
            className="cursor-pointer font-body text-[.8rem] text-body-1"
            onClick={() => setActiveStep(0)}
          >
            Edit
          </span>
        }
      />

      <div className="mt-8 w-full">
        <WidowRegistrationForm />
      </div>
    </section>
  );
};

export default PersonalInformation;
