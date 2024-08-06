import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicOrphanage = dynamic(
  () => import("screens/admin/dashboard/Orphanage"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export const metadata: Metadata = {
  title: "Orphanage Details | Soower",
};

export default function AdminOrphanage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicOrphanage id={id} />;
}
