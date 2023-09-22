import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistryPayouts = dynamic(
  () => import("pages/ministry/dashboard/Payouts"),
  {
    loading: () => <Loader />,
  }
) as any;

export default function MinistryPayouts() {
  return <DynamicMinistryPayouts />;
}
