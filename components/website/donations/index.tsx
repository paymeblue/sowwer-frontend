"use client";
import { cn } from "@lib/cn";
import Donation from "app/donate/[id]/page";
import DADProject from "./forms/dad-project";
import GeneralDonation from "./forms/general-donation";

type Props = { data: Donation };

const DonationDetails = ({ data }: Props) => {
  return (
    <div
      className={cn(
        "w-full",
        data.value === "general-giving" ? "my-4 md:my-6" : "m-auto"
      )}
    >
      {data.value !== "general-giving" ? (
        <div
          className={`mx-auto my-4 flex w-max items-center justify-center gap-2 rounded-full px-4 py-2 md:my-6 md:px-6 md:py-3 ${data.pillShadow}`}
        >
          <div
            className="h-[6px] w-[6px] rounded-full"
            style={{ background: data.pillColor }}
          />
          <h2
            className="font-aeonik text-xs font-medium leading-[16.1px] md:text-sm"
            style={{ color: data.pillColor }}
          >
            {data.title}
          </h2>
        </div>
      ) : null}
      <div className="px-2 text-center md:px-0">
        <h1 className="font-aeonik text-lg font-medium text-black md:text-[22px]">
          Donate to {data.title}
        </h1>
        <p className="font-montreal text-sm font-normal text-body-2 md:text-[15px]">
          {data.desc}
        </p>
      </div>
      <div className="my-4 md:my-8">
        {data.value === "dad-project" ? <DADProject /> : <GeneralDonation />}
      </div>
    </div>
  );
};

export default DonationDetails;
