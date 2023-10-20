import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicMinistry = dynamic(
  () => import("pages/admin/dashboard/Ministry"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export const metadata: Metadata = {
  title: "Ministry Details | Soower",
};

export default function AdminMinistry({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicMinistry id={id} />;
}
