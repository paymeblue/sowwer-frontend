import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryProjectEditor = dynamic(
  () => import("pages/ministry/dashboard/ProjectEditor"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function MinistryProjectsCreate() {
  return <DynamicMinistryProjectEditor />;
}
