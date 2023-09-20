import CenterLayoutMidWrapper from "@components/shared/Layouts/Center/CenterLayoutMidWrapper";
import ResetPasswordForm from "@components/forms/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <CenterLayoutMidWrapper
      title="Reset Password"
      subTitle="Please enter your new password below."
    >
      <ResetPasswordForm />
    </CenterLayoutMidWrapper>
  );
};

export default ResetPasswordPage;
