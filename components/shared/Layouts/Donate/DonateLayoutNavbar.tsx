"use client";
import SectionContainer from "@components/sections/SectionContainer";
import Logo from "@components/shared/Logo";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

const DonateLayoutNavbar = () => {
  return (
    <motion.nav
      variants={defaultVariant({})}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      className="fixed left-0 top-0 z-30 flex h-[10vh] w-full items-center bg-white shadow-navbar transition-all duration-200"
    >
      <SectionContainer>
        <div className="flex w-full items-center justify-between">
          <Logo />

          <p className="text_small_body_r">
            Already have an account?{" "}
            <span className="cursor-pointer font-[500] text-accent transition-all duration-200 hover:underline">
              Sign in
            </span>{" "}
          </p>
        </div>
      </SectionContainer>
    </motion.nav>
  );
};

export default DonateLayoutNavbar;
