"use client";

import ProjectCard from "@components/cards/ProjectCard";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, cardContainerVariant } from "lib/variants";
// import { exploreProjects } from "pages/landing/ExploreProjects";
import { featuredProjects } from "../landing/FeaturedProjectsSection";

const ProjectDonations = () => {
  return (
    <motion.div
      variants={cardContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      className="mt-6 grid w-full grid-cols-3 gap-6"
    >
      {featuredProjects.map((project, i) => {
        return (
          <ProjectCard {...project} variant="default" key={project.title + i} />
        );
      })}
    </motion.div>
  );
};

export default ProjectDonations;
