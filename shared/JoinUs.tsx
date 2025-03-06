"use client";

import { Button } from "@components/ui/button";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { Heart2 } from "react-iconly";

type Props = {
  img: StaticImageData;
  alt: string;
};
const JoinUs = ({ img, alt }: Props) => {
  const pathname = usePathname();
  return (
    <div className="relative">
      <Image
        src={img}
        alt={alt}
        placeholder="blur"
        width={1512}
        height={pathname === "/website" ? 674 : 540}
        className="w-full  object-contain"
      />
      <div className="absolute right-40 top-40 flex w-full max-w-[500px] flex-col gap-6 rounded-2xl bg-white p-8 shadow-double">
        <h5 className="text-xs font-medium leading-6 text-primary">
          GET INVOLVED
        </h5>
        <p className="text-[40px] font-medium leading-[42px] text-black">
          Join Us to Be the Light in Someone&apos;s Story
        </p>
        <Button className="w-max gap-2 border-input font-montreal text-black">
          <span>
            <Heart2 set="bold" size={19} />
          </span>
          <span>Donate now</span>
        </Button>
      </div>
    </div>
  );
};

export default memo(JoinUs);
