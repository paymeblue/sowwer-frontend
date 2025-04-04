"use client";

import { BuildingIcon, CrossIcon, FemaleIcon } from "@components/assets/icons";
import FamilyHome from "@components/assets/icons/family-home";
import { cn } from "@lib/cn";
import { useParams, useRouter } from "next/navigation";
import { PropsWithChildren, ReactNode, useState } from "react";

type DonationType = "widow" | "orphanage" | "mission" | "ministry";
type Donation = {
  id: number;
  icon: ReactNode;
  value: DonationType;
  title: string;
  desc: string;
};
export const donationItems: Donation[] = [
  {
    id: 1,
    icon: <FemaleIcon />,
    value: "widow",
    title: "Widow",
    desc: "Supporting widows with financial aid, training, and empowerment",
  },
  {
    id: 2,
    icon: <FamilyHome />,
    value: "orphanage",
    title: "An Orphanage",
    desc: "Supporting orphans through educational sponsorships",
  },
  {
    id: 3,
    icon: <CrossIcon />,
    value: "mission",
    title: "Mission",
    desc: "Helping missionaries spread the gospel and serve communities",
  },
  {
    id: 4,
    icon: <BuildingIcon />,
    value: "ministry",
    title: "A Ministry",
    desc: "For donors who want to support SOOWER's overall mission.",
  },
];

const RegistryTabLayout = ({ children }: PropsWithChildren) => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(id as string);
  return (
    <div
      className="mx-auto my-20 grid w-full
max-w-[1058px] grid-cols-4 rounded-xl border-[0.3px] border-[#DADADA] bg-white
shadow-[0px_4px_20px_0px_#0000000F]"
    >
      <div className="col-span-1 rounded-l-xl bg-[#F7F8FA] py-2 pl-6 pr-0">
        <p className="my-6 text-[13px] font-bold leading-[23px] text-black ">
          JOIN AS:
        </p>
        <ul>
          {donationItems.map((tab, i) => (
            <li
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.value);
                router.push(tab.value);
              }}
              className={cn(
                "flex cursor-pointer items-center justify-between border-[0.5px] border-x-0 border-[#DADADA] p-4 pr-0",
                i === donationItems.length - 1 && "border-b-0"
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-[#75808A]",
                    activeTab === tab.value && "text-primary"
                  )}
                >
                  {tab.icon}
                </span>
                <span
                  className={cn(
                    "font-montreal text-[15px] text-[#75808A]",
                    activeTab === tab.value && "font-medium text-black"
                  )}
                >
                  {tab.title}
                </span>
              </div>
              {activeTab === tab.value ? (
                <div className="h-[10px] w-[6px] rounded-l-full bg-primary" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3 rounded-r-xl p-8 shadow-tab-layout-content">
        {children}
      </div>
    </div>
  );
};

export default RegistryTabLayout;
