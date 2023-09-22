import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryDonors = dynamic(
  () => import("pages/ministry/dashboard/Donors"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function MinistryDonors() {
  return <DynamicMinistryDonors />;
}
