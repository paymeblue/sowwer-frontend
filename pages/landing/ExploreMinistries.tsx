"use client";
import SectionContainer from "@components/sections/SectionContainer";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import ExploreMinistriesTab from "@components/tabs/landing/ExploreMinistriesTab";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

const ExploreMinistries = () => {
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
          <h2 className="text_variant_h2 text-center text-[2.5rem]">
            Explore Ministries
          </h2>
          <p className="text_large_body_p w-[60%] text-center">
            Explore different ministries i.e, Churches and other Christian
            Organizations on Soower. Make a kingdom investment by donating to
            different ministries across Nigeria and supporting their projects.
          </p>
        </div>
        <NoSSRWrapper>
          <ExploreMinistriesTab />
        </NoSSRWrapper>
      </motion.section>
    </SectionContainer>
  );
};

export default ExploreMinistries;
