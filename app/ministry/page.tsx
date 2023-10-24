import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryDashboardHome = dynamic(
  () => import("screens/ministry/dashboard/Home"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function MinistryDashboardHome() {
  return <DynamicMinistryDashboardHome />;
}
