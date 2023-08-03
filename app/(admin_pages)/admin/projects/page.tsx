import { Metadata } from "next";
import ProjectsPage from "./projects";

export const metadata: Metadata = { title: "Projects - Admin | Soower" };

const Projects = () => {
  return <ProjectsPage />;
};

export default Projects;
