"use client";

import SectionContainer from "@components/sections/SectionContainer";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { impactStats } from "@lib/soowerContent";
import { useRef } from "react";

const formatValue = (value: number, decimals = 0) =>
  decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("en-US");

const ImpactStats = () => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stat-card");

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(cards, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 80%",
        },
      });

      cards.forEach((card) => {
        const numEl = card.querySelector<HTMLElement>(".stat-value");
        if (!numEl) return;
        const target = Number(numEl.dataset.value);
        const decimals = Number(numEl.dataset.decimals || 0);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            numEl.textContent = formatValue(counter.value, decimals);
          },
        });
      });
    },
    { scope }
  );

  return (
    <section
      aria-label="Our impact in 2025"
      className="bg-secondary-black px-4 py-12 sm:px-6 sm:py-16 md:py-20"
    >
      <SectionContainer>
        <div
          ref={scope}
          className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4"
        >
          {impactStats.map((stat) => (
            <div key={stat.key} className="stat-card text-center text-white">
              <p className="font-aeonik text-3xl font-medium leading-tight text-primary sm:text-4xl lg:text-[2.75rem]">
                {stat.prefix}
                <span
                  className="stat-value"
                  data-value={stat.value}
                  data-decimals={"decimals" in stat ? stat.decimals : 0}
                >
                  {formatValue(
                    stat.value,
                    "decimals" in stat ? stat.decimals : 0
                  )}
                </span>
                {stat.suffix}
              </p>
              <p className="mt-2 font-montreal text-xs leading-snug text-white/70 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default ImpactStats;
