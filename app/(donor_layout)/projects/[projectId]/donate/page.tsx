import { Metadata } from "next";
import DonateToProjectPage from "./donate";

export const metadata: Metadata = {
  title: "Donate To Project | Soower",
};

const DonateToProject = ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;
  return <DonateToProjectPage id={projectId} />;
};

export default DonateToProject;
