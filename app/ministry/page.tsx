import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryDashboardHome = dynamic(
  () => import("pages/ministry/dashboard/Home"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function DonorDonations() {
  return <DynamicMinistryDashboardHome />;
}
