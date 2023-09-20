import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicDonorSignupPage = dynamic(
  () => import("pages/donor/DonorSignupPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function SignUp() {
  return <DynamicDonorSignupPage />;
}
