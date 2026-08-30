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
      className="relative overflow-hidden bg-[#FCF9F2] px-4 py-14 sm:px-6 sm:py-20 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 15% 0%, rgba(255,198,41,0.10) 0%, transparent 60%), radial-gradient(50% 50% at 100% 100%, rgba(52,102,255,0.08) 0%, transparent 60%)",
        }}
      />
      <SectionContainer className="relative">
        <span className="eyebrow mb-8 block text-center sm:mb-10">Impact</span>
        <div
          ref={scope}
          className="mx-auto grid w-full max-w-[900px] grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-black/10"
        >
          {impactStats.map((stat) => (
            <div key={stat.key} className="stat-card px-2 text-center lg:px-6">
              <p className="font-aeonik text-4xl font-medium leading-none text-black sm:text-5xl lg:text-[3.25rem]">
                {stat.prefix}
                <span
                  className="stat-value"
                  data-value={stat.value}
                  data-decimals={0}
                >
                  {formatValue(stat.value, 0)}
                </span>
                {stat.suffix}
              </p>
              <p className="mx-auto mt-3 max-w-[10rem] font-montreal text-xs leading-snug text-body-2 sm:text-sm">
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
