"use client";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import Navitem, { INavitem } from "./Navitem";
import { Button } from "@components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        route: "/explore/projects",
      },
      {
        label: "Ministries",
        route: "/explore/ministries",
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

const Navbar = () => {
  const pathname = usePathname();
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
      animate={{
        background: isScrolling ? "white" : "transparent",
        backdropFilter: isScrolling ? "blur(5px)" : "blur(0px)",
        transition: {
          duration: 0.2,
          type: "tween",
        },
      }}
      className={`fixed left-0 top-0  z-30 flex h-[8vh] w-full flex-row items-center justify-between px-16 transition-all duration-200 ${
        isScrolling && "shadow-md"
      }`}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="">
          <div className="relative h-[4rem] w-[8rem]">
            <Image
              src="/assets/icons/logo.svg"
              alt="soower logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

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
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline">Login</Button>
        <Button>Join Sower's Registry</Button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
