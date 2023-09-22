import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryCreateProject = dynamic(
  () => import("pages/ministry/dashboard/CreateProject"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function MinistryProjectsCreate() {
  return <DynamicMinistryCreateProject />;
}
