"use client";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@components/ui/navigation-menu";
import Navitem, { INavitem } from "./Navitem";
import { Button } from "@components/ui/button";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useUserAuth from "@hooks/auth/useUserAuth";

import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Logo from "../Logo";
import { useRouter } from "next/navigation";
import ProfileMenuCard from "@components/cards/ProfileMenuCard";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { AlignJustify } from "lucide-react";

const navItems: INavitem[] = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "Explore",
    route: "",
    child: [
      {
        label: "Projects",
        route: "/projects",
      },
      {
        label: "Ministries",
        route: "/ministries",
      },
    ],
  },
  {
    label: "For ministries",
    route: "/for-ministries",
  },
  {
    label: "Contact us",
    route: "/contact-us",
  },
];

interface Props {
  variant?: "landing" | "donor";
}

const Navbar = ({ variant = "landing" }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useUserAuth();
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    setIsScrolling(window.scrollY > 50);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      variants={defaultVariant({})}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      animate={{
        background: isScrolling ? "white" : "transparent",
        backdropFilter: isScrolling ? "blur(5px)" : "blur(0px)",
        transition: {
          duration: 0.2,
          type: "tween",
        },
      }}
      className={`fixed left-0 top-0  z-30 flex h-[10vh] w-full flex-row items-center justify-between px-8 transition-all duration-200 lg:px-16 ${
        isScrolling && "shadow-navbar"
      }`}
    >
      <div className="flex items-center gap-8">
        <Logo />

        {variant === "landing" && (
          <div className="hidden items-center gap-16 lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => {
                  const { label, route, child } = item;
                  const isActive =
                    (pathname?.includes(item.route) && item.route.length > 1) ||
                    pathname === item.route;
                  return (
                    <Navitem
                      key={item.label}
                      isActive={isActive}
                      label={label}
                      route={route}
                      child={child}
                    />
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>

      <div
        className={`hidden items-center gap-4 lg:flex ${
          isAuthenticated && "flex-row-reverse"
        }`}
      >
        {isAuthenticated ? (
          <ProfileMenuCard variant={variant} />
        ) : (
          <Button
            variant="outline"
            className="px-9"
            onClick={() => router.push("/auth/donor/sign-in")}
          >
            Login
          </Button>
        )}
        {variant === "landing" && (
          <Button onClick={() => router.push("/registry/join")}>
            Join Soower's Registry
          </Button>
        )}
      </div>

      <div className="flex lg:hidden">
        <Sheet>
          <SheetTrigger className="text-black">
            <AlignJustify size={24} />
          </SheetTrigger>
          <SheetContent className="w-3/5">
            <div className="flex w-full flex-col items-start gap-10">
              <NavigationMenu>
                <NavigationMenuList className="flex-col items-start justify-start space-x-0 space-y-2">
                  {navItems.map((item) => {
                    const { label, route, child } = item;
                    const isActive =
                      (pathname?.includes(item.route) &&
                        item.route.length > 1) ||
                      pathname === item.route;
                    return (
                      <Navitem
                        key={item.label}
                        isActive={isActive}
                        label={label}
                        route={route}
                        child={child}
                      />
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>

              <div
                className={`flex flex-col items-center gap-4 ${
                  isAuthenticated && "flex-row-reverse"
                }`}
              >
                {isAuthenticated ? (
                  <ProfileMenuCard variant={variant} />
                ) : (
                  <Button
                    variant="outline"
                    className="w-full px-9"
                    onClick={() => router.push("/auth/donor/sign-in")}
                  >
                    Login
                  </Button>
                )}
                {variant === "landing" && (
                  <Button
                    className="w-full"
                    onClick={() => router.push("/registry/join")}
                  >
                    <span className="whitespace-nowrap">
                      Join Soower's Registry
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
};

export default Navbar;
