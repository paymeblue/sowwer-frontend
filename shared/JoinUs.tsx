"use client";

import { Button } from "@components/ui/button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
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
    <div className="relative flex flex-col md:block">
      <Image
        src={img}
        alt={alt}
        placeholder="blur"
        width={1512}
        height={pathname === "/website" ? 674 : 540}
        className="w-full object-contain"
      />
      <div className="mx-auto flex w-full max-w-[500px] flex-col gap-4 bg-white p-6 shadow-double sm:gap-6 sm:p-8 md:absolute md:right-10 md:mx-0 lg:right-40 lg:top-40 lg:rounded-2xl">
        <h5 className="text-xs font-medium leading-6 text-primary">
          GET INVOLVED
        </h5>
        <p className="text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[42px]">
          Join Us to Be the Light in Someone&apos;s Story
        </p>
        <Link href="/donate/widow-care">
          <Button className="mt-4 w-max gap-2 border-input font-montreal text-black">
            <span>
              <Heart2 set="bold" size={19} />
            </span>
            <span>Donate now</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default memo(JoinUs);
