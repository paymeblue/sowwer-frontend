"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

import Logo from "../../Logo";
import SectionContainer from "@components/sections/SectionContainer";
import Footer from "@components/shared/Footer";

const CenterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <motion.header
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
      >
        <Logo />
      </motion.header>
      <motion.main
        variants={defaultVariant({ delay: 0.6 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="my-4 flex w-full items-center justify-center"
      >
        {children}
      </motion.main>

      <SectionContainer className="mt-auto">
        <Footer variant="minimal" />
      </SectionContainer>
    </div>
  );
};

export default CenterLayout;
