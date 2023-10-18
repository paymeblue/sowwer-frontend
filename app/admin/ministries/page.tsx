import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";

const DynamicMinistries = dynamic(
  () => import("pages/admin/dashboard/Ministries"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export default function AdminMinistries() {
  return <DynamicMinistries />;
}
