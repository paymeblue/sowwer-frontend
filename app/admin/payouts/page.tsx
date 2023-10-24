import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicPayouts = dynamic(
  () => import("screens/admin/dashboard/Payouts"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export default function AdminPayouts() {
  return <DynamicPayouts />;
}
