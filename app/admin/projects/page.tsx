import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicProjects = dynamic(
  () => import("screens/admin/dashboard/Projects"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export const metadata: Metadata = {
  title: "Admin | Soower",
};

export default function AdminProjects() {
  return <DynamicProjects />;
}
