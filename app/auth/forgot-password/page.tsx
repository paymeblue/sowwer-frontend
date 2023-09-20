import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicForgotPassword = dynamic(
  () => import("pages/auth/ForgotPasswordPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function ForgotPassword() {
  return <DynamicForgotPassword />;
}
