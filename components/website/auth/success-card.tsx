"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import success from "public/images/success.png";

const SuccessCard = () => {
  const router = useRouter();
  return (
    <div
      className="m-6 w-full max-w-[500px] -translate-y-[60%] space-y-7 rounded-xl bg-white p-7 text-center
shadow-[0rem_.25rem_1.25rem_0rem_#0000000F] lg:mx-auto"
    >
      <Image
        src={success}
        alt="success icon"
        width={60}
        height={60}
        className="mx-auto"
      />
      <div className="space-y-3">
        <h4 className="font-aeonik text-[1.75rem] font-medium text-black">
          Password reset successful!
        </h4>
        <p className="text-center font-montreal text-base leading-[1.3125rem] text-body-2">
          Your password has been updated successfully! You can now log in using
          your new password.
        </p>
      </div>
      <Button
        onClick={() => router.push("/website?login=true")}
        className="w-full font-montreal text-sm font-medium text-black"
      >
        Go to login
      </Button>
    </div>
  );
};

export default SuccessCard;
