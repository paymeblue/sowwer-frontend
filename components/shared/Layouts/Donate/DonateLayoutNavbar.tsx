"use client";
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
      className="fixed left-0 top-0  z-30 flex h-[10vh] w-full flex-row items-center justify-between bg-white px-16 shadow-navbar transition-all duration-200"
    >
      <Logo />

      <p className="text_small_body_r">
        Already have an account?{" "}
        <span className="cursor-pointer text-accent transition-all duration-200 hover:underline">
          Sign in
        </span>{" "}
      </p>
    </motion.nav>
  );
};

export default DonateLayoutNavbar;
