import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicMissionary = dynamic(
  () => import("screens/admin/dashboard/Missionary"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export const metadata: Metadata = {
  title: "Missionary Details | Soower",
};

export default function AdminMissionary({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <DynamicMissionary id={id} />;
}
