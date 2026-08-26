"use client";

import SectionContainer from "@components/sections/SectionContainer";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { moments } from "@lib/soowerContent";
import { MapPin } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Moments = () => {
  const scope = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      setTrackHeight(listRef.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, trackHeight]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".moment-row").forEach((row) => {
        gsap.from(row.querySelector(".moment-card"), {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 82%" },
        });
        gsap.from(row.querySelector(".moment-dot"), {
          scale: 0,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: { trigger: row, start: "top 75%" },
        });
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      aria-label="Moments from 2025 and 2026"
      className="bg-white py-12 sm:py-16 md:py-20"
    >
      <SectionContainer>
        <div className="max-w-[36rem] space-y-3">
          <span className="eyebrow">On the ground</span>
          <h3 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl lg:text-[2.8125rem]">
            Moments from 2025 &amp; 2026
          </h3>
          <p className="font-montreal text-base text-body-2 md:text-lg">
            Eight outreaches, five states, one mission — in the only currency
            that matters: people reached.
          </p>
        </div>

        <div ref={trackRef} className="relative mt-14">
          <div
            className="absolute left-[15px] top-0 w-px bg-light-grey md:left-[123px]"
            style={{ height: trackHeight }}
          />
          <motion.div
            className="absolute left-[15px] top-0 w-px bg-primary md:left-[123px]"
            style={{ height: lineHeight, opacity: lineOpacity }}
          />

          <div ref={listRef}>
            {moments.map((moment) => (
              <div
                key={moment.key}
                className="moment-row relative flex gap-6 pb-14 last:pb-0 md:gap-10"
              >
                <div className="relative flex shrink-0 flex-col items-center md:w-[110px] md:items-start">
                  <span className="moment-dot z-10 mt-1.5 h-[9px] w-[9px] shrink-0 rounded-full border-2 border-primary bg-white" />
                  <span className="mt-2 hidden font-montreal text-xs font-semibold uppercase tracking-[0.1em] text-body-2 md:block">
                    {moment.date}
                  </span>
                </div>

                <div className="moment-card w-full overflow-hidden rounded-3xl border border-light-grey bg-white shadow-featured-project-card">
                  <div className="flex flex-col sm:flex-row">
                    {moment.image ? (
                      <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-64">
                        <Image
                          src={moment.image}
                          alt={moment.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 256px"
                          className="photo-real object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-48 w-full shrink-0 flex-col items-center justify-center bg-secondary-black px-4 text-center text-white sm:h-auto sm:w-64">
                        <span className="font-aeonik text-2xl font-medium">
                          {moment.date}
                        </span>
                        <span className="mt-1 font-montreal text-xs text-white/60">
                          {moment.location}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-center gap-2 p-6">
                      <span className="font-montreal text-xs font-semibold uppercase tracking-[0.1em] text-accent md:hidden">
                        {moment.date}
                      </span>
                      <h4 className="font-aeonik text-xl font-medium leading-tight text-black">
                        {moment.title}
                      </h4>
                      <p className="flex items-center gap-1 font-montreal text-xs text-body-2">
                        <MapPin size={12} />
                        {moment.location}
                      </p>
                      <p className="font-montreal text-sm leading-[1.3125rem] text-body-2">
                        {moment.blurb}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Moments;
