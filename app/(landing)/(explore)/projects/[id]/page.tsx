import Loader from "@components/shared/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicProjectsPage = dynamic(() => import("pages/landing/ProjectPage"), {
  loading: () => <Loader />,
}) as any;

export const metadata: Metadata = {
  title: "Project | Soower",
};

export default function Project({ params }: { params: { id: string } }) {
  const { id } = params;
  return <DynamicProjectsPage projectId={id} />;
}
