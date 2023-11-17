"use client";
import ProfileMenuCard from "@components/cards/ProfileMenuCard";
import Logo from "@components/shared/Logo";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import { base, sidebarItems } from "./LeftSidebar";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { Heart2 } from "react-iconly";
import Link from "next/link";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="topbar">
      <Logo className="lg:hidden" />
      <div className="ml-auto">
        <div className="max-lg:hidden">
          <ProfileMenuCard variant="ministry" />
        </div>
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="text-black">
              <AlignJustify size={24} />
            </SheetTrigger>
            <SheetContent className="w-[65%] bg-secondary-black" theme="dark">
              <div className="mt-10 flex w-full flex-col items-start gap-10">
                <div className="flex w-full items-center justify-center">
                  <ProfileMenuCard
                    variant="ministry"
                    onMenuClick={() => setOpen(false)}
                  />
                </div>
                {sidebarItems.map((link) => {
                  const isActive =
                    (pathname?.includes(base + link.route) &&
                      link.route.length > 1) ||
                    pathname === base + link.route;
                  return (
                    <div
                      onClick={() => {
                        router.push(`${base}${link.route}`);
                        setOpen(false);
                      }}
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
