"use client";

import { motion } from "framer-motion";
import {
  DEFAULT_VIEWPORT,
  cardContainerVariant,
  cardItemVariant,
} from "lib/variants";

import Target from "@components/assets/svg/Target";
import Vision from "@components/assets/svg/Vision";

const AboutMissionVisionSection = () => {
  return (
    <motion.section
      variants={cardContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      aria-label="Vision and Mission"
      className="grid grid-cols-1 gap-8 lg:grid-cols-2"
    >
      <motion.div
        variants={cardItemVariant}
        className="w-full rounded-[10px] bg-white px-8 py-8"
      >
        <Target />
        <h3 className="text_small_header mt-10">Our Mission</h3>
        <p className="text_regular_body_p mt-2 max-lg:text-[.8rem]">
          To serve as a beacon of God's love and compassion, fostering positive
          change and bringing hope to those in need. We are dedicated to
          empowering Christian communities and individuals to make a difference
          through acts of kindness and charitable giving. Our aim is to create a
          world where the ripple effect of love and generosity touches countless
          hearts and transforms lives.
        </p>
      </motion.div>

      <motion.div
        variants={cardItemVariant}
        className="w-full rounded-[10px] bg-white px-8 py-8"
      >
        <Vision />
        <h3 className="text_small_header mt-10">Our Vision</h3>
        <p className="text_regular_body_p mt-2 max-lg:text-[.8rem]">
          We envision a world where every act of giving and every kindom
          investment, whether big or small, multiplies in impact, igniting a
          movement of compassion and service towards widows, orphans and
          missions.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default AboutMissionVisionSection;
