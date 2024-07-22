import dynamic from "next/dynamic";
import Loader from "@components/shared/Loader";
import { Metadata } from "next";

const DynamicProjectTestionies = dynamic(
  () => import("screens/admin/dashboard/ProjectTestimonies"),
  {
    loading: () => <Loader className="h-[80vh]" />,
  }
) as any;

export const metadata: Metadata = {
  title: "Admin | Soower",
};

export default function AdminProjectTestimonies({
  params,
}: {
  params: { id: string };
}) {
  return <DynamicProjectTestionies id={params.id} />;
}
