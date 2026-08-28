"use client";

import { InfiniteMovingCards } from "@components/ui/infinite-moving-cards";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { testimonials } from "@lib/soowerContent";
import { useRef } from "react";

const movingCards = testimonials.map((item) => ({
  quote: item.quote,
  name: item.name,
  title: `${item.location} — ${item.source}`,
}));

const RippleTestimonials = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".rt-heading > *", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 78%" },
      });

      gsap.from(".rt-marquee", {
        y: 34,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".rt-marquee", start: "top 85%" },
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-white py-16 md:py-24"
      aria-label="Ripple Effect of Giving"
    >
      <div className="mx-auto w-full max-w-[2000px] px-6 lg:px-20">
        <div className="rt-heading flex w-full max-w-[46rem] flex-col space-y-3">
          <span className="eyebrow">In their words</span>
          <h2 className="font-aeonik text-[2rem] font-medium leading-[1.05] tracking-[-0.02em] text-black sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            The Ripple Effect of Giving
          </h2>
          <p className="font-montreal text-base leading-relaxed text-body-2 md:text-lg">
            When you give with a generous heart, your act of kindness creates a
            ripple that extends far beyond the initial gift. Real words from the
            widows and missionaries SOOWER supports.
          </p>
        </div>
      </div>

      <div className="rt-marquee mt-14 md:mt-20">
        <InfiniteMovingCards
          items={movingCards}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
};

export default RippleTestimonials;
