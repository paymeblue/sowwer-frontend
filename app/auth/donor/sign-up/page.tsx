import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonorSignupPage = dynamic(
  () => import("screens/auth/DonorSignupPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export default function SignUp() {
  return <DynamicDonorSignupPage />;
}
