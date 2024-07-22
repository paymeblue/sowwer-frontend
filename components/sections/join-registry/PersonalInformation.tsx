import MissionaryRegistrationForm from "@components/forms/join-registry/MissionaryRegistrationForm";
import OrphanageRegistrationForm from "@components/forms/join-registry/OrphanageRegistrationForm";
import WidowRegistrationForm from "@components/forms/join-registry/WidowRegistrationForm";
import SuccessState from "@components/shared/SuccessState";
import { Button } from "@components/ui/button";
import { CardSelector } from "@components/ui/card-selector";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  selectedCategory: "Widow" | "Missionary" | "Orphanage" | null;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const PersonalInformation = ({ selectedCategory, setActiveStep }: Props) => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const getIcon = () => {
    const type = selectedCategory;

    switch (type) {
      case "Missionary":
        return (
          <Image
            src="/assets/icons/missionary.svg"
            alt="Widow"
            width={18}
            height={19}
          />
        );
      case "Orphanage":
        return (
          <Image
            src="/assets/icons/orphanage.svg"
            alt="Widow"
            width={24}
            height={24}
          />
        );
      case "Widow":
        return (
          <Image
            src="/assets/icons/widow.svg"
            alt="Widow"
            width={30}
            height={30}
          />
        );
      default:
        return (
          <Image
            src="/assets/icons/widow.svg"
            alt="Widow"
            width={30}
            height={30}
          />
        );
    }
  };

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
        left={getIcon()}
        right={
          <span
            className="cursor-pointer font-body text-[.8rem] text-body-1"
            onClick={() => {
              setActiveStep(0);
              router.push("/registry/join");
            }}
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

        {selectedCategory === "Orphanage" && (
          <OrphanageRegistrationForm
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
