"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

import Logo from "../../Logo";
import SectionContainer from "@components/sections/SectionContainer";
import Footer from "@components/shared/Footer";

const CenterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#FCF9F2]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 85% 5%, rgba(255,198,41,0.2) 0%, transparent 70%), radial-gradient(40% 50% at 5% 95%, rgba(52,102,255,0.07) 0%, transparent 70%)",
        }}
      />
      <motion.header
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="relative mt-8"
      >
        <Logo />
      </motion.header>
      <motion.main
        variants={defaultVariant({ delay: 0.6 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="relative my-10 flex w-full items-center justify-center"
      >
        {children}
      </motion.main>

      <SectionContainer className="relative mt-auto">
        <Footer variant="minimal" />
      </SectionContainer>
    </div>
  );
};

export default CenterLayout;
