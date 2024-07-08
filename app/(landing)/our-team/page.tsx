import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | Soower",
};

const DynamicOurTeamPage = dynamic(
  () => import("screens/landing/OurTeamPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function OurTeam() {
  return <DynamicOurTeamPage />;
}
