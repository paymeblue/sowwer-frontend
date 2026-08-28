"use client";

import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type ParallaxPhoto = {
  title: string;
  link: string;
  thumbnail: string;
};

export const HeroParallax = ({
  photos,
  header,
}: {
  photos: readonly ParallaxPhoto[];
  /** Copy that sits above the scrolling rows — kept separate from the grid
   * itself so callers can reuse their own eyebrow/heading/CTA markup. */
  header?: React.ReactNode;
}) => {
  const firstRow = photos.slice(0, 5);
  const secondRow = photos.slice(5, 10);
  const thirdRow = photos.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Kept modest on purpose: this rides a ~1.5-viewport section embedded
  // mid-page, not a dedicated full-height hero, so the reveal has to finish
  // — and the tilt/drift has to stay small — inside that shorter run or it
  // either overshoots into the header above or leaves dead scroll below.
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.33], [10, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.33], [0.4, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.33], [6, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.33], [-60, 40]),
    springConfig
  );

  return (
    <div
      ref={ref}
      // Tall enough for the header (which grew once the scripture card and
      // the larger overlapping video were added) plus all three photo rows —
      // short of that, overflow-hidden below clips the last row's cards.
      className="relative flex h-[210vh] flex-col self-auto overflow-hidden pb-16 pt-32 antialiased [perspective:1000px] [transform-style:preserve-3d] md:pb-24 md:pt-40"
    >
      {header}
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="mt-14 md:mt-20"
      >
        <motion.div className="mb-14 flex flex-row-reverse space-x-20 space-x-reverse md:mb-20">
          {firstRow.map((photo) => (
            <ParallaxCard
              photo={photo}
              translate={translateX}
              key={photo.title}
            />
          ))}
        </motion.div>
        <motion.div className="mb-14 flex flex-row space-x-20 md:mb-20">
          {secondRow.map((photo) => (
            <ParallaxCard
              photo={photo}
              translate={translateXReverse}
              key={photo.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((photo) => (
            <ParallaxCard
              photo={photo}
              translate={translateX}
              key={photo.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const ParallaxCard = ({
  photo,
  translate,
}: {
  photo: ParallaxPhoto;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -16 }}
      key={photo.title}
      className="group/photo relative h-56 w-[20rem] shrink-0 overflow-hidden rounded-2xl bg-grey shadow-[0_18px_50px_-18px_rgba(3,6,33,0.35)] md:h-72 md:w-[26rem]"
    >
      <Link
        href={photo.link}
        className="block h-full w-full"
        aria-label={photo.title}
      >
        <Image
          src={photo.thumbnail}
          alt={photo.title}
          fill
          sizes="(max-width: 768px) 320px, 416px"
          className="photo-real absolute inset-0 h-full w-full object-cover"
        />
      </Link>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 transition-opacity duration-300 group-hover/photo:opacity-60" />
      <h2 className="pointer-events-none absolute bottom-4 left-4 right-4 font-aeonik text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100">
        {photo.title}
      </h2>
    </motion.div>
  );
};
