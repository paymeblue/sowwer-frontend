import { Metadata } from "next";
import MakeDonation from "./make-donation";

export const metadata: Metadata = {
  title: "Project | Soower",
};

const ProjectDetails = ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;
  return <MakeDonation projectId={projectId} />;
};

export default ProjectDetails;
