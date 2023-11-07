import { cn } from "@lib/cn";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  name: string;
  position: string;
  imgUrl?: string;
}

const PartnerCard = ({ className, name, position, imgUrl }: Props) => {
  return (
    <div
      className={cn("flex w-full flex-col items-center space-y-6", className)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[7px]">
        <Image
          src={imgUrl || "/assets/images/partner.png"}
          alt="Partner"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center">
        <h4 className="text_medium_header">{name}</h4>
        <span className="text_small_body_p text-center uppercase">
          {position}
        </span>
      </div>
    </div>
  );
};

export default PartnerCard;
