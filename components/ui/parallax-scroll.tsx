"use client";

import { cn } from "lib/utils/cn";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export type ParallaxScrollPhoto = { src: string; alt: string };

export const ParallaxScroll = ({
  photos,
  className,
}: {
  photos: readonly ParallaxScrollPhoto[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(photos.length / 3);
  const firstPart = photos.slice(0, third);
  const secondPart = photos.slice(third, 2 * third);
  const thirdPart = photos.slice(2 * third);

  const columns = [
    { photos: firstPart, translate: translateFirst },
    { photos: secondPart, translate: translateSecond },
    { photos: thirdPart, translate: translateThird },
  ];

  return (
    <div
      ref={gridRef}
      className={cn(
        "w-full items-start overflow-y-auto scroll-smooth",
        className
      )}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 md:gap-8 md:py-16">
        {columns.map((column, colIdx) => (
          <div className="grid gap-6 md:gap-8" key={`col-${colIdx}`}>
            {column.photos.map((photo, idx) => (
              <motion.div
                style={{ y: column.translate }}
                key={photo.src}
                className="group relative h-64 w-full overflow-hidden rounded-2xl bg-grey shadow-[0_12px_36px_-16px_rgba(3,6,33,0.3)] sm:h-72"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  loading={colIdx === 0 && idx === 0 ? undefined : "lazy"}
                  className="photo-real object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
