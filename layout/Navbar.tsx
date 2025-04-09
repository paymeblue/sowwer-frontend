"use client";

import { DashboardIcon, UserIcon } from "@components/assets/icons";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/ui/navigation-menu";
import ForgotPassword from "@components/website/dialogs/forgot-password";
import SignIn from "@components/website/dialogs/sign-in";
import SignUp from "@components/website/dialogs/sign-up";
import Success from "@components/website/dialogs/success";
import { cn } from "@lib/cn";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import logo from "public/images/logo.png";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Logout, Setting } from "react-iconly";

const subMenu = [
  {
    text: "WidowCare",
    href: "/programs/widow-care",
  },
  {
    text: "The DAD Project",
    href: "/programs/dad-project",
  },
  {
    text: "MissionCare",
    href: "/programs/mission-care",
  },
  {
    text: "Partnerships",
    href: "/programs/partnerships",
  },
];
const Navbar = () => {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState<string | ReactNode>("");
  const [open, setOpen] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const router = useRouter();
  const query = useSearchParams();
  const login = query.get("login") === "true";
  const isAuth = query.get("isAuth") === "true";
  useEffect(() => {
    if (login) {
      setOpenLoginModal(true);
    }
  }, [login]);
  const mockLogout = () => {
    router.push("?");
  };

  return (
    <Fragment>
      {openSignUpModal ? (
        <SignUp
          open={openSignUpModal}
          setOpen={setOpenSignUpModal}
          setOpenLogin={setOpenLoginModal}
          setSuccessModal={setSuccessModal}
          setTitle={setTitle}
          setDesc={setDesc}
        />
      ) : openLoginModal ? (
        <SignIn
          open={openLoginModal}
          setOpen={setOpenLoginModal}
          setOpenSignUp={setOpenSignUpModal}
          setForgotPasswordModal={setForgotPasswordModal}
        />
      ) : successModal ? (
        <Success
          open={successModal}
          title={title}
          desc={desc}
          setOpen={setSuccessModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      ) : forgotPasswordModal ? (
        <ForgotPassword
          open={forgotPasswordModal}
          setTitle={setTitle}
          setDesc={setDesc}
          setOpen={setForgotPasswordModal}
          setSuccessModal={setSuccessModal}
        />
      ) : null}
      <header className="fixed left-1/2 top-6 z-[1000] mx-auto w-4/5 max-w-[1300px] -translate-x-1/2 rounded-full bg-white py-1 pl-6 pr-2 text-body-1 shadow-navbar">
        <nav className="grid grid-cols-6 items-center gap-4">
          <div className="col-span-1 shrink-0">
            <Link href="/">
              <Image
                src={logo}
                width={225}
                height={48}
                alt="Soower Logo"
                className="h-[48px] w-[225px] object-contain"
              />
            </Link>
          </div>
          <ul className="col-span-4 flex items-center justify-center gap-6">
            <li>
              <Link
                href="/about-us"
                className={cn(
                  "font-montreal text-sm font-normal leading-4 hover:text-primary",
                  segment === "about-us" && "font-medium text-black"
                )}
              >
                About Us
              </Link>
            </li>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger
                    className={cn(
                      "font-montreal text-sm font-normal leading-4",
                      pathname.includes("programs") && "font-medium text-black"
                    )}
                  >
                    Our Programs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
                    <ul className="w-[150px] space-y-3 p-4">
                      {subMenu.map((menu) => (
                        <li key={menu.href}>
                          <NavigationMenuLink
                            asChild
                            className={cn(
                              "font-montreal text-sm font-normal leading-4 hover:text-primary",
                              pathname === menu.href && "font-medium text-black"
                            )}
                          >
                            <Link href={menu.href}>{menu.text}</Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <li>
              <Link
                href="/registry/widow"
                className={cn(
                  "font-montreal text-sm font-normal leading-4 hover:text-primary",
                  segment === "registry" && "font-medium text-black"
                )}
              >
                Registry
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={cn(
                  "font-montreal text-sm font-normal leading-4 hover:text-primary",
                  segment === "contact-us" && "font-medium text-black"
                )}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          {isAuth ? (
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <div className="flex items-center justify-center gap-2">
                  <UserIcon />
                  <p className="font-montreal text-sm font-medium">
                    Adebanjo Mary
                  </p>
                  {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="z-[1000] w-56 rounded-xl border-none shadow-[0px_4px_20px_0px_#00000036]
"
              >
                <DropdownMenuItem
                  className="items-center gap-2"
                  onClick={mockLogout}
                >
                  <DashboardIcon />
                  <span>My dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="items-center gap-2"
                  onClick={mockLogout}
                >
                  <Setting stroke="light" />
                  <span>Account settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="items-center gap-2 text-[#D11E1E]"
                  onClick={mockLogout}
                >
                  <Logout primaryColor="#D11E1E" stroke="light" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <ul className="col-span-1 flex shrink-0 items-center justify-center gap-2 justify-self-end">
              <Button
                variant="outline"
                size="md"
                className="font-montreal font-medium"
                onClick={() => setOpenLoginModal(true)}
              >
                Log in
              </Button>
              <Button
                size="md"
                className="font-montreal font-medium"
                onClick={() => setOpenSignUpModal(true)}
              >
                Sign up
              </Button>
            </ul>
          )}
        </nav>
      </header>
    </Fragment>
  );
};

export default Navbar;
