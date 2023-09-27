import Loader from "@components/shared/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicMinistryPage = dynamic(
  () => import("pages/landing/MinistryPage"),
  {
    loading: () => <Loader />,
  }
) as any;

export const metadata: Metadata = {
  title: "Project | Soower",
};

export default function Minstry({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicMinistryPage ministryId={id} />;
}
