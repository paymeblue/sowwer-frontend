import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicBulkEmail = dynamic(
  () => import("screens/admin/dashboard/BulkEmail"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export default function BulkEmail() {
  return <DynamicBulkEmail />;
}
