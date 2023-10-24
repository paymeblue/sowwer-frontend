import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Soower",
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
