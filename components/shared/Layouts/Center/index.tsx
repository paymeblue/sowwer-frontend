"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

import Logo from "../../Logo";
import SectionContainer from "@components/sections/SectionContainer";

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
        <footer className="flex w-full justify-between border-t-[.3px] border-body-2 px-4 py-4">
          <span className="text_small_body_sb">
            © 2023 Soower. All rights reserved.
          </span>
          <div className="flex items-center space-x-2">
            <Link href="#">
              <span className="text_small_body_r">Terms of Use</span>
            </Link>
            <Link href="#">
              <span className="text_small_body_r">Privacy Policy</span>
            </Link>
          </div>
        </footer>
      </SectionContainer>
    </div>
  );
};

export default CenterLayout;
