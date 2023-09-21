import { CardSelector } from "@components/ui/card-selector";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setSelectedCategory: Dispatch<SetStateAction<"Widow" | "Missinoary" | null>>;
}

const SelectCategory = ({ setActiveStep, setSelectedCategory }: Props) => {
  const handleClick = (category: "Widow" | "Missinoary") => {
    setSelectedCategory(category);
    setActiveStep(1);
  };
  return (
    <section className="p-8">
      <h3 className="text_variant_h3 text-center">
        What category do you fall under?
      </h3>

      <div className="mt-8 flex flex-col space-y-4">
        <CardSelector
          onClick={() => handleClick("Widow")}
          title="Widow"
          desc=" Lorem ipsum dolor sit amet consectetur."
        />
        <CardSelector
          title="Missionary"
          onClick={() => handleClick("Missinoary")}
          desc=" Lorem ipsum dolor sit amet consectetur."
        />
      </div>
    </section>
  );
};

export default SelectCategory;
