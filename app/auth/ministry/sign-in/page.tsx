import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicMinistrySigninPage = dynamic(
  () => import("pages/auth/MinistrySigninPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export const metadata: Metadata = {
  title: "Ministry - Signin | Soower",
};

export default function SignIn() {
  return <DynamicMinistrySigninPage />;
}
