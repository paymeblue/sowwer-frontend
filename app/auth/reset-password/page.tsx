import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicResetPassword = dynamic(
  () => import("pages/auth/ResetPasswordPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function ResetPassword() {
  return <DynamicResetPassword />;
}
