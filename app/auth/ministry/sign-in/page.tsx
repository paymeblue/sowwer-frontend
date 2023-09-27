import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistrySigninPage = dynamic(
  () => import("pages/auth/MinistrySigninPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function SignIn() {
  return <DynamicMinistrySigninPage />;
}
