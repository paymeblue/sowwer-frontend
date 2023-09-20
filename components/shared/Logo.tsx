import { cn } from "@lib/cn";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  logoVariant?: "white" | "black";
}

const Logo = ({ className, logoVariant = "white" }: Props) => {
  return (
    <Link href="/">
      <div className={cn("relative h-[4rem] w-[8rem]", className)}>
        <Image
          src={
            logoVariant === "white"
              ? "/assets/icons/logo.svg"
              : "/assets/icons/logo-black.svg"
          }
          alt="soower logo"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
