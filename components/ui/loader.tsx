"use client";

import { cn } from "lib/utils/cn";
import { motion } from "motion/react";

const dotTransition = (index: number) => ({
  duration: 1,
  repeat: Infinity,
  repeatType: "loop" as const,
  delay: index * 0.2,
  ease: "easeInOut" as const,
});

export const LoaderOne = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={dotTransition(i)}
          className="h-4 w-4 rounded-full bg-primary"
        />
      ))}
    </div>
  );
};
