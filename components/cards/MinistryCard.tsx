import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Location } from "react-iconly";

export interface IMinistryCard {
  name: string;
  location: string;
  logoUrl: string | null;
  id: string;
}

const MinistryCard = ({ name, location, logoUrl, id }: IMinistryCard) => {
  return (
    <div className="overflow-hidden rounded-[15px] bg-white px-6 py-8 shadow-featured-project-card">
      <div className="mb-10 flex flex-col items-center justify-between space-y-10">
        {!logoUrl ? (
          <div className="h-24 w-24 rounded-full bg-gray-300" />
        ) : (
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <Image
              src={logoUrl}
              alt="ministry logo"
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <h4 className="text_small_header text-center capitalize">{name}</h4>
          <div className="mt-2 flex items-center space-x-1">
            <Location size={19} />
            <p className="text_small_body_p">{location}</p>
          </div>
        </div>
      </div>
      <Link href={`/ministries/${id}`}>
        <Button className="w-full space-x-2">
          {/* <Heart2 set="bold" size={19} /> */}
          <span>Our story</span>
        </Button>
      </Link>
    </div>
  );
};

export default MinistryCard;
