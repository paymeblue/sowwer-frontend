import { Metadata } from "next";
import NewProjectPage from "./new-project";

export const metadata: Metadata = { title: "New Projects - Ministry | Soower" };

const Projects = () => {
  return <NewProjectPage />;
};

export default Projects;
