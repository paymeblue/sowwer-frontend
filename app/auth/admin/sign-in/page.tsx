import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicAdminSigninPage = dynamic(
  () => import("screens/auth/AdminSigninPage"),
  {
    loading: () => <Loader showLogo />,
  }
) as any;

export const metadata: Metadata = {
  title: "Admin - Signin | Soower",
};

export default function AdminSignin() {
  return <DynamicAdminSigninPage />;
}
