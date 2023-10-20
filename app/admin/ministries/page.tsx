import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicMinistries = dynamic(
  () => import("pages/admin/dashboard/Ministries"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export const metadata: Metadata = {
  title: "Admin | Soower",
};

export default function AdminMinistries() {
  return <DynamicMinistries />;
}
