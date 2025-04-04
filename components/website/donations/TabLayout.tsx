"use client";

import { cn } from "@lib/cn";
import { donationItems } from "app/(basicFooterLayout)/website/donations/[id]/page";
import { useParams, useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";

const TabLayout = ({ children }: PropsWithChildren) => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(id as string);
  return (
    <div className="grid w-full max-w-4xl -translate-y-1/4 translate-x-[30%] grid-cols-4 rounded-xl border-[0.3px] border-[#DADADA] bg-white shadow-tab-layout">
      <div className="col-span-1 rounded-l-xl bg-[#F7F8FA] py-2 pl-6 pr-0">
        <p className="my-6 text-[13px] font-bold leading-[23px] text-black ">
          DONATE TO:
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
                  {tab.label}
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

export default TabLayout;
