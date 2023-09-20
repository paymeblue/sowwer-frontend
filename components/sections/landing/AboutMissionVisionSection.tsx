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
      className="grid grid-cols-2 gap-8"
    >
      <motion.div
        variants={cardItemVariant}
        className="w-full rounded-[10px] bg-white px-8 py-8"
      >
        <Target />
        <h3 className="text_small_header mt-10">Our Mission</h3>
        <p className="text_regular_body_p mt-2">
          Lorem ipsum dolor sit amet consectetur. Hendrerit diam tempus ac sit
          tellus. Pellentesque odio lorem ut metus viverra sem. Rhoncus
          vulputate sapien ut egestas porttitor egestas urna tempus libero. Est
          suspendisse in dictum tellus faucibus. A diamnulla cras non erat
          elementum. Tincidunt convallis eu ac aliquameu.
        </p>
      </motion.div>

      <motion.div
        variants={cardItemVariant}
        className="w-full rounded-[10px] bg-white px-8 py-8"
      >
        <Vision />
        <h3 className="text_small_header mt-10">Our Vision</h3>
        <p className="text_regular_body_p mt-2">
          Lorem ipsum dolor sit amet consectetur. Hendrerit diam tempus ac sit
          tellus. Pellentesque odio lorem ut metus viverra sem. Rhoncus
          vulputate sapien ut egestas porttitor egestas urna tempus libero. Est
          suspendisse in dictum tellus faucibus. A diamnulla cras non erat
          elementum. Tincidunt convallis eu ac aliquameu.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default AboutMissionVisionSection;
