"use client";

import { cn } from "lib/utils/cn";
import { motion } from "motion/react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  itemClassName,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  itemClassName?: string;
  children?: ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <p className={cn("cursor-pointer", itemClassName)}>{item}</p>
      {active !== null && children ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item ? (
            // top-full + pt-4 (not a top offset) — the padding is still part
            // of this element's own hoverable box, so the cursor travelling
            // from the trigger down to the card never crosses a dead zone
            // that belongs to whatever is rendered behind the header.
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active-nav-menu"
                className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_20px_50px_-16px_rgba(3,6,33,0.28)]"
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
};

export const Menu = ({
  setActive,
  className,
  children,
}: {
  setActive: (item: string | null) => void;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn("relative flex items-center", className)}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="group flex items-start gap-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={title}
          fill
          sizes="56px"
          quality={60}
          loading="lazy"
          className="photo-real object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <h4 className="font-aeonik text-sm font-medium text-black">{title}</h4>
        <p className="mt-0.5 max-w-[11rem] font-montreal text-xs leading-snug text-body-2">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  className,
  ...rest
}: LinkProps & { children: ReactNode; className?: string }) => {
  return (
    <Link
      {...rest}
      className={cn(
        "font-montreal text-sm text-body-2 transition-colors hover:text-black",
        className
      )}
    >
      {children}
    </Link>
  );
};
