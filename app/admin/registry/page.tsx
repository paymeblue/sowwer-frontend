import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicRegistry = dynamic(
  () => import("screens/admin/dashboard/Registry"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export default function AdminRegistry() {
  return <DynamicRegistry />;
}
