import { ReactNode } from "react";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

const DonateLayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={defaultVariant({ delay: 0.5 })}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      className="w-[40%] rounded-[15px] bg-white p-8"
    >
      {/* Top section */}
      <h3 className="font-body text-[.75rem] font-[600] uppercase text-body-1">
        YOU ARE MAKING A DONATION TO
      </h3>
      {children}
    </motion.div>
  );
};

export default DonateLayoutWrapper;
