"use client";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import Image from "next/image";
import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-4 w-full rounded-[0.625rem] bg-white p-6">
      {children}
    </div>
  );
};

export const MinistryDetailsForm = () => {
  return (
    <Wrapper>
      <div className="mb-4 flex items-center justify-center">
        <div className="relative aspect-square w-24 rounded-full bg-gray-200"></div>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4">
        <div className="col-span-2 space-y-1">
          <Label>Ministry name</Label>
          <Input disabled value="Victor Whyte Ministry" />
        </div>
        <div className="space-y-1">
          <Label>Email address</Label>
          <Input disabled value="victor@ministry.com" />
        </div>
        <div className="space-y-1">
          <Label>Phone number</Label>
          <Input disabled value="+2348166406459" />
        </div>
        <div className="col-span-2 space-y-1">
          <Label>Address line</Label>
          <Input disabled value="Idris Gidado Street, Wuye" />
        </div>
        <div className="space-y-1">
          <Label>State</Label>
          <Input disabled value="Rivers" />
        </div>
        <div className="space-y-1">
          <Label>Website or social link</Label>
          <Input disabled value="fwc.org" />
        </div>
        <div className="space-y-1">
          <Label>CAC Document</Label>
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/icons/imageplaceholder.svg"
              alt="CAC Image"
              width={32}
              height={32}
            />
            <div className="flex flex-col">
              <Label className="font-[500]">FWC CAC Document</Label>
              <Label className="text-[.8rem] text-[#8F8F8F]">.JPG • 2MB</Label>
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-1">
          <Label>
            What projects would you be receiving donations for on Soower?{" "}
          </Label>
          <Textarea
            rows={6}
            disabled
            value="Lorem ipsum dolor sit amet consectetur. Faucibus senectus ultrices fermentum facilisi ornare sed vel."
          />
        </div>
      </div>
    </Wrapper>
  );
};

export const AdministratorDetailsForm = () => {
  return (
    <Wrapper>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4">
        <div className="space-y-1">
          <Label>First name</Label>
          <Input disabled value="Victor" />
        </div>
        <div className="space-y-1">
          <Label>Last name</Label>
          <Input disabled value="Whyte" />
        </div>
        <div className="col-span-2 space-y-1">
          <Label>Role</Label>
          <Input
            disabled
            value="Administrative Assistant, Family Ministries Int’l"
          />
        </div>
        <div className="space-y-1">
          <Label>Email address</Label>
          <Input disabled value="victor@ministry.com" />
        </div>
        <div className="space-y-1">
          <Label>Phone number</Label>
          <Input disabled value="+2348166406459" />
        </div>
      </div>
    </Wrapper>
  );
};
