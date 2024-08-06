import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicWidow = dynamic(() => import("screens/admin/dashboard/Widow"), {
  loading: () => <Loader className="h-[80vh]" />,
}) as any;

export const metadata: Metadata = {
  title: "Widow Details | Soower",
};

export default function AdminWidow({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicWidow id={id} />;
}
