import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonorSigninPage = dynamic(
  () => import("pages/auth/DonorSigninPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export default function SignIn() {
  return <DynamicDonorSigninPage />;
}
