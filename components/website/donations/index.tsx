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
        data.value === "general-giving" ? "my-6" : "m-auto"
      )}
    >
      {data.value !== "general-giving" ? (
        <div
          className={`mx-auto my-6 flex w-max items-center justify-center gap-2 rounded-full px-6 py-3 ${data.pillShadow}`}
        >
          <div
            className="h-[6px] w-[6px] rounded-full"
            style={{ background: data.pillColor }}
          />
          <h2
            className="font-aeonik text-sm font-medium leading-[16.1px]"
            style={{ color: data.pillColor }}
          >
            {data.title}
          </h2>
        </div>
      ) : null}
      <div className="text-center">
        <h1 className="font-aeonik text-[22px] font-medium text-black">
          Donate to {data.title}
        </h1>
        <p className="font-montreal text-[15px] font-normal text-body-2">
          {data.desc}
        </p>
      </div>
      <div className="my-8">
        {data.value === "dad-project" ? <DADProject /> : <GeneralDonation />}
      </div>
    </div>
  );
};

export default DonationDetails;
