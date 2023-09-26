"use client";

import ProjectCard, { IProject } from "@components/cards/ProjectCard";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, cardContainerVariant } from "lib/variants";

export const donations: IProject[] = [
  {
    image: "/assets/images/rectangle.png",
    category: "recurring",
    title: "Family Worship Center",
    organisedBy: "Abuja, Nigeria",
    description:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    amountRaised: "2 million",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
  },
  {
    image: "/assets/images/rectangle.png",
    category: "one-time",
    title: "Family Worship Center",
    organisedBy: "Abuja, Nigeria",
    description:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    amountRaised: "2 million",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
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
