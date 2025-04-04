"use client";

import { Button } from "@components/ui/button";
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
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import logo from "public/images/logo.png";
import { Fragment, ReactNode, useState } from "react";

const subMenu = [
  {
    text: "WidowCare",
    href: "/website/programs/widow-care",
  },
  {
    text: "The DAD Project",
    href: "/website/programs/dad-project",
  },
  {
    text: "MissionCare",
    href: "/website/programs/mission-care",
  },
  {
    text: "Partnerships",
    href: "/website/programs/partnerships",
  },
];
const Navbar = () => {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState<string | ReactNode>("");
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
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
            <Link href="/website">
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
                href="/website/about-us"
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
                href="/website/registry/widow"
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
                href="/website/contact-us"
                className={cn(
                  "font-montreal text-sm font-normal leading-4 hover:text-primary",
                  segment === "contact-us" && "font-medium text-black"
                )}
              >
                Contact Us
              </Link>
            </li>
          </ul>
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
        </nav>
      </header>
    </Fragment>
  );
};

export default Navbar;
