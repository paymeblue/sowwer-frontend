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

const featuredProjects: IProject[] = [
  {
    image: "/assets/images/happy_wom.png",
    category: "widows",
    tagColor: "#9B51E0",
    bgColor: "#9747FF24",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    raised: "2 million",
    impacted: "52,000",
  },
  {
    image: "/assets/images/children_running.png",
    category: "orphans",
    tagColor: "#F2994A",
    bgColor: "#F2994A24",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    raised: "2 million",
    impacted: "52,000",
  },
  {
    image: "/assets/images/wom_busy.png",
    category: "missions",
    tagColor: "#2F80ED",
    bgColor: "#2F80ED24",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    raised: "2 million",
    impacted: "52,000",
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
          <div className="mx-auto flex w-[60%] flex-col space-y-4">
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
            className="mt-20 grid grid-cols-3 gap-6"
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

          <div aria-label="Some of our partners" className="mt-16">
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
