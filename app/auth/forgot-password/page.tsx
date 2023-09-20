import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonorForgotPassword = dynamic(
  () => import("pages/donor/ForgotPasswordPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function ForgotPassword() {
  return <DynamicDonorForgotPassword />;
}
