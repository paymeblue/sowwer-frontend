import Loader from "@components/shared/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Terms of Use | Soower",
};

const DynamicTermsPage = dynamic(() => import("screens/landing/TermsPage"), {
  loading: () => <Loader />,
}) as any;

export default function Terms() {
  return <DynamicTermsPage />;
}
