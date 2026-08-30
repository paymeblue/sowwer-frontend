"use client";

import { Button } from "@components/ui/button";
import { useGSAP } from "@gsap/react";
import { useOutsideClick } from "@hooks/use-outside-click";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { programDecks } from "@lib/soowerContent";
import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type Program = {
  key: string;
  title: string;
  desc: string;
  content: string;
  route: string;
  image: { src: string; alt: string };
};

// Each card leads with a single fixed photo — no more scroll-driven
// crossfade through the whole deck, just the strongest frame from it.
const programs: Program[] = [
  {
    key: "1",
    title: "WidowCare",
    desc: "Financial aid and welfare support to help widows rebuild their lives.",
    content:
      "Losing a spouse can leave a woman vulnerable, but no widow should have to struggle alone. Our WidowCare program provides financial relief, vocational training, and emotional support to help women regain stability and rebuild their lives with dignity.",
    route: "/programs/widow-care",
    image: programDecks["widow-care"][0],
  },
  {
    key: "2",
    title: "The DAD Project",
    desc: "Educational sponsorships giving orphans a future.",
    content:
      "Every child deserves the opportunity to learn, grow, and dream. The Donate A Dream (DAD) Project is dedicated to providing full or partial educational sponsorships for orphans, ensuring they have access to quality education and the chance for a brighter future. Whether through full adoption or pooled donations, every contribution helps shape a child's destiny.",
    route: "/programs/dad-project",
    image: programDecks["dad-project"][0],
  },
  {
    key: "3",
    title: "MissionCare",
    desc: "Welfare, healthcare and training for missionaries in the field.",
    content:
      "Through MissionCare, we equip and sustain missionaries who dedicate their lives to spreading the Gospel in underserved communities. We provide them with financial aid, essential supplies, and spiritual encouragement, ensuring they can continue their mission with strength and purpose.",
    route: "/programs/mission-care",
    image: programDecks["mission-care"][0],
  },
  {
    key: "4",
    title: "Partnerships",
    desc: "Working alongside churches and NGOs to extend our reach.",
    content:
      "At Soower, we believe in the power of collaboration to create lasting change. Through our Partnerships Program, we work alongside ministries that are making a difference — helping them secure the resources they need to continue their mission.",
    route: "/programs/partnerships",
    image: programDecks.partnerships[0],
  },
];

const ProgramsGrid = () => {
  const scope = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Program | null>(null);
  const id = useId();

  useOutsideClick(modalRef, () => setActive(null));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

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
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="flex w-full flex-col items-center
      justify-center gap-8 bg-[#FCF9F2] px-4 py-12 sm:p-8 md:gap-12 md:p-12 lg:p-[6.25rem] lg:pt-16"
    >
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[36rem] space-y-3">
          <span className="eyebrow">Our programs</span>
          <h3 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl md:leading-[3rem] lg:text-[2.8125rem]">
            Making a lasting impact
          </h3>
          <p className="font-montreal text-base leading-relaxed text-body-2 md:text-lg">
            Four ways to give, each already reaching a widow, an orphan or a
            missionary by name.
          </p>
        </div>
        <p className="font-montreal text-sm text-body-2 md:text-right">
          <span className="font-aeonik text-3xl font-medium text-black">
            {programs.length}
          </span>
          <br />
          programs running
        </p>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] h-full w-full bg-black/40 backdrop-blur-sm"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <motion.button
              key={`close-${active.key}-${id}`}
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform hover:scale-105"
            >
              <X size={16} />
            </motion.button>
            <motion.div
              layoutId={`card-${active.key}-${id}`}
              ref={modalRef}
              className="flex h-full w-full max-w-lg flex-col overflow-hidden bg-white sm:h-fit sm:max-h-[85vh] sm:rounded-3xl"
            >
              <motion.div
                layoutId={`image-${active.key}-${id}`}
                className="relative h-72 w-full shrink-0 sm:h-80"
              >
                <Image
                  src={active.image.src}
                  alt={active.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 32rem"
                  className="photo-real object-cover"
                />
              </motion.div>
              <div className="flex flex-1 flex-col overflow-y-auto p-6">
                <motion.h3
                  layoutId={`title-${active.key}-${id}`}
                  className="font-aeonik text-2xl font-medium text-black"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`desc-${active.key}-${id}`}
                  className="mt-1 font-montreal text-base text-body-2"
                >
                  {active.desc}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  exit={{ opacity: 0 }}
                  className="mt-4 font-montreal text-sm leading-relaxed text-body-2 md:text-base"
                >
                  {active.content}
                </motion.p>
                <Link href={active.route} className="mt-6 w-fit">
                  <Button size="md" className="group gap-2 font-montreal">
                    <span>Learn more</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="grid w-full grid-cols-1 items-stretch justify-center gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((item) => (
          <motion.li
            layoutId={`card-${item.key}-${id}`}
            key={item.key}
            onClick={() => setActive(item)}
            className="program-card group cursor-pointer overflow-hidden rounded-3xl border border-black/5 bg-white transition-shadow duration-300 hover:shadow-featured-project-card"
          >
            <motion.div
              layoutId={`image-${item.key}-${id}`}
              className="relative aspect-square w-full"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={82}
                loading="lazy"
                className="photo-real object-cover"
              />
            </motion.div>
            <div className="flex flex-col gap-4 p-6">
              <div className="space-y-1">
                <motion.h4
                  layoutId={`title-${item.key}-${id}`}
                  className="font-aeonik text-xl font-medium leading-[1.725rem] text-black md:text-2xl"
                >
                  {item.title}
                </motion.h4>
                <motion.p
                  layoutId={`desc-${item.key}-${id}`}
                  className="font-montreal text-sm leading-[1.3125rem] text-body-2 md:text-base"
                >
                  {item.desc}
                </motion.p>
              </div>
              <Button
                variant="outline"
                size="md"
                className="group/btn w-fit gap-2 border-input font-montreal text-black"
              >
                <span>Learn more</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Button>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProgramsGrid;
