import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryPayouts = dynamic(
  () => import("screens/ministry/dashboard/Payouts"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export default function MinistryPayouts() {
  return <DynamicMinistryPayouts />;
}
