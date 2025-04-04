import { Metadata } from "next";
import dynamic from "next/dynamic";

const ResetPasswordPage = dynamic(
  () => import("@components/website/auth/reset-password")
);

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPassword = () => <ResetPasswordPage />;

export default ResetPassword;
