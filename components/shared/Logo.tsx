import { cn } from "@lib/cn";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  logoVariant?: "white" | "black" | "normal";
}

const Logo = ({ className, logoVariant = "normal" }: Props) => {
  const getLogoSrc = () => {
    let src = "";
    switch (logoVariant) {
      case "white":
        src = "/assets/icons/logo-white.svg";
        break;
      case "black":
        src = "/assets/icons/logo-black.svg";
        break;
      default:
        src = "/assets/icons/logo.svg";
    }

    return src;
  };
  return (
    <Link href="/">
      <div className={cn("relative h-[4rem] w-[8rem] lg:w-[11rem]", className)}>
        <Image
          src={getLogoSrc()}
          alt="soower logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
