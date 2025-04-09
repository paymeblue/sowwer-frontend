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
    <header className="fixed top-3 z-[1000] mx-auto w-full px-8 text-body-1">
      <nav className="flex items-center justify-between gap-6">
        <div>
          <Image
            src={logo}
            width={225}
            height={48}
            alt="Soower Logo"
            className="h-[48px] w-[225px] object-contain"
          />
        </div>
        {isAuth ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <div className="flex items-center justify-center gap-2">
                <UserIcon />
                <p className="font-montreal text-sm text-white">
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
          <p onClick={mockLogin}>
            <span className="font-montreal text-sm text-white">
              Already have an account?&nbsp;
            </span>
            <Link
              href="#"
              className="font-montreal text-sm font-medium text-primary underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </nav>
    </header>
  );
};

export default BasicNavbar;
