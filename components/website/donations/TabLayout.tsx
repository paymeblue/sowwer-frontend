"use client";

import { cn } from "@lib/cn";
import { donationItems } from "app/donate/[id]/page";
import { useParams, useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";

const TabLayout = ({ children }: PropsWithChildren) => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(id as string);
  return (
    <div className="relative flex w-full justify-center">
      <div className="mx-auto grid w-full max-w-full grid-cols-1 rounded-xl border-[0.3px] border-[#DADADA] bg-white px-4 shadow-tab-layout md:max-w-4xl md:-translate-y-1/4 md:grid-cols-4 md:px-0">
        <div className="col-span-1 rounded-t-xl bg-[#F7F8FA] py-2 pl-2 pr-0 md:rounded-l-xl md:rounded-t-none md:pl-6">
          <p className="my-4 text-[13px] font-bold leading-[23px] text-black md:my-6">
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
                  "flex cursor-pointer items-center justify-between border-[0.5px] border-x-0 border-[#DADADA] p-3 pr-0 md:p-4",
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
                      "font-montreal text-[14px] text-[#75808A] md:text-[15px]",
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
        <div className="col-span-1 rounded-b-xl p-4 shadow-tab-layout-content md:col-span-3 md:rounded-b-none md:rounded-r-xl md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TabLayout;
