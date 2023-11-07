"use client";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import SectionContainer from "../SectionContainer";
import { motion } from "framer-motion";
import ImageCarouselSection from "./ImageCarouselSection";

const AboutIntroSection = () => {
  return (
    <>
      <SectionContainer>
        <motion.div
          variants={defaultVariant({ delay: 0.2 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="flex flex-col space-y-4"
        >
          <h2 className="text_variant_h2 max-lg:text-[2.6rem] max-lg:leading-[3.3rem]">
            The Kingdom Investment Platform. <br /> Perfectly positioned to lend
            a helping hand.
          </h2>
          <p className="text_variant_caption">
            We believe that we are all called to be a beacon of hope and
            compassion in the world. Our mission is to be perfectly positioned
            to lend a helping hand to those in need, just as Jesus taught us.
            Through your support and generosity, we can extend our reach and
            make a profound impact on the lives of individuals and communities
            in need. Together, we can be the hands and feet of Christ, spreading
            love, kindness, and assistance to those who require it most.
          </p>
        </motion.div>
      </SectionContainer>

      <motion.div
        variants={defaultVariant({ delay: 0.4 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="my-10 w-full lg:my-20"
      >
        <ImageCarouselSection />
      </motion.div>
    </>
  );
};

export default AboutIntroSection;
