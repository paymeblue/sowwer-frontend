import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryDonors = dynamic(
  () => import("screens/ministry/dashboard/Donations"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export default function MinistryDonors() {
  return <DynamicMinistryDonors />;
}
