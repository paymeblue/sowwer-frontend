import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse active SOOWER projects supporting widows, orphans and missionaries, and see where your donation is put to work.",
};

const DynamicExploreProjectsPage = dynamic(
  () => import("screens/landing/ExploreProjects"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function ExploreProjects() {
  return <DynamicExploreProjectsPage />;
}
