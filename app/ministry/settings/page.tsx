import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistrySettings = dynamic(
  () => import("screens/ministry/dashboard/Settings"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export default function MinistryDonors() {
  return <DynamicMinistrySettings />;
}
