"use client";

import SectionContainer from "@components/sections/SectionContainer";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { moments } from "@lib/momentsContent";
import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const Moments = () => {
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".moment-row");

      if (prefersReducedMotion()) {
        gsap.set([".moment-card", ".moment-rail"], { opacity: 1, y: 0 });
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      // The rail fills as the timeline passes the middle of the viewport —
      // scrubbed rather than tweened so it tracks the scrollbar exactly.
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 62%",
            end: "bottom 62%",
            scrub: 0.4,
          },
        }
      );

      rows.forEach((row) => {
        const enter = { trigger: row, start: "top 82%" };

        gsap.from(row.querySelector(".moment-card"), {
          y: 44,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: enter,
        });
        gsap.from(row.querySelector(".moment-rail"), {
          x: -12,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: enter,
        });
        gsap.from(row.querySelector(".moment-dot"), {
          scale: 0,
          duration: 0.45,
          ease: "back.out(2.4)",
          scrollTrigger: { trigger: row, start: "top 76%" },
        });

        // Slow vertical drift on the photograph gives the column a sense of
        // depth as it scrolls without moving the card itself.
        const media = row.querySelector(".moment-media");
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="moments"
      aria-label="Moments from 2025 and 2026"
      style={{ scrollMarginTop: "6rem" }}
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
        style={{
          background:
            "radial-gradient(50% 100% at 12% 0%, rgba(255,198,41,0.13) 0%, transparent 70%)",
        }}
      />

      <SectionContainer className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[38rem] space-y-3">
            <span className="eyebrow">On the ground</span>
            <h3 className="font-aeonik text-[2rem] font-medium leading-[1.05] tracking-[-0.02em] text-black sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Moments from 2025 &amp; 2026
            </h3>
            <p className="font-montreal text-base leading-relaxed text-body-2 md:text-lg">
              Nine outreaches, five states, one mission — in the only currency
              that matters: people reached.
            </p>
          </div>
          <p className="font-montreal text-sm text-body-2 md:text-right">
            <span className="font-aeonik text-3xl font-medium text-black">
              {moments.length}
            </span>
            <br />
            events on record
          </p>
        </div>

        <div ref={trackRef} className="relative mt-14 md:mt-20">
          {/* Rail: static hairline with a scrubbed fill on top of it. */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[7px] top-2 w-px bg-light-grey md:left-[139px]"
          >
            <span
              ref={lineRef}
              className="absolute inset-0 block origin-top bg-gradient-to-b from-primary via-primary to-accent"
            />
          </div>

          <ol className="space-y-8 md:space-y-12">
            {moments.map((moment, i) => (
              <li
                key={moment.slug}
                className="moment-row relative flex gap-6 md:gap-12"
              >
                <div className="moment-rail relative flex shrink-0 flex-col items-center pt-8 md:w-[120px] md:items-end md:pt-9">
                  <span className="moment-dot absolute left-0 top-8 z-10 h-[15px] w-[15px] rounded-full border-[3px] border-primary bg-white shadow-[0_0_0_5px_rgba(255,198,41,0.14)] md:left-auto md:right-[-26px] md:top-9" />
                  <div className="hidden text-right md:block">
                    {/* The year prints once per group so the rail reads as a
                        calendar rather than repeating "2025" eight times. */}
                    {i === 0 || moments[i - 1].year !== moment.year ? (
                      <span className="mb-1.5 block font-aeonik text-[1.75rem] font-medium leading-none tracking-[-0.01em] text-black">
                        {moment.year}
                      </span>
                    ) : null}
                    <span className="block font-montreal text-xs font-medium uppercase tracking-[0.12em] text-body-2">
                      {moment.date.replace(`, ${moment.year}`, "")}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/moments/${moment.slug}`}
                  className="moment-card group relative w-full overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_24px_60px_-20px_rgba(3,6,33,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-56 w-full shrink-0 overflow-hidden bg-secondary-black sm:h-auto sm:w-[15rem] lg:w-[19rem]">
                      {moment.hero ? (
                        <div className="moment-media absolute inset-[-8%]">
                          <Image
                            src={moment.hero}
                            alt={moment.heroAlt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 304px"
                            className="photo-real object-cover transition-transform ease-out [transition-duration:900ms] group-hover:scale-[1.06]"
                          />
                        </div>
                      ) : (
                        // No surviving photography — the date and theme carry
                        // the panel instead of a placeholder image.
                        <div className="flex h-full flex-col justify-between p-6">
                          <span className="font-montreal text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
                            {moment.kicker}
                          </span>
                          <div>
                            <span className="block font-aeonik text-[2.75rem] font-medium leading-[0.95] text-white">
                              {moment.date.split(",")[0]}
                            </span>
                            <span className="text-white/65 mt-2 block font-baskervville text-sm italic leading-snug">
                              {moment.theme}
                            </span>
                          </div>
                        </div>
                      )}
                      {moment.hero ? (
                        <span className="bg-black/45 absolute left-4 top-4 rounded-full px-2.5 py-1 font-montreal text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                          {moment.kicker}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col justify-center gap-2.5 p-6 lg:p-8">
                      <span className="font-montreal text-xs font-semibold uppercase tracking-[0.12em] text-accent md:hidden">
                        {moment.date}
                      </span>
                      <h4 className="font-aeonik text-xl font-medium leading-[1.15] tracking-[-0.01em] text-black md:text-2xl">
                        {moment.title}
                      </h4>
                      <p className="flex items-center gap-1.5 font-montreal text-xs text-body-2">
                        <MapPin size={12} className="shrink-0" />
                        {moment.location}
                      </p>
                      <p className="max-w-[46ch] font-montreal text-sm leading-[1.55] text-body-2">
                        {moment.blurb}
                      </p>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 font-montreal text-sm font-medium text-black">
                        Read the story
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Moments;
