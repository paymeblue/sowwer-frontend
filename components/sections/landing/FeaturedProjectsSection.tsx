"use client";
import { Button } from "@components/ui/button";
import { ArrowRight } from "react-iconly";
import SectionContainer from "../SectionContainer";
import ProjectCard, { IProject } from "@components/cards/ProjectCard";
import { motion } from "framer-motion";
import {
  DEFAULT_VIEWPORT,
  cardContainerVariant,
  defaultVariant,
} from "lib/variants";
import Link from "next/link";

export const featuredProjects: IProject[] = [
  {
    image: "/assets/images/happy_wom.png",
    category: "widows",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",
    title: "Healing Hearts",
    organisedBy: "BY FAMILY WORSHIP CENTER",
    description:
      "Offering financial stability, emotional assistance, and a sense of belonging to widows, helping them rebuild their lives and find hope in their journey of healing.",
    amountRaised: "2million",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
    featuredStat: {
      metric: "widows impacted",
      value: "10,321",
    },
  },
  {
    image: "/assets/images/children_running.png",
    category: "orphans",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",

    title: "Bright Futures for Orphans",
    organisedBy: "BY FAMILY WORSHIP CENTER",
    description:
      "We provided orphans with access to education, healthcare, and a loving environment. Giving them  a chance at a brighter, more promising tomorrow.",
    amountRaised: "3.72million",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
    featuredStat: {
      metric: "orphans impacted",
      value: "52,000",
    },
  },
  {
    image: "/assets/images/wom_busy.png",
    category: "missions",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",

    title: "Spreading Faith",
    organisedBy: "BY FAMILY WORSHIP CENTER",
    description:
      "Support missionaries in their journey to provide humanitarian aid, spiritual guidance, and sustainable development to communities in need.",
    amountRaised: "1.5million",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
    featuredStat: {
      metric: "missions impacted",
      value: "2,000",
    },
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
              Explore some of our past projects, each one exemplifying the
              impact of our collective faith, generosity, and compassion in
              action.
            </p>
            <Link href="/projects" className="self-center">
              <Button
                variant="link"
                className=" space-x-2 font-semibold text-accent"
              >
                <span>Explore ongoing projects</span>
                <ArrowRight set="light" size={18} />
              </Button>
            </Link>
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

          {/* <div
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
          </div> */}
        </motion.section>
      </SectionContainer>
    </div>
  );
};

export default FeaturedProjectSection;
