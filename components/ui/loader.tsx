"use client";

import { cn } from "lib/utils/cn";
import { motion } from "motion/react";

const dotTransition = (index: number) => ({
  duration: 1,
  repeat: Infinity,
  repeatType: "loop" as const,
  delay: index * 0.15,
  ease: "easeInOut" as const,
});

const SIZES = {
  sm: { dot: "h-1.5 w-1.5", gap: "gap-1", travel: 5 },
  md: { dot: "h-4 w-4", gap: "gap-2", travel: 10 },
} as const;

export const LoaderOne = ({
  className,
  size = "md",
}: {
  className?: string;
  size?: keyof typeof SIZES;
}) => {
  const { dot, gap, travel } = SIZES[size];
  return (
    <div className={cn("flex items-center", gap, className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, -travel, 0] }}
          transition={dotTransition(i)}
          className={cn(
            "rounded-full bg-primary shadow-[0_0_10px_rgba(255,198,41,0.55)]",
            dot
          )}
        />
      ))}
    </div>
  );
};
