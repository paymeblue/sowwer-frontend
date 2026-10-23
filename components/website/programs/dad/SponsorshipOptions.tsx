"use client";

import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@lib/gsap";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// What a DAD scholarship provides, as listed in SOOWER Newsletter Vol 2
// Issue 3 (September 2026), page 7.
const COVERS = [
  "Tuition",
  "Uniforms",
  "Textbooks",
  "Stationery",
  "Meals four times a week",
  "Sanitary care for female scholars",
];

const OPTIONS = [
  {
    key: "full",
    name: "Full sponsorship",
    tagline:
      "Commit to changing one child's future by covering their education completely.",
    points: [
      "Fully fund a child's school fees for a term or an entire school year.",
      "Receive periodic updates on the child's academic progress and well-being.",
      "Pay per term or per session, or set up auto-renewal.",
    ],
    dark: true,
  },
  {
    key: "partial",
    name: "Partial sponsorship",
    tagline: "Contribute any amount to our general education fund for orphans.",
    points: [
      "Your donation is pooled with others to support several children at once.",
      "Helps cover tuition, uniforms, school supplies and other essential costs.",
      "No fixed amount: give what you can, when you can.",
    ],
    dark: false,
  },
];

/**
 * The DAD Project's two ways to give, side by side: a dark "full" card that
 * carries what a scholarship covers, and a light "partial" card.
 *
 * @return {JSX.Element} The sponsorship options section body.
 */
const SponsorshipOptions = () => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      revealOnScroll(".sp-head > *", {
        trigger: scope.current,
        stagger: 0.08,
      });
      revealOnScroll(".sp-card", {
        trigger: ".sp-grid",
        y: 50,
        stagger: 0.12,
        duration: 0.9,
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="mx-auto w-full max-w-[1200px]">
      <div className="sp-head mx-auto max-w-[44rem] text-center">
        <span className="block font-montreal text-xs font-semibold uppercase tracking-[0.2em] text-[#A67C00]">
          Ways to give
        </span>
        <h2 className="mt-4 font-aeonik text-[2.1rem] font-medium leading-[1.05] tracking-[-0.03em] text-black md:text-5xl">
          Sponsor a child the way that{" "}
          <em className="font-baskervville font-normal italic text-[#C9960C]">
            works
          </em>{" "}
          for you
        </h2>
        <p className="mx-auto mt-5 max-w-[36rem] font-montreal text-base leading-relaxed text-body-2 md:text-lg">
          Carry one child&apos;s education from term to term, or add to the fund
          that keeps many children in class. Both go to orphans we can name.
        </p>
      </div>

      <div className="sp-grid mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
        {OPTIONS.map((option) => (
          <article
            key={option.key}
            className={`sp-card relative flex flex-col overflow-hidden rounded-[2rem] p-8 md:p-10 ${
              option.dark
                ? "bg-secondary-black text-white"
                : "bg-white text-black ring-1 ring-black/[0.07]"
            }`}
          >
            {option.dark ? (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 55% at 100% 0%, rgba(255,198,41,0.24) 0%, transparent 70%)",
                }}
              />
            ) : null}

            <div className="relative flex flex-1 flex-col">
              <span
                className={`w-fit rounded-full px-3 py-1 font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${
                  option.dark
                    ? "bg-primary text-black"
                    : "bg-black/[0.05] text-body-1"
                }`}
              >
                {option.dark ? "One child, fully" : "Any amount"}
              </span>
              <h3 className="mt-6 font-aeonik text-[1.9rem] font-medium leading-tight tracking-[-0.02em]">
                {option.name}
              </h3>
              <p
                className={`mt-3 font-montreal text-base leading-relaxed ${
                  option.dark ? "text-white/70" : "text-body-2"
                }`}
              >
                {option.tagline}
              </p>

              <ul className="mt-8 space-y-3.5">
                {option.points.map((point) => (
                  <li
                    key={point}
                    className={`flex items-start gap-3 font-montreal text-[0.95rem] leading-snug ${
                      option.dark ? "text-white/85" : "text-body-1"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        option.dark ? "bg-primary/20" : "bg-primary/[0.35]"
                      }`}
                    >
                      <Check
                        size={12}
                        strokeWidth={3}
                        className={option.dark ? "text-primary" : "text-black"}
                      />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              {option.dark ? (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-white/45 font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                    A DAD scholarship covers
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {COVERS.map((item) => (
                      <li
                        key={item}
                        className="text-white/85 rounded-full bg-white/[0.08] px-3 py-1.5 font-montreal text-xs ring-1 ring-inset ring-white/10"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-auto pt-9">
                <Link
                  href="/donate/dad-project"
                  className={`group inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 font-montreal text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5 ${
                    option.dark
                      ? "bg-primary text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {option.dark ? "Sponsor a scholar" : "Give any amount"}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SponsorshipOptions;
