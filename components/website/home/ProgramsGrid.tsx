"use client";

import { Button } from "@components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { programDecks } from "@lib/soowerContent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const programs = [
  {
    key: "1",
    deck: programDecks["widow-care"],
    title: "WidowCare",
    desc: "Financial aid and welfare support to help widows rebuild their lives.",
    route: "/programs/widow-care",
  },
  {
    key: "2",
    deck: programDecks["dad-project"],
    title: "The DAD Project",
    desc: "Educational sponsorships giving orphans a future.",
    route: "/programs/dad-project",
  },
  {
    key: "3",
    deck: programDecks["mission-care"],
    title: "MissionCare",
    desc: "Welfare, healthcare and training for missionaries in the field.",
    route: "/programs/mission-care",
  },
  {
    key: "4",
    deck: programDecks.partnerships,
    title: "Partnerships",
    desc: "Working alongside churches and NGOs to extend our reach.",
    route: "/programs/partnerships",
  },
];

// One card's worth of stacked photos. All four cards share a single scroll
// range (see ProgramsGrid below) so they deal through their decks in sync as
// the section scrolls, rather than each card running its own timer.
const CardDeck = ({
  deck,
  step,
}: {
  deck: (typeof programs)[number]["deck"];
  step: number;
}) => {
  const active = step % deck.length;

  return (
    <div className="relative aspect-square w-full overflow-hidden">
      {deck.map((photo, i) => {
        // Distance behind the front card, wrapping — only the front two or
        // three are ever visible, everything else sits fully transparent
        // underneath so the browser isn't fighting a huge paint stack.
        const depth = (i - active + deck.length) % deck.length;
        const isLead = depth === 0;
        const clamped = Math.min(depth, 2);
        return (
          <div
            key={photo.src}
            aria-hidden={!isLead}
            className="absolute inset-0 transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              transform: `scale(${1 - clamped * 0.06}) translateY(${
                clamped * 10
              }px)`,
              opacity: depth >= 2 ? 0 : 1,
              zIndex: deck.length - depth,
            }}
          >
            <Image
              src={photo.src}
              alt={isLead ? photo.alt : ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={isLead ? 82 : 60}
              loading={isLead && i === 0 ? undefined : "lazy"}
              fetchPriority={isLead && i === 0 ? "high" : "low"}
              className="photo-real object-cover"
            />
          </div>
        );
      })}
      {/* Corner index so the deck-of-cards read is legible even for anyone
          not paying attention to the crossfade itself. */}
      <div className="pointer-events-none absolute right-3 top-3 z-30 flex gap-1">
        {deck.map((photo, i) => (
          <span
            key={photo.src}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === active ? "w-4 bg-white" : "w-1 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProgramsGrid = () => {
  const scope = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const [step, setStep] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".program-card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
      });

      // Deal the deck as the grid scrolls through the viewport — six steps
      // gives every card at least one full lap through its photos.
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: railRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 0.4,
            onUpdate: (self) => {
              setStep(Math.floor(self.progress * 6));
            },
          },
        }
      );
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="flex w-full flex-col items-center
      justify-center gap-8 bg-[#FCF9F2] px-4 py-12 sm:p-8 md:gap-12 md:p-12 lg:p-[6.25rem] lg:pt-16"
    >
      <div className="max-w-[36rem] space-y-3 text-center">
        <span className="eyebrow">Our programs</span>
        <h3 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl md:leading-[3rem] lg:text-[2.8125rem]">
          Making a lasting impact
        </h3>
      </div>
      <ul
        ref={railRef}
        className="grid w-full grid-cols-1 items-stretch justify-center gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {programs.map((item) => (
          <li
            key={item.key}
            className="program-card group overflow-hidden rounded-3xl border border-black/5 bg-white transition-shadow duration-300 hover:shadow-featured-project-card"
          >
            <CardDeck deck={item.deck} step={step} />
            <div className="flex flex-col gap-4 p-6">
              <div className="space-y-1">
                <h4 className="font-aeonik text-xl font-medium leading-[1.725rem] text-black md:text-2xl">
                  {item.title}
                </h4>
                <p className="font-montreal text-sm leading-[1.3125rem] text-body-2 md:text-base">
                  {item.desc}
                </p>
              </div>
              <Link href={item.route} className="relative mt-auto">
                <Button
                  variant="outline"
                  size="md"
                  className="group/btn gap-2 border-input font-montreal text-black"
                >
                  <span>Learn more</span>
                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                    <ArrowRight size={14} />
                  </span>
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProgramsGrid;
