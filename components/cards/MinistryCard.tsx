import { Button } from "@components/ui/button";
import Image from "next/image";
import { Heart2, Location } from "react-iconly";

export interface IMinistryCard {
  name: string;
  location: string;
  logoUrl: string | null;
}

const MinistryCard = ({ name, location, logoUrl }: IMinistryCard) => {
  return (
    <div className="overflow-hidden rounded-[15px] bg-white p-6 shadow-featured-project-card">
      <div className="mb-10 flex flex-col items-center justify-between space-y-8">
        {!logoUrl ? (
          <div className="h-20 w-20 rounded-full bg-gray-300" />
        ) : (
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-300">
            <Image
              src={logoUrl}
              alt="ministry logo"
              fill
              className="object-cover"
            />
          </div>
        )}
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
    </div>
  );
};

export default MinistryCard;
