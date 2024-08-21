import Loader from "@components/shared/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | Soower",
};

const DynamicPrivacyPage = dynamic(
  () => import("screens/landing/AcceptablePolicy"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function Privacy() {
  return <DynamicPrivacyPage />;
}
