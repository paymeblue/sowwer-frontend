"use client";

import AdminMenuUser from "@components/assets/svg/AdminMenuUser";
import AdminPayouts from "@components/assets/svg/AdminPayouts";
import AdminRegistryIcon from "@components/assets/svg/AdminRegistry";
import Logo from "@components/shared/Logo";
import { usePathname, useRouter } from "next/navigation";

const base = "/admin";
const sidebarItems = [
  {
    route: "/ministries",
    label: "Ministries",
    icon: <AdminMenuUser />,
  },
  {
    route: "/payouts",
    label: "Payouts",
    icon: <AdminPayouts />,
  },
  {
    route: "/registry",
    label: "Registry",
    icon: <AdminRegistryIcon />,
  },
];

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="leftsidebar-admin">
      <div className="flex w-full items-center justify-center">
        <Logo logoVariant="normal" />
      </div>
      <div className="mt-10 space-y-4">
        {sidebarItems.map((link) => {
          const isActive =
            (pathname?.includes(base + link.route) && link.route.length > 1) ||
            pathname === base + link.route;
          return (
            <div
              onClick={() => router.push(`${base}${link.route}`)}
              key={link.label}
              className={`flex w-full cursor-pointer items-center rounded-[5px] px-4 py-3 text-white transition-all duration-200 hover:bg-[#FFFFFF1A] ${
                isActive && "bg-[#EBEFFF]"
              }`}
            >
              <div
                className={`w-[18%] ${
                  isActive ? "text-accent" : "text-body-2"
                }`}
              >
                {link.icon}
              </div>
              <span
                className={`text_tiny_body_r text-[0.78rem] ${
                  isActive ? "font-[500] text-accent" : "text-body-2"
                }`}
              >
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
