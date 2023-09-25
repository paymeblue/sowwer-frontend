"use client";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@components/ui/navigation-menu";
import Navitem, { INavitem } from "./Navitem";
import { Button } from "@components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Logo from "../Logo";
import { useRouter } from "next/navigation";
import ProfileMenuCard from "@components/cards/ProfileMenuCard";

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
  // TODO: remove when backend integration comes in
  authenticated?: boolean;
}

const Navbar = ({ variant = "landing", authenticated }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
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
      className={`fixed left-0 top-0  z-30 flex h-[10vh] w-full flex-row items-center justify-between px-16 transition-all duration-200 ${
        isScrolling && "shadow-navbar"
      }`}
    >
      <div className="flex items-center gap-8">
        <Logo />

        {variant === "landing" && (
          <div className="flex items-center gap-16">
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
        className={`flex items-center gap-4 ${
          authenticated && "flex-row-reverse"
        }`}
      >
        {authenticated ? (
          <ProfileMenuCard />
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
    </motion.nav>
  );
};

export default Navbar;
