import ForgotPasswordForm from "@components/forms/auth/ForgotPasswordForm";
import CenterLayoutMidWrapper from "@components/shared/Layouts/Center/CenterLayoutMidWrapper";

const ForgotPasswordPage = () => {
  return (
    <CenterLayoutMidWrapper
      title="Forgot Password?"
      subTitle="Enter your email address below and a password reset link will be sent to you."
    >
      <ForgotPasswordForm />
    </CenterLayoutMidWrapper>
  );
};

export default ForgotPasswordPage;
