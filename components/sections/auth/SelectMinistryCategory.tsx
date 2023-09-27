import { CardSelector } from "@components/ui/card-selector";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const SelectMinistryCategory = ({}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<
    null | "church" | "christian organization"
  >(null);
  return (
    <section className="p-8">
      {!selectedCategory ? (
        <div>
          <h3 className="text_variant_h3 text-center">
            What type of ministry are you?
          </h3>

          <div className="mt-8 flex flex-col space-y-4">
            <CardSelector
              onClick={() => setSelectedCategory("church")}
              title="Church"
              desc="A church registered with the Christian Association of Nigeria (CAN)."
            />
            <CardSelector
              title="Christian Organization"
              onClick={() => setSelectedCategory("christian organization")}
              desc="A registered Christian institution or organization in Nigeria."
            />
          </div>
        </div>
      ) : (
        <div>
          <CardSelector
            title={selectedCategory || ""}
            containerClassname="cursor-default"
            right={
              <span
                className="cursor-pointer font-body text-[.8rem] text-body-1"
                onClick={() => setSelectedCategory(null)}
              >
                Edit
              </span>
            }
          />
        </div>
      )}
    </section>
  );
};

export default SelectMinistryCategory;
