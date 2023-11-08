import MissionaryRegistrationForm from "@components/forms/join-registry/MissionaryRegistrationForm";
import WidowRegistrationForm from "@components/forms/join-registry/WidowRegistrationForm";
import SuccessState from "@components/shared/SuccessState";
import { Button } from "@components/ui/button";
import { CardSelector } from "@components/ui/card-selector";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  selectedCategory: "Widow" | "Missionary" | null;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const PersonalInformation = ({ selectedCategory, setActiveStep }: Props) => {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <SuccessState
        title="Thanks for joining our registry!"
        className="mt-10"
        action={
          <Link href="/">
            <Button variant="secondary">Back to homepage</Button>
          </Link>
        }
      />
    );
  }
  return (
    <section className="w-full p-4 lg:p-8">
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
        {selectedCategory === "Widow" && (
          <WidowRegistrationForm
            onSuccess={() => {
              setSuccess(true);
            }}
          />
        )}
        {selectedCategory === "Missionary" && (
          <MissionaryRegistrationForm
            onSuccess={() => {
              setSuccess(true);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default PersonalInformation;
