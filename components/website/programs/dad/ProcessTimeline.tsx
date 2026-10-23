"use client";

import LinkedNames from "@components/shared/LinkedNames";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@lib/gsap";
import { useRef, useState } from "react";

export type ProcessStep = { label: string; kind: string; body: string };

type Props = { steps: ProcessStep[] };

/**
 * Scroll-driven account of how the programme is run. A gold rail fills as the
 * reader moves down the steps; each node ignites when the rail reaches it,
 * its copy brightens from a muted state, and a sticky panel beside the list
 * flips to the current stage. Content is fully visible until GSAP takes over,
 * so a failed trigger costs the animation, never the text.
 *
 * @param {Props} props Component props.
 * @return {JSX.Element} The timeline.
 */
const ProcessTimeline = ({ steps }: Props) => {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const list = scope.current?.querySelector<HTMLElement>(".pt-list");
      if (!list) return;

      gsap.fromTo(
        ".pt-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 62%",
            end: "bottom 62%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".pt-step").forEach((step, i) => {
        const node = step.querySelector(".pt-node");
        const dot = step.querySelector(".pt-dot");
        const copy = step.querySelectorAll(".pt-copy");
        gsap.set(copy, { opacity: 0.28, x: 14 });
        gsap.set(node, { scale: 0.7 });

        const tl = gsap
          .timeline({ paused: true, defaults: { ease: "power3.out" } })
          .to(node, {
            scale: 1,
            backgroundColor: "#FFC629",
            borderColor: "#FFC629",
            duration: 0.45,
            ease: "back.out(2.4)",
          })
          .fromTo(
            dot,
            { scale: 0 },
            { scale: 1, duration: 0.35, ease: "back.out(3)" },
            "<0.1"
          )
          .to(copy, { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 }, "<");

        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          onEnter: () => {
            tl.play();
            setActive(i);
          },
          onLeaveBack: () => {
            tl.reverse();
            setActive(Math.max(0, i - 1));
          },
        });
      });
    },
    { scope, dependencies: [steps.length] }
  );

  // Flip the sticky stage label whenever the active step changes.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".pt-stage",
        { yPercent: 60, opacity: 0, filter: "blur(6px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        }
      );
    },
    { scope, dependencies: [active] }
  );

  const current = steps[active];

  return (
    <div
      ref={scope}
      className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h3 className="font-aeonik text-[1.75rem] font-medium leading-tight tracking-[-0.02em] text-black md:text-[2.25rem]">
          How the programme is run
        </h3>
        <p className="mt-4 max-w-[24rem] font-montreal text-base leading-relaxed text-body-2">
          How the first scholars were chosen, how their progress is followed,
          and what SOOWER is changing after this first cycle.
        </p>

        <div className="mt-10 hidden overflow-hidden rounded-2xl bg-secondary-black p-7 text-white lg:block">
          <div className="flex items-center justify-between font-montreal text-xs uppercase tracking-[0.16em] text-white/50">
            <span>Stage</span>
            <span className="tabular-nums">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(steps.length).padStart(2, "0")}
            </span>
          </div>
          <div className="pt-stage mt-6">
            <p className="font-montreal text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {current.kind}
            </p>
            <p className="mt-2 font-aeonik text-[2rem] font-medium leading-none tracking-[-0.02em]">
              {current.label}
            </p>
          </div>
          <div className="mt-8 flex gap-1.5">
            {steps.map((step, i) => (
              <span
                key={step.label}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                  i <= active ? "bg-primary" : "bg-white/[0.15]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <ol className="pt-list relative">
        <span
          aria-hidden
          className="absolute bottom-6 left-[0.9rem] top-6 w-px bg-black/10"
        />
        <span
          aria-hidden
          className="pt-fill absolute bottom-6 left-[0.9rem] top-6 w-px origin-top bg-primary"
        />
        {steps.map((step, i) => (
          <li
            key={step.label}
            className="pt-step relative grid grid-cols-[1.85rem_minmax(0,1fr)] gap-5 pb-14 last:pb-0 md:gap-8 md:pb-20"
          >
            <span className="pt-node relative z-10 mt-0.5 flex h-[1.85rem] w-[1.85rem] items-center justify-center rounded-full border border-black/[0.15] bg-white">
              <span className="pt-dot h-2 w-2 rounded-full bg-black" />
            </span>
            <div>
              <div className="pt-copy flex flex-wrap items-center gap-3">
                <span className="font-montreal text-xs tabular-nums text-black/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-aeonik text-xl font-medium tracking-[-0.01em] text-black md:text-[1.4rem]">
                  {step.label}
                </h4>
                <span className="rounded-full bg-black/[0.05] px-2.5 py-0.5 font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-body-2">
                  {step.kind}
                </span>
              </div>
              <p className="pt-copy mt-3 max-w-[38rem] font-montreal text-[0.95rem] leading-relaxed text-body-1 md:text-base">
                <LinkedNames text={step.body} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProcessTimeline;
