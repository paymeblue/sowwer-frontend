import { CardSelector } from "@components/ui/card-selector";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setSelectedCategory: Dispatch<
    SetStateAction<"Widow" | "Missionary" | "Orphanage" | null>
  >;
}

const SelectCategory = ({ setActiveStep, setSelectedCategory }: Props) => {
  const router = useRouter();
  const handleClick = (category: "Widow" | "Missionary" | "Orphanage") => {
    // setSelectedCategory(category);
    // setActiveStep(1);
    router.push(`/registry/join?category=${category}`);
  };
  return (
    <section className="mt-6 p-2 lg:mt-0 lg:p-8">
      <h3 className="text_variant_h3 text-center">
        What category do you fall under?
      </h3>

      <div className="mt-8 flex flex-col space-y-4">
        <CardSelector
          onClick={() => handleClick("Widow")}
          title="Widow"
          desc="Register as a widow or on behalf of a widow."
          left={
            <Image
              src="/assets/icons/widow.svg"
              alt="Widow"
              width={30}
              height={30}
            />
          }
        />
        <CardSelector
          title="Missionary"
          onClick={() => handleClick("Missionary")}
          desc="Register as a serving missionary or an aspiring missionary."
          left={
            <Image
              src="/assets/icons/missionary.svg"
              alt="Widow"
              width={18}
              height={19}
            />
          }
        />
        <CardSelector
          title="Orphanage Home"
          onClick={() => handleClick("Orphanage")}
          desc="Register as an orphanage home."
          left={
            <Image
              src="/assets/icons/orphanage.svg"
              alt="Widow"
              width={24}
              height={24}
            />
          }
        />
      </div>
    </section>
  );
};

export default SelectCategory;
