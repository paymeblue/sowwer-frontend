"use client";

import Donors from "@components/assets/svg/Donors";
import Projects from "@components/assets/svg/Projects";
import Logo from "@components/shared/Logo";
import { usePathname, useRouter } from "next/navigation";
import { Home, Setting, Wallet } from "react-iconly";

const sidebarItems = [
  {
    route: "/",
    label: "Home",
    icon: <Home set="light" />,
  },
  {
    route: "/projects",
    label: "Projects",
    icon: <Projects />,
  },
  {
    route: "/donors",
    label: "Donors",
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
            (pathname?.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <div
              onClick={() => router.push(`/ministry${link.route}`)}
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
    </aside>
  );
};

export default LeftSidebar;
