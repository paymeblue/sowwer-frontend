"use client";

import { useGetProjectDetailsQuery } from "services/projects";

import DonateToProjectForm from "@components/forms/donate/DonateToProjectForm";
import DonateLayoutWrapper from "@components/shared/Layouts/Donate/DonateLayoutWrapper";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import { Button } from "@components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import SuccessState from "@components/shared/SuccessState";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { useSearchParams } from "next/navigation";
import { useVerifyProjectPaymentMutation } from "services/payouts";
import { useToast } from "@components/ui/use-toast";

interface Props {
  projectId: string;
}

const DonateProjectComp = ({ projectId }: Props) => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const txnId = searchParams.get("txnId");
  const txnRef = searchParams.get("txnRef");
  const {
    data: projectData,
    isLoading,
    isFetching,
    isError,
  } = useGetProjectDetailsQuery(projectId);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [verifyProjectPayment, { isLoading: verifyingPayment }] =
    useVerifyProjectPaymentMutation();

  const handleVerify = useCallback(async () => {
    try {
      await verifyProjectPayment({
        txn_id: txnId!,
        txn_reference: txnRef!,
      }).unwrap();
      setPaymentSuccessful(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment failed",
        description:
          "Unfortunately, we couldn't verify your payment. Please try again later or contact support.",
      });
    }
  }, [txnId, txnRef, toast, verifyProjectPayment]);

  useEffect(() => {
    if (!txnId || !txnRef) return;
    handleVerify();
  }, [txnId, txnRef, handleVerify]);

  if (!projectData?.data && (isLoading || isFetching)) {
    return <Loader className="h-[70vh]" />;
  }

  if (verifyingPayment) {
    return <Loader className="h-[70vh]" />;
  }

  if ((!projectData?.data && !(isLoading || isFetching)) || isError) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="Unable to get the project details"
        desc="Unfortunaly, we couldn't find details for this project. There was an error fetching or it may have been removed by the ministry."
        action={
          <Link href="/projects">
            <Button className="w-fit" variant="secondary">
              Explore projects
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
          title="Donation successful."
          className="mx-auto w-full lg:w-[80%]"
          desc={
            <>
              Your donation to{" "}
              <span className="font-[600] capitalize">
                "{projectData?.data.title}"
              </span>{" "}
              was successful. Thanks for being a part of the ripple effect of
              giving, this project is now one step closer to reality.
            </>
          }
          action={
            <Link href="/projects">
              <Button className="w-fit">Back to projects page</Button>
            </Link>
          }
        />
      </DonateLayoutWrapper>
    );
  }

  const { id, title, organisedBy, image } = projectData.data;

  return (
    <DonateLayoutWrapper>
      <div className="mt-4 flex items-center space-x-4">
        {image && (
          <div className="relative aspect-[1/0.6] w-40 bg-gray-200">
            <Image
              src={image}
              fill
              alt="Project image"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h2 className="text_medium_header">{title}</h2>
          <p className="text_tiny_body_r uppercase">BY {organisedBy}</p>
        </div>
      </div>

      <div className="mt-10">
        <NoSSRWrapper>
          <DonateToProjectForm
            id={id}
            title={title}
            setPaymentSuccessful={setPaymentSuccessful}
          />
        </NoSSRWrapper>
      </div>
    </DonateLayoutWrapper>
  );
};

const DonateProjectPage = ({ projectId }: Props) => {
  return (
    <NoSSRWrapper>
      <DonateProjectComp projectId={projectId} />
    </NoSSRWrapper>
  );
};

export default DonateProjectPage;
