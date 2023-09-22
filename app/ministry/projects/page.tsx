import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryProjectsHome = dynamic(
  () => import("pages/ministry/dashboard/Projects"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export default function MinistryProjects() {
  return <DynamicMinistryProjectsHome />;
}
