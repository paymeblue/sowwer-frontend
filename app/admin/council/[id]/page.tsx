import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicCouncil = dynamic(
  () => import("screens/admin/dashboard/Council"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export const metadata: Metadata = {
  title: "Council Details | Soower",
};

export default function AdminCouncil({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicCouncil id={id} />;
}
