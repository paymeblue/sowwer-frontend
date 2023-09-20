import ForgotPasswordForm from "@components/forms/ForgotPasswordForm";
import CenterLayoutMidWrapper from "@components/shared/Layouts/CenterLayoutMidWrapper";

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
