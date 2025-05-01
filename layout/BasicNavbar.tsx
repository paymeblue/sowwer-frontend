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
import SignIn from "@components/website/dialogs/sign-in";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "public/images/logo-white.png";
import { ChevronDown, Logout } from "react-iconly";
import { Fragment, useState } from "react";
import useUserAuth from "@hooks/auth/useUserAuth";

const BasicNavbar = () => {
  const router = useRouter();
  const { isAuthenticated: isAuth, user } = useUserAuth();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const mockLogout = () => {
    router.push("?");
  };

  return (
    <Fragment>
      {openLoginModal && (
        <SignIn
          open={openLoginModal}
          setOpen={setOpenLoginModal}
          redirect={false}
          setOpenSignUp={() => {}}
          setForgotPasswordModal={() => {}}
        />
      )}
      <header className="absolute top-3 z-[1000] mx-auto w-full px-4 text-body-1 sm:px-6 md:px-8">
        <nav className="flex items-center justify-between gap-2 sm:gap-6">
          <div>
            <Link href="/">
              <Image
                src={logo}
                width={225}
                height={48}
                alt="Soower Logo"
                className="h-[36px] w-[170px] object-contain sm:h-[42px] sm:w-[200px] md:h-[48px] md:w-[225px]"
              />
            </Link>
          </div>
          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <UserIcon />
                  <p className="hidden font-montreal text-xs capitalize text-white sm:block sm:text-sm">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <ChevronDown primaryColor="white" size={14} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="font- font-aeonik text-sm font-normal">
                  <p className="font-aeonik text-sm font-medium capitalize">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <small className="font-montreal text-xs text-slate-500">
                    {user?.email}
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
              <p className="flex flex-col items-end md:flex-row md:items-center md:space-x-1">
                <span className="font-montreal text-xs text-white md:text-sm">
                  Already have an account?{" "}
                </span>
                <button
                  onClick={() => setOpenLoginModal(true)}
                  className="font-montreal text-xs font-medium text-primary underline md:text-sm"
                >
                  {" "}
                  Sign in
                </button>
              </p>
            </div>
          )}
        </nav>
      </header>
    </Fragment>
  );
};

export default BasicNavbar;
