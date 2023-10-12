"use client";
import { useState } from "react";
import { useGetMinistryDetailsQuery } from "services/ministry";

import DonateToMinistryForm from "@components/forms/donate/DonateToMinistryForm";
import DonateLayoutWrapper from "@components/shared/Layouts/Donate/DonateLayoutWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import Link from "next/link";
import { Button } from "@components/ui/button";
import SuccessState from "@components/shared/SuccessState";
import Image from "next/image";

interface Props {
  ministryId: string;
}

const DonateMinistryComp = ({ ministryId }: Props) => {
  const {
    data: ministryData,
    isLoading,
    isFetching,
    isError,
  } = useGetMinistryDetailsQuery(ministryId);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  if (!ministryData?.data && (isLoading || isFetching)) {
    return <Loader className="h-[70vh]" />;
  }

  if ((!ministryData?.data && !(isLoading || isFetching)) || isError) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="Unable to get the ministry details"
        desc="Unfortunaly, we couldn't find details for this ministry. There was an error fetching or the ministry may not exist."
        action={
          <Link href="/ministries">
            <Button className="w-fit" variant="secondary">
              Explore ministries
            </Button>
          </Link>
        }
      />
    );
  }

  if (paymentSuccessful) {
    return (
      <DonateLayoutWrapper showHeaderText={false} className="py-16">
        <SuccessState
          title="Donation successful"
          className="mx-auto w-full lg:w-[80%]"
          desc={
            <>
              Your donation to{" "}
              <span className="font-[600] capitalize">
                "{ministryData?.data.name}"
              </span>{" "}
              was successful. Thanks for being a part of the ripple effect of
              giving.
            </>
          }
          action={
            <Link href="/ministries">
              <Button className="w-fit">Back to ministries page</Button>
            </Link>
          }
        />
      </DonateLayoutWrapper>
    );
  }

  const { logo, name, id } = ministryData.data;

  return (
    <DonateLayoutWrapper>
      <div className="mt-4 flex items-center space-x-4">
        {logo && (
          <div className="relative aspect-[1/1] w-16 rounded-full">
            <Image
              src={logo}
              alt="Ministry logo"
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h2 className="text_medium_header capitalize">{name}</h2>
        </div>
      </div>

      <div className="mt-10">
        <DonateToMinistryForm
          id={id}
          setPaymentSuccessful={setPaymentSuccessful}
          title={name}
        />
      </div>
    </DonateLayoutWrapper>
  );
};

const DonateMinistryPage = ({ ministryId }: Props) => {
  return (
    <NoSSRWrapper>
      <DonateMinistryComp ministryId={ministryId} />
    </NoSSRWrapper>
  );
};

export default DonateMinistryPage;
