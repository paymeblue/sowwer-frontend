"use client";

import LogoMaskedPhoto from "@components/shared/LogoMaskedPhoto";
import SmartImage from "@components/shared/SmartImage";
import { Button } from "@components/ui/button";
import { MovingBorderButton } from "@components/ui/moving-border";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { ctaMosaic, impactStats } from "@lib/soowerContent";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { memo, useRef } from "react";
import { Heart2 } from "react-iconly";

type Props = {
  /** Lead photograph — the largest cell in the bento. */
  img: StaticImageData | string;
  alt: string;
  /** Overlay on the lead frame. Defaults to the homepage's team caption. */
  caption?: { kicker: string; title: string };
};

// Descriptions match the programme cards in components/website/home/ProgramsGrid.tsx.
const PROGRAM_LINKS = [
  {
    label: "WidowCare",
    desc: "Financial aid and welfare for widows",
    href: "/programs/widow-care",
  },
  {
    label: "The DAD Project",
    desc: "Educational sponsorships for orphans",
    href: "/programs/dad-project",
  },
  {
    label: "MissionCare",
    desc: "Welfare and healthcare for missionaries",
    href: "/programs/mission-care",
  },
  {
    label: "Partnerships",
    desc: "Alongside churches and NGOs",
    href: "/programs/partnerships",
  },
];

const TEAM_CAPTION = {
  kicker: "The team",
  title: "On the ground and behind the scenes",
};

const JoinUs = ({ img, alt, caption = TEAM_CAPTION }: Props) => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".cta-cell", ".cta-copy > *", ".cta-stat"], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Cells rise into place in reading order. No per-cell scroll drift:
      // the grid holds its gutters, which is what makes it read as composed.
      gsap.from(".cta-cell", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });

      gsap.from(".cta-copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 68%" },
      });

      gsap.from(".cta-stat", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cta-stats", start: "top 92%" },
      });

      // "The light increases as you scroll": a sunrise — a bright core low
      // in the section that grows and climbs as you scroll through, with a
      // wider ambient wash glowing in behind it. Background and text stay
      // put; this is a rising light source, not a theme change.
      const sunrise = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      sunrise
        .fromTo(
          ".cta-ray-ambient",
          { opacity: 0, scale: 0.6, yPercent: 12 },
          {
            opacity: 0.55,
            scale: 1.6,
            yPercent: -10,
            ease: "none",
            transformOrigin: "22% 100%",
          },
          0
        )
        .fromTo(
          ".cta-ray-core",
          { opacity: 0, scale: 0.4, yPercent: 18 },
          {
            opacity: 0.45,
            scale: 1.9,
            yPercent: -14,
            ease: "none",
            transformOrigin: "22% 100%",
          },
          0
        );

      return undefined;
    },
    { scope }
  );

  const isRemote = typeof img === "string";

  return (
    <section
      ref={scope}
      aria-label="Get involved with SOOWER"
      className="relative overflow-hidden bg-black py-16 md:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 70% at 8% 0%, rgba(255,198,41,0.13) 0%, transparent 62%), radial-gradient(52% 66% at 96% 100%, rgba(52,102,255,0.16) 0%, transparent 62%)",
        }}
      />
      {/* Scroll-scrubbed "sunrise" — see the GSAP block above. A bright core
          rising from the bottom edge plus a wider ambient wash beneath it,
          both below the z-20 content so text and photos stay unaffected. */}
      <div
        aria-hidden
        className="cta-ray-ambient pointer-events-none absolute inset-0 z-[4] opacity-0"
        style={{
          background:
            "radial-gradient(60% 75% at 22% 105%, rgba(255,198,41,0.85) 0%, rgba(255,150,41,0.35) 40%, transparent 72%)",
          filter: "blur(50px)",
        }}
      />
      <div
        aria-hidden
        className="cta-ray-core pointer-events-none absolute inset-0 z-[5] opacity-0"
        style={{
          background:
            "radial-gradient(28% 40% at 22% 102%, rgba(255,241,199,0.98) 0%, rgba(255,198,41,0.9) 38%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 lg:px-20">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
          <div className="cta-copy max-w-[32rem]">
            <span className="eyebrow block">Get involved</span>
            <h2 className="mt-5 font-aeonik text-[2.5rem] font-medium leading-[1.02] tracking-[-0.03em] text-white sm:text-[3.25rem] lg:text-[4rem]">
              Be the{" "}
              <em className="font-baskervville font-normal italic text-primary">
                light
              </em>{" "}
              in someone&apos;s story
            </h2>
            <p className="mt-6 font-montreal text-base leading-relaxed text-white/60 md:text-lg">
              A stipend, a school bag, a health screening. Every gift here is
              already spoken for — it goes to a widow, an orphan or a missionary
              we can name.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/donate/widow-care">
                <MovingBorderButton>
                  <span>
                    <Heart2 set="bold" size={19} />
                  </span>
                  <span>Donate now</span>
                </MovingBorderButton>
              </Link>
              <Link href="/registry/join">
                <Button
                  variant="outline"
                  className="group gap-2 border-white/20 bg-transparent font-montreal text-white hover:border-white/40 hover:bg-white/[0.06] hover:text-white"
                >
                  <span>Partner with us</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Button>
              </Link>
            </div>

            <dl className="cta-stats mt-12 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
              {impactStats.map((stat) => (
                <div key={stat.key} className="cta-stat px-4 py-6 first:pl-0">
                  <dt className="font-aeonik text-[1.75rem] font-medium leading-none tracking-[-0.02em] text-white md:text-[2.25rem]">
                    {stat.value.toLocaleString("en-US")}
                  </dt>
                  <dd className="mt-2.5 font-montreal text-[0.72rem] leading-snug text-white/[0.45] md:text-xs">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Bento on a fixed row rhythm: lead frame and a portrait on top,
              the programme index with two smaller tiles beneath. Every cell
              shares the same gutter and radius. */}
          <div className="isolate grid auto-rows-[8.5rem] grid-cols-2 gap-3 sm:auto-rows-[9.5rem] sm:grid-cols-3 lg:gap-4">
            <figure className="cta-cell group relative col-span-2 row-span-2 overflow-hidden rounded-[1.75rem] bg-white/5 ring-1 ring-inset ring-white/10">
              <SmartImage
                src={img}
                alt={alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 62vw, 36vw"
                className={`${
                  isRemote ? "photo-real" : ""
                } object-cover transition-transform ease-out [transition-duration:1200ms] group-hover:scale-[1.04]`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/[0.55] to-transparent p-6 pt-24">
                <p className="font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  {caption.kicker}
                </p>
                <p className="mt-1.5 max-w-[34ch] font-aeonik text-lg font-medium leading-tight text-white">
                  {caption.title}
                </p>
              </figcaption>
            </figure>

            <figure className="cta-cell group relative row-span-2 hidden overflow-hidden rounded-[1.75rem] bg-white/5 ring-1 ring-inset ring-white/10 sm:block">
              <SmartImage
                src={ctaMosaic[0].src}
                alt={ctaMosaic[0].alt}
                fill
                sizes="(max-width: 1024px) 31vw, 18vw"
                className="photo-real object-cover transition-transform ease-out [transition-duration:1200ms] group-hover:scale-[1.04]"
              />
            </figure>

            {/* Programme index — the one cell that is type, not photography,
                so the grid has somewhere for the eye to rest. */}
            <nav
              aria-label="Our programmes"
              className="cta-cell col-span-2 row-span-2 flex flex-col rounded-[1.75rem] bg-white/[0.04] p-6 ring-1 ring-inset ring-white/10 backdrop-blur-sm"
            >
              <p className="font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                Choose where your gift goes
              </p>
              <ul className="mt-3 flex flex-1 flex-col justify-between">
                {PROGRAM_LINKS.map((program, i) => (
                  <li key={program.href}>
                    <Link
                      href={program.href}
                      className="group flex items-center gap-4 border-b border-white/[0.07] py-2.5 transition-colors last:border-0"
                    >
                      <span className="w-6 shrink-0 font-montreal text-xs tabular-nums text-white/30">
                        0{i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-aeonik text-[0.95rem] font-medium leading-tight text-white transition-colors group-hover:text-primary">
                          {program.label}
                        </span>
                        <span className="mt-0.5 block truncate font-montreal text-xs text-white/40">
                          {program.desc}
                        </span>
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-white/[0.15] transition-all duration-300 group-hover:bg-primary group-hover:ring-primary">
                        <ArrowUpRight
                          size={14}
                          className="text-white/70 transition-colors group-hover:text-black"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <figure className="cta-cell group relative overflow-hidden rounded-[1.75rem] bg-white/5 ring-1 ring-inset ring-white/10">
              <SmartImage
                src={ctaMosaic[2].src}
                alt={ctaMosaic[2].alt}
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 18vw"
                className="photo-real object-cover transition-transform ease-out [transition-duration:1200ms] group-hover:scale-[1.04]"
              />
            </figure>

            {/* The wordmark itself, with a second face poured into it. */}
            <div className="cta-cell relative flex items-center gap-3 overflow-hidden rounded-[1.75rem] bg-white/[0.04] p-4 ring-1 ring-inset ring-white/10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 90% at 22% 50%, rgba(255,198,41,0.22) 0%, transparent 70%)",
                }}
              />
              <LogoMaskedPhoto
                photos={[ctaMosaic[5]]}
                className="relative h-full w-[42%] shrink-0"
              />
              <p className="relative font-script text-lg leading-[1.15] text-white/80">
                Perfectly positioned to lend a helping hand
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(JoinUs);
