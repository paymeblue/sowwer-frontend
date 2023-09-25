import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";

const DynamicProjectsPage = dynamic(() => import("pages/landing/ProjectPage"), {
  loading: () => <Loader />,
}) as any;

export default function Project() {
  return <DynamicProjectsPage />;
}
