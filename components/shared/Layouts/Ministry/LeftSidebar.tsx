"use client";

import Donors from "@components/assets/svg/Donors";
import Projects from "@components/assets/svg/Projects";
import Logo from "@components/shared/Logo";
import { Button } from "@components/ui/button";
import { Heart2 } from "react-iconly";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Setting, Wallet } from "react-iconly";

export const base = "/ministry";
export const sidebarItems = [
  {
    route: "",
    label: "Home",
    icon: <Home set="light" />,
  },
  {
    route: "/projects",
    label: "Projects",
    icon: <Projects />,
  },
  {
    route: "/donations",
    label: "Donations",
    icon: <Donors />,
  },
  {
    route: "/payouts",
    label: "Payouts",
    icon: <Wallet set="light" />,
  },
  {
    route: "/settings",
    label: "Settings",
    icon: <Setting set="light" />,
  },
];

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="leftsidebar">
      <div className="flex w-full items-center justify-center">
        <Logo logoVariant="white" />
      </div>
      <div className="mt-10 space-y-4">
        {sidebarItems.map((link) => {
          const isActive =
            (pathname?.includes(base + link.route) && link.route.length > 1) ||
            pathname === base + link.route;
          return (
            <div
              onClick={() => router.push(`${base}${link.route}`)}
              key={link.route}
              className={`flex w-full cursor-pointer items-center rounded-[5px] px-4 py-3 text-white transition-all duration-200 hover:bg-[#FFFFFF1A] ${
                isActive && "bg-[#FFFFFF1A]"
              }`}
            >
              <div className="w-[18%]">{link.icon}</div>
              <span className="text_tiny_body_r text-[0.78rem] text-white">
                {link.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-10 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full space-x-2">
              <Heart2 set="bold" size={19} />
              <span>Make a donation</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[13rem]">
            <Link href="/projects">
              <DropdownMenuItem className="">
                <span className="text-left font-body text-[.8rem] text-body-1">
                  Donate to a project
                </span>
              </DropdownMenuItem>
            </Link>
            <Link href="/ministries">
              <DropdownMenuItem>
                <span className="text-left font-body text-[.8rem] text-body-1">
                  Donate to a ministry
                </span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default LeftSidebar;
