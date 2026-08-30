"use client";

import { cn } from "lib/utils/cn";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type MovingCardItem = {
  quote: string;
  name: string;
  title: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: MovingCardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      scrollerRef.current?.appendChild(item.cloneNode(true));
    });

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
    containerRef.current.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
    );
    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="relative flex w-[20rem] shrink-0 flex-col justify-between gap-6 rounded-[1.75rem] border border-black/10 bg-[#FCF9F2] p-7 shadow-[0_2px_18px_-6px_rgba(3,6,33,0.1)] sm:w-[24rem] sm:p-8"
          >
            <span className="bg-primary/15 relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <Quote className="text-primary" size={18} />
            </span>
            <blockquote className="font-baskervville text-lg italic leading-relaxed text-body-1 sm:text-xl">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="border-t border-black/[0.08] pt-4">
              <p className="font-aeonik text-base font-medium text-black">
                {item.name}
              </p>
              <p className="font-montreal text-xs text-body-2">{item.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
