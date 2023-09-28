import { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import { cn } from "@lib/cn";

interface Props {
  children: ReactNode;
  showHeaderText?: boolean;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const DonateLayoutWrapper = ({
  children,
  showHeaderText = true,
  className,
}: Props) => {
  return (
    <motion.div
      variants={defaultVariant({ delay: 0.5 })}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      className={cn("w-[40%] rounded-[15px] bg-white px-8 py-8", className)}
    >
      {/* Top section */}
      {showHeaderText && (
        <h3 className="font-body text-[.75rem] font-[600] uppercase text-body-1">
          YOU ARE MAKING A DONATION TO
        </h3>
      )}
      {children}
    </motion.div>
  );
};

export default DonateLayoutWrapper;
