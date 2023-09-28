"use client";
import { Button } from "@components/ui/button";
import { ArrowRight } from "react-iconly";
import logo from "public/assets/icons/logo.svg";
import SectionContainer from "../SectionContainer";
import ProjectCard, { IProject } from "@components/cards/ProjectCard";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  DEFAULT_VIEWPORT,
  cardContainerVariant,
  defaultVariant,
} from "lib/variants";

export const featuredProjects: IProject[] = [
  {
    image: "/assets/images/happy_wom.png",
    category: "widows",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",

    title: "Name of project",
    organisedBy: "BY FAMILY WORSHIP CENTER",
    description:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    amountRaised: "2 million",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
  },
  {
    image: "/assets/images/wom_busy.png",
    category: "orphans",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",

    title: "Name of project",
    organisedBy: "BY FAMILY WORSHIP CENTER",
    description:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    amountRaised: "2 million",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
  },
  {
    image: "/assets/images/children_running.png",
    category: "missions",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",

    title: "Name of project",
    organisedBy: "BY FAMILY WORSHIP CENTER",
    description:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    amountRaised: "2 million",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
  },
];

const FeaturedProjectSection = () => {
  return (
    <div className="w-[100vw] bg-white py-16">
      <SectionContainer>
        <motion.section
          variants={defaultVariant({ delay: 0.5 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
        >
          <div className="mx-auto flex w-full flex-col space-y-4 lg:w-[60%]">
            <h2 className="text_variant_h2 text-center">
              Some of our featured projects
            </h2>
            <p className="text_medium_body_p text-center">
              Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
              imperdiet pellentesque. Urna eros interdum est sollicitudin
              dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
              dolor sit amet consectetur.
            </p>
            <Button
              variant="link"
              className=" space-x-2 font-semibold text-accent"
            >
              <span>Explore ongoing projects</span>
              <ArrowRight set="light" size={18} />
            </Button>
          </div>

          <motion.div
            variants={cardContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {featuredProjects.map((project, i) => {
              return (
                <ProjectCard
                  {...project}
                  variant="featured"
                  key={project.title + i}
                />
              );
            })}
          </motion.div>

          <div
            aria-label="Some of our partners"
            className="mt-16 hidden lg:block"
          >
            <h3 className="text-center !font-[300] text-accent">
              SOME OF OUR TRUSTEES & PARTNERS
            </h3>
            <div className="mt-8 flex w-full items-center justify-around">
              <Image src={logo} alt="soower patners" />
              <Image src={logo} alt="soower patners" />
              <Image src={logo} alt="soower patners" />
              <Image src={logo} alt="soower patners" />
              <Image src={logo} alt="soower patners" />
            </div>
          </div>
        </motion.section>
      </SectionContainer>
    </div>
  );
};

export default FeaturedProjectSection;
