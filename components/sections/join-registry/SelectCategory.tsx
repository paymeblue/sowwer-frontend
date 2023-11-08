import { CardSelector } from "@components/ui/card-selector";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setSelectedCategory: Dispatch<SetStateAction<"Widow" | "Missionary" | null>>;
}

const SelectCategory = ({ setActiveStep, setSelectedCategory }: Props) => {
  const handleClick = (category: "Widow" | "Missionary") => {
    setSelectedCategory(category);
    setActiveStep(1);
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
        />
        <CardSelector
          title="Missionary"
          onClick={() => handleClick("Missionary")}
          desc="Register as a serving missionary or an aspiring missionary."
        />
      </div>
    </section>
  );
};

export default SelectCategory;
