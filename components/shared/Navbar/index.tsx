"use client";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@components/ui/navigation-menu";
import useBgTransparentOnScroll from "@hooks/useBgTransparentOnScroll";
import Image from "next/image";
import Link from "next/link";
import Navitem, { INavitem } from "./Navitem";
import { Button } from "@components/ui/button";

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
        route: "/minitries",
      },
    ],
  },
  {
    label: "For ministries",
    route: "/ministries",
  },
  {
    label: "Contact us",
    route: "/contact",
  },
];

const Navbar = () => {
  const backgroundTransparent = useBgTransparentOnScroll();
  return (
    <nav
      className={`fixed left-0 top-0  z-30 flex h-[8vh] w-full flex-row items-center justify-between px-16 ${
        backgroundTransparent <= 0 ? "bg-transparent" : "bg-white shadow-md"
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
                return (
                  <Navitem
                    key={item.label}
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
    </nav>
  );
};

export default Navbar;
