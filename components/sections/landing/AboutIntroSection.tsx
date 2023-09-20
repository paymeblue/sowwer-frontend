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
          <h2 className="text_variant_h2">
            The Kingdom Investment Platform. <br /> Perfectly positioned to lend
            a helping hand.
          </h2>
          <p className="text_variant_caption">
            Lorem ipsum dolor sit amet consectetur. Sed ut venenatis id lectus.
            Pretium quam sit eu senectus ullamcorper dui nullam. Fermentum massa
            semper facilisis elementum amet aenean. Facilisis scelerisque nulla
            non volutpat mi dolor. Facilisis massa nunc cursus porta porta arcu
            in. Nec consectetur nunc etiam nulla leo sit magna. Ultrices
            tristique est nunc.
          </p>
        </motion.div>
      </SectionContainer>

      <motion.div
        variants={defaultVariant({ delay: 0.4 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="my-20 w-full"
      >
        <ImageCarouselSection />
      </motion.div>
    </>
  );
};

export default AboutIntroSection;
