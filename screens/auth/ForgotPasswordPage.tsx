"use client";
import { useState } from "react";
import ForgotPasswordForm from "@components/forms/auth/ForgotPasswordForm";
import CenterLayoutMidWrapper from "@components/shared/Layouts/Center/CenterLayoutMidWrapper";
import SuccessState from "@components/shared/SuccessState";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

const ForgotPasswordPage = () => {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <CenterLayoutMidWrapper>
        <SuccessState
          title="Password Reset Email Sent"
          desc="An email has been sent to the address associated with your account. If you don't see the email in your inbox, please check your spam folder."
        />
      </CenterLayoutMidWrapper>
    );
  }

  return (
    <CenterLayoutMidWrapper
      title="Forgot Password?"
      subTitle="Enter your email address below and a password reset link will be sent to you."
    >
      <NoSSRWrapper>
        <ForgotPasswordForm
          onSuccess={() => {
            setSuccess(true);
          }}
        />
      </NoSSRWrapper>
    </CenterLayoutMidWrapper>
  );
};

export default ForgotPasswordPage;
