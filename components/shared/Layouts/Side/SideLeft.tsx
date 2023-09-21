"use client";

import Logo from "@components/shared/Logo";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

interface Props {
  title: string;
  desc: string;
}

const SideLeft = ({ title, desc }: Props) => {
  return (
    <div className="h-screen max-h-screen w-1/2 overflow-hidden bg-primary p-10">
      <motion.div
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="w-full"
      >
        <Logo logoVariant="black" />

        <div className="mt-10 space-y-2">
          <h2 className="text_variant_h2">{title}</h2>
          <p className="text_medium_body_p">{desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SideLeft;
