"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import success from "public/images/success.png";

const SuccessCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <div
      className="m-4 mx-auto w-full max-w-[91%] -translate-y-1/4 space-y-4 rounded-xl bg-white p-4 text-center shadow-[0rem_.25rem_1.25rem_0rem_#0000000F] md:m-6 md:max-w-[591px] md:-translate-y-1/2
md:space-y-6 md:p-6"
    >
      <Image
        src={success}
        alt="success icon"
        width={60}
        height={60}
        className="mx-auto"
      />
      <div className="space-y-2 md:space-y-3">
        <h4 className="font-aeonik text-xl font-medium text-black md:text-[1.75rem]">
          Thank you for your donation!
        </h4>
        <p className="text-center font-montreal text-sm leading-[1.3125rem] text-body-2 md:text-base">
          Your donation has been successfully received, thank you for joining us
          to be the light in someone's story.{" "}
          {email && (
            <>
              A receipt has been sent to your email:{" "}
              <strong className="font-medium text-body-1">{email}</strong>
            </>
          )}
        </p>
        {/* <p className="text-center font-montreal text-base leading-[1.3125rem]">
          Since you chose to sign up, your account has been created and you can
          now keep track of your donations and impact.
        </p> */}
      </div>
      <Button
        onClick={() => router.push("/")}
        className="w-full font-montreal text-sm font-medium text-black"
      >
        Back to home page
      </Button>
    </div>
  );
};

export default SuccessCard;
