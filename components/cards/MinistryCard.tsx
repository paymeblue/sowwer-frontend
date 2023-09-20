import { Button } from "@components/ui/button";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, cardItemVariant } from "lib/variants";
import { Heart2, Location } from "react-iconly";

export interface IMinistryCard {
  name: string;
  location: string;
  logoUrl: string;
}

const MinistryCard = ({ name, location }: IMinistryCard) => {
  return (
    <motion.div
      variants={cardItemVariant}
      viewport={DEFAULT_VIEWPORT}
      className="overflow-hidden rounded-[15px] bg-white p-6 shadow-featured-project-card"
    >
      <div className="mb-10 flex flex-col items-center justify-between space-y-8">
        <div className="h-20 w-20 rounded-full bg-gray-300" />
        <div className="flex flex-col items-center justify-center">
          <h4 className="text_small_header">{name}</h4>
          <div className="mt-2 flex items-center space-x-1">
            <Location size={19} />
            <p className="text_small_body_p">{location}</p>
          </div>
        </div>
      </div>
      <Button className="w-full space-x-2">
        <Heart2 set="bold" size={19} />
        <span>Make a donation</span>
      </Button>
    </motion.div>
  );
};

export default MinistryCard;
