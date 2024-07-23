"use client";

import SectionContainer from "@components/sections/SectionContainer";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import ExploreTestimoniesSection from "@components/tabs/landing/ExploreTestimoniesSection";
// import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

const ExploreTestimonies = () => {
  return (
    <SectionContainer>
      <motion.section
        variants={defaultVariant({ delay: 0.1 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="safearea-top mb-20 w-full"
      >
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text_variant_h2 text-center text-[2rem] lg:text-[2.5rem]">
            Explore Testimonies
          </h2>
          <p className="text_large_body_p w-full text-center lg:w-[60%]">
            Below are some testimonies from recipients of donations and donors,
            to see the impact of the donations received through SOOWER.
          </p>
        </div>
        <NoSSRWrapper>
          <ExploreTestimoniesSection />
        </NoSSRWrapper>
      </motion.section>
    </SectionContainer>
  );
};

export default ExploreTestimonies;
