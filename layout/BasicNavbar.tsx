"use client";

import { UserIcon } from "@components/assets/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "public/images/logo-white.png";
import { ChevronDown, Logout } from "react-iconly";
const BasicNavbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isAuth = searchParams.get("isAuth") === "true";
  const mockLogout = () => {
    router.push("?");
  };
  const mockLogin = () => {
    router.push("?isAuth=true");
  };
  return (
    <header className="fixed top-3 z-[1000] mx-auto w-full px-4 text-body-1 sm:px-6 md:px-8">
      <nav className="flex items-center justify-between gap-2 sm:gap-6">
        <div>
          <Image
            src={logo}
            width={225}
            height={48}
            alt="Soower Logo"
            className="h-[36px] w-[170px] object-contain sm:h-[42px] sm:w-[200px] md:h-[48px] md:w-[225px]"
          />
        </div>
        {isAuth ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <UserIcon />
                <p className="hidden font-montreal text-xs text-white sm:block sm:text-sm">
                  Adebanjo Mary
                </p>
                <ChevronDown primaryColor="white" size={14} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="font- font-aeonik text-sm font-normal">
                <p className="font-aeonik text-sm font-medium">Adebanjo Mary</p>
                <small className="font-montreal text-xs text-slate-500">
                  campa.banj@gmail.com
                </small>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="items-center gap-2"
                onClick={mockLogout}
              >
                <Logout primaryColor="#D11E1E" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="text-right">
            <p
              onClick={mockLogin}
              className="flex flex-col sm:flex-row sm:items-center"
            >
              <span className="font-montreal text-xs text-white sm:text-sm">
                Already have an account?{" "}
              </span>
              <Link
                href="#"
                className="font-montreal text-xs font-medium text-primary underline sm:text-sm"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </nav>
    </header>
  );
};

export default BasicNavbar;
