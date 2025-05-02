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
      className="mx-auto my-8 flex w-full max-w-[1058px]
flex-col rounded-xl border-[0.3px] border-[#DADADA] bg-white shadow-[0px_4px_20px_0px_#0000000F] sm:my-12 md:grid md:grid-cols-4
lg:my-20"
    >
      <div className="rounded-t-xl bg-[#F7F8FA] px-4 py-2 md:col-span-1 md:rounded-l-xl md:rounded-t-none md:pl-6 md:pr-0">
        <p className="my-4 text-center text-[13px] font-bold leading-[23px] text-black md:my-6 md:text-left">
          JOIN AS:
        </p>
        <ul className="flex w-full flex-col">
          {donationItems.map((tab, i) => (
            <li
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.value);
                router.push(tab.value);
              }}
              className={cn(
                "flex min-w-[100px] cursor-pointer items-center justify-between border-[0.5px] border-x-0 border-[#DADADA] p-3 md:min-w-fit md:p-4 md:pr-0",
                i === donationItems.length - 1 && "border-b-0",
                "flex-1 md:flex-auto"
              )}
            >
              <div className="flex w-full items-center justify-center gap-1 md:justify-start md:gap-2">
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
                    "font-montreal text-[13px] text-[#75808A] md:text-[15px]",
                    activeTab === tab.value && "font-medium text-black"
                  )}
                >
                  {tab.title}
                </span>
              </div>
              {activeTab === tab.value ? (
                <div className="hidden h-[10px] w-[6px] rounded-l-full bg-primary md:block" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-b-xl p-4 shadow-tab-layout-content sm:p-6 md:col-span-3 md:rounded-b-none md:rounded-r-xl md:p-8">
        {children}
      </div>
    </div>
  );
};

export default RegistryTabLayout;
