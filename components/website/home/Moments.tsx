"use client";

import SectionContainer from "@components/sections/SectionContainer";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { moments } from "@lib/soowerContent";
import { cn } from "@lib/cn";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useRef } from "react";

const Moments = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".moment-card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      aria-label="Moments from 2025"
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-20"
    >
      <SectionContainer>
        <div className="mx-auto max-w-[41.625rem] space-y-3 text-center">
          <h3 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl lg:text-[2.8125rem]">
            Moments from 2025
          </h3>
          <p className="font-montreal text-base text-body-2 md:text-lg">
            A year on the ground with widows, missionaries and displaced
            families — in the only currency that matters: people reached.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moments.map((moment) => (
            <li
              key={moment.key}
              className={cn(
                "moment-card overflow-hidden rounded-3xl border border-light-grey bg-white shadow-featured-project-card",
                moment.image && "sm:col-span-2 lg:col-span-2"
              )}
            >
              {moment.image ? (
                <div className="relative h-56 w-full sm:h-72">
                  <Image
                    src={moment.image}
                    alt={moment.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-32 w-full flex-col items-center justify-center bg-secondary-black text-white">
                  <span className="font-aeonik text-lg font-medium">
                    {moment.date}
                  </span>
                </div>
              )}
              <div className="space-y-2 p-6">
                <span className="font-montreal text-xs font-medium uppercase tracking-wide text-accent">
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
            </li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
};

export default Moments;
