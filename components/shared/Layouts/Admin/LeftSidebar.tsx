"use client";

import AdminCouncil from "@components/assets/svg/AdminCouncil";
import AdminMenuUser from "@components/assets/svg/AdminMenuUser";
import AdminPayouts from "@components/assets/svg/AdminPayouts";
import AdminProjects from "@components/assets/svg/AdminProjects";
import AdminRegistryIcon from "@components/assets/svg/AdminRegistry";
import Logo from "@components/shared/Logo";
import { Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const base = "/admin";

interface SidebarItem {
  route: string;
  label: string;
  icon: ReactNode;
  absolute?: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    route: "/ministries",
    label: "Ministries",
    icon: <AdminMenuUser />,
  },
  {
    route: "/projects",
    label: "Projects",
    icon: <AdminProjects />,
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
  {
    route: "/council",
    label: "Council",
    icon: <AdminCouncil />,
  },
  {
    // Lives outside the /admin tree (admin-only + a testing allowlist), so it
    // is routed as an absolute path rather than relative to `base`.
    route: "/bulk-email",
    label: "Upload",
    icon: <Mail size={18} />,
    absolute: true,
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
          const href = link.absolute ? link.route : `${base}${link.route}`;
          const isActive =
            (pathname?.includes(href) && link.route.length > 1) ||
            pathname === href;
          return (
            <div
              onClick={() => router.push(href)}
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
