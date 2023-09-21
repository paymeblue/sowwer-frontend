"use client";

import ProjectCard, { IProject } from "@components/cards/ProjectCard";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, cardContainerVariant } from "lib/variants";

export const donations: IProject[] = [
  {
    image: "/assets/images/rectangle.png",
    category: "recurring",
    tagColor: "#9B51E0",
    bgColor: "#9747FF24",
    title: "Family Worship Center",
    subTitle: "Abuja, Nigeria",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    raised: "2 million",
    impacted: "52,000",
  },
  {
    image: "/assets/images/rectangle.png",
    category: "one-time",
    tagColor: "#2F80ED",
    bgColor: "#2F80ED24",
    title: "Family Worship Center",
    subTitle: "Abuja, Nigeria",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    raised: "2 million",
    impacted: "52,000",
  },
];

const GeneralDonations = () => {
  return (
    <motion.div
      variants={cardContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      className="mt-6 grid w-full grid-cols-3 gap-6"
    >
      {donations.map((donation, i) => {
        return (
          <ProjectCard
            {...donation}
            variant="general"
            key={donation.title + i}
          />
        );
      })}
    </motion.div>
  );
};

export default GeneralDonations;
