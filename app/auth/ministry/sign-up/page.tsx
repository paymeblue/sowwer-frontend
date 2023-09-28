import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ministry - Signup | Soower",
};

const DynamicMinistrySignupPage = dynamic(
  () => import("pages/auth/MinistrySignupPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export default function SignUp() {
  return <DynamicMinistrySignupPage />;
}
