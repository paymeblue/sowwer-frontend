import Loader from "@components/shared/Loader";
import dynamic from "next/dynamic";

const DynamicProjectsPage = dynamic(
  () => import("screens/landing/ProjectPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function Project({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicProjectsPage projectId={id} />;
}
