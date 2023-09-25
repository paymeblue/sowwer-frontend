import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";

const DynamicExploreProjectsPage = dynamic(
  () => import("pages/landing/ExploreProjects"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function ExploreProjects() {
  return <DynamicExploreProjectsPage />;
}
