import { Metadata } from "next";
import NewProjectPage from "./new-project";

export const metadata: Metadata = { title: "New Projects - Admin | Soower" };

const Projects = () => {
  return <NewProjectPage />;
};

export default Projects;
