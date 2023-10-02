import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryProjectPage = dynamic(
  () => import("pages/ministry/dashboard/ProjectEditor"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function MinistryProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <DynamicMinistryProjectPage id={id} />;
}
