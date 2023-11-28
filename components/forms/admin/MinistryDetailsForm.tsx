"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import Image from "next/image";
import { ReactNode } from "react";
import { useGetAdminMinistryAdministratorQuery } from "services/admin";
import { saveAs } from "file-saver";
import { GetAdminMinistryResponse } from "services/admin/typings";

interface Props {
  id: string;
  ministry?: GetAdminMinistryResponse;
}

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-4 w-full rounded-[0.625rem] bg-white p-6">
      {children}
    </div>
  );
};

export const MinistryDetailsForm = ({ ministry }: Props) => {
  if (!ministry?.data) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No ministry found with that ID"
        desc="We were unable to locate a ministry with that ID. Please ensure the ministry has not been deleted."
      />
    );
  }

  const {
    address,
    donation_description,
    email,
    logo,
    name,
    phone,
    state,
    website,
    cac_document,
    utility_bill,
  } = ministry.data;

  const handleClick = () => {
    saveAs(cac_document, `${name}_cac_document`);
  };

  const handleUtilityBillClick = () => {
    saveAs(utility_bill, `${name}_utility_bill`);
  };

  return (
    <Wrapper>
      <div className="mb-4 flex items-center justify-center">
        <div className="relative aspect-square w-24 overflow-hidden rounded-full bg-gray-200">
          {logo && (
            <Image
              src={logo}
              alt="Ministry logo"
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4">
        <div className="col-span-2 space-y-1">
          <Label>Ministry name</Label>
          <Input disabled value={name} />
        </div>
        <div className="space-y-1">
          <Label>Email address</Label>
          <Input disabled value={email} />
        </div>
        <div className="space-y-1">
          <Label>Phone number</Label>
          <Input disabled value={phone} />
        </div>
        <div className="col-span-2 space-y-1">
          <Label>Address line</Label>
          <Input disabled value={address} />
        </div>
        <div className="space-y-1">
          <Label>State</Label>
          <Input disabled value={state} />
        </div>
        <div className="space-y-1">
          <Label>Website or social link</Label>
          <Input disabled value={website} />
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
              <Label className="font-[500] lowercase">
                {name?.split(" ").join("_")}_cac
              </Label>
              <div className="flex items-center space-x-2">
                <Label
                  className="cursor-pointer leading-[1rem] text-accent hover:underline"
                  onClick={handleClick}
                >
                  Download
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <Label>Utility Bill</Label>
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/icons/imageplaceholder.svg"
              alt="CAC Image"
              width={32}
              height={32}
            />
            <div className="flex flex-col">
              <Label className="font-[500] lowercase">
                {name?.split(" ").join("_")}_utility_bill
              </Label>
              <div className="flex items-center space-x-2">
                <Label
                  className="cursor-pointer leading-[1rem] text-accent hover:underline"
                  onClick={handleUtilityBillClick}
                >
                  Download
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-1">
          <Label>
            What projects would you be receiving donations for on Soower?{" "}
          </Label>
          <Textarea rows={6} disabled value={donation_description} />
        </div>
      </div>
    </Wrapper>
  );
};

export const AdministratorDetailsForm = ({ id }: Props) => {
  const { data: ministryAdmin, isLoading } =
    useGetAdminMinistryAdministratorQuery({
      id,
    });

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!ministryAdmin?.data) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No ministry found with that ID"
        desc="We were unable to locate a ministry with that ID. Please ensure the ministry has not been deleted."
      />
    );
  }

  const { email, firstName, lastName, phone, role } = ministryAdmin.data;
  return (
    <Wrapper>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4">
        <div className="space-y-1">
          <Label>First name</Label>
          <Input disabled value={firstName} />
        </div>
        <div className="space-y-1">
          <Label>Last name</Label>
          <Input disabled value={lastName} />
        </div>
        <div className="col-span-2 space-y-1">
          <Label>Role</Label>
          <Input disabled value={role} />
        </div>
        <div className="space-y-1">
          <Label>Email address</Label>
          <Input disabled value={email} />
        </div>
        <div className="space-y-1">
          <Label>Phone number</Label>
          <Input disabled value={phone} />
        </div>
      </div>
    </Wrapper>
  );
};
