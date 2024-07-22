import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryTestimonyEditor = dynamic(
  () => import("screens/admin/dashboard/TestimonyEditor"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function MinistryTestimonyCreate() {
  return <DynamicMinistryTestimonyEditor />;
}
