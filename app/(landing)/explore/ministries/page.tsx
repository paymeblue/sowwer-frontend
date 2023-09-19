import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";

const DynamicExploreMinistriesPage = dynamic(
  () => import("pages/ExploreMinistries"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function ExploreProjects() {
  return <DynamicExploreMinistriesPage />;
}
