"use client";
import CenterLayoutMidWrapper from "@components/shared/Layouts/Center/CenterLayoutMidWrapper";
import ResetPasswordForm from "@components/forms/auth/ResetPasswordForm";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import SuccessState from "@components/shared/SuccessState";
import Link from "next/link";
import { Button } from "@components/ui/button";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

const ResetPasswordPageComp = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <CenterLayoutMidWrapper>
        <SuccessState
          title="Password Reset Successfully"
          desc="You password has been reset successfully. Thanks for using Soower"
          action={
            <Link href="/">
              <Button variant="secondary">Back to home</Button>
            </Link>
          }
        />
      </CenterLayoutMidWrapper>
    );
  }

  if (!token) {
    redirect("/");
  }

  return (
    <CenterLayoutMidWrapper
      title="Reset Password"
      subTitle="Please enter your new password below."
    >
      <NoSSRWrapper>
        <ResetPasswordForm
          token={token}
          onSuccess={() => {
            setSuccess(true);
          }}
        />
      </NoSSRWrapper>
    </CenterLayoutMidWrapper>
  );
};

const ResetPasswordPage = () => {
  return (
    <NoSSRWrapper>
      <ResetPasswordPageComp />
    </NoSSRWrapper>
  );
};

export default ResetPasswordPage;
