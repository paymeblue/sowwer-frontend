"use client";
import { ReactNode } from "react";
import SideLeft from "./SideLeft";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

interface Props {
  children: ReactNode;
  title: string;
  desc: string;
}

const SideLayoutWrapper = ({ children, title, desc }: Props) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideLeft title={title} desc={desc} />
      <motion.div
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="w-1/2 overflow-y-scroll bg-white p-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SideLayoutWrapper;
