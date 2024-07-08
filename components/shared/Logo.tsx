"use client";
import { cn } from "@lib/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HTMLAttributes, MouseEvent } from "react";

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
  const pathname = usePathname();
  const adminRegex = /^\/admin\/(ministries|payouts|registry)$/;
  const isMatch = adminRegex.test(pathname);
  const router = useRouter();

  const refreshAdminHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.refresh();
  };
  return (
    <Link href="/">
      <div
        className={cn("relative h-[4rem] w-[8rem] lg:w-[11rem]", className)}
        onClick={isMatch ? refreshAdminHandler : undefined}
      >
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
