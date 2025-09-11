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
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import ForgotPassword from "@components/website/dialogs/forgot-password";
import SignIn from "@components/website/dialogs/sign-in";
import SignUp from "@components/website/dialogs/sign-up";
import Success from "@components/website/dialogs/success";
import useUserAuth from "@hooks/auth/useUserAuth";
import { cn } from "@lib/cn";
import { Menu } from "lucide-react";
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
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState<string | ReactNode>("");
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const query = useSearchParams();
  const login = query.get("login") === "true";
  const { isAuthenticated: isAuth, user, logout } = useUserAuth();

  useEffect(() => {
    if (login) {
      setOpenLoginModal(true);
    }
  }, [login]);

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
      <header className="fixed left-1/2 top-6 z-[20] mx-auto w-[95%] max-w-[1300px] -translate-x-1/2 rounded-full bg-white py-1 pl-4 pr-2 text-body-1 shadow-navbar md:w-4/5 md:pl-6">
        <nav className="flex items-center justify-between md:grid md:grid-cols-6 md:gap-4">
          <div className="flex-shrink-0 md:col-span-1">
            <Link href="/">
              <Image
                src={logo}
                width={225}
                height={48}
                alt="Soower Logo"
                className="h-[40px] w-auto object-contain md:h-[48px] md:w-[225px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden items-center justify-center gap-6 md:col-span-4 md:flex">
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
                href="/newsletters"
                className={cn(
                  "font-montreal text-sm font-normal leading-4 hover:text-primary",
                  segment === "newsletters" && "font-medium text-black"
                )}
              >
                Newsletters
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

          {/* Desktop Auth Buttons */}
          {isAuth ? (
            <div className="hidden md:col-span-1 md:block">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2">
                    <UserIcon />
                    <p className="font-montreal text-sm font-medium capitalize">
                      {user?.firstName} {user?.lastName}
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
                    onClick={() => router.push("/donor")}
                  >
                    <DashboardIcon />
                    <span>My dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="items-center gap-2"
                    onClick={() => router.push("/donor/settings")}
                  >
                    <Setting stroke="light" />
                    <span>Account settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="items-center gap-2 text-[#D11E1E]"
                    onClick={logout}
                  >
                    <Logout primaryColor="#D11E1E" stroke="light" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <ul className="hidden shrink-0 items-center justify-center gap-2 justify-self-end md:col-span-1 md:flex">
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

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-1">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] p-0 pt-8">
                <div className="flex h-full flex-col">
                  <div className="px-6">
                    <Link
                      href="/"
                      className="flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Image
                        src={logo}
                        width={180}
                        height={40}
                        alt="Soower Logo"
                        className="h-[40px] w-auto object-contain"
                      />
                    </Link>
                  </div>

                  <nav className="mt-8 flex flex-col px-6">
                    <ul className="space-y-4">
                      <li>
                        <Link
                          href="/about-us"
                          className={cn(
                            "block py-2 font-montreal text-base font-normal hover:text-primary",
                            segment === "about-us" && "font-medium text-black"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <button
                          className={cn(
                            "flex w-full items-center justify-between py-2 font-montreal text-base font-normal",
                            pathname.includes("programs") &&
                              "font-medium text-black"
                          )}
                          onClick={() =>
                            setMobileSubMenuOpen(!mobileSubMenuOpen)
                          }
                        >
                          Our Programs
                          {mobileSubMenuOpen ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </button>
                        {mobileSubMenuOpen && (
                          <ul className="ml-4 mt-2 space-y-2">
                            {subMenu.map((menu) => (
                              <li key={menu.href}>
                                <Link
                                  href={menu.href}
                                  className={cn(
                                    "block py-1 font-montreal text-base font-normal hover:text-primary",
                                    pathname === menu.href &&
                                      "font-medium text-black"
                                  )}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {menu.text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                      <li>
                        <Link
                          href="/registry/widow"
                          className={cn(
                            "block py-2 font-montreal text-base font-normal hover:text-primary",
                            segment === "registry" && "font-medium text-black"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Registry
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/newsletters"
                          className={cn(
                            "block py-2 font-montreal text-base font-normal hover:text-primary",
                            segment === "newsletters" &&
                              "font-medium text-black"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Newsletters
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact-us"
                          className={cn(
                            "block py-2 font-montreal text-base font-normal hover:text-primary",
                            segment === "contact-us" && "font-medium text-black"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </nav>

                  <div className="mt-auto border-t border-gray-200 px-6 py-6">
                    {isAuth ? (
                      <div className="space-y-4">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 py-2 font-montreal text-base font-medium"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            router.push("/donor");
                          }}
                        >
                          <DashboardIcon />
                          <span>My dashboard</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-2 py-2 font-montreal text-base font-medium"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            router.push("/donor/settings");
                          }}
                        >
                          <Setting stroke="light" />
                          <span>Account settings</span>
                        </Link>
                        <button
                          className="flex w-full items-center gap-2 py-2 font-montreal text-base font-medium text-[#D11E1E]"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            logout();
                          }}
                        >
                          <Logout primaryColor="#D11E1E" stroke="light" />
                          <span>Log out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Button
                          variant="outline"
                          size="md"
                          className="w-full font-montreal font-medium"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setOpenLoginModal(true);
                          }}
                        >
                          Log in
                        </Button>
                        <Button
                          size="md"
                          className="w-full font-montreal font-medium"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setOpenSignUpModal(true);
                          }}
                        >
                          Sign up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Navbar;
