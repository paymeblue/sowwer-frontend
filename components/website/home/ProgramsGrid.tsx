"use client";

import { Button } from "@components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { josMedia } from "@lib/soowerContent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const programs = [
  {
    key: "1",
    img: josMedia.widowReceivingParcel1,
    title: "WidowCare",
    desc: "Providing financial aid and support to help widows rebuild their lives.",
    route: "/programs/widow-care",
  },
  {
    key: "2",
    img: josMedia.crowdGroupPortrait,
    title: "The DAD Project",
    desc: "Giving orphans a future through educational sponsorships.",
    route: "/programs/dad-project",
  },
  {
    key: "3",
    img: josMedia.volunteerHandingParcel2,
    title: "MissionCare",
    desc: "Supporting missionaries with resources to spread the gospel.",
    route: "/programs/mission-care",
  },
  {
    key: "4",
    img: josMedia.crowdSeatedLarge,
    title: "Partnerships",
    desc: "Collaborating with other ministries to support their projects.",
    route: "/programs/partnerships",
  },
];

const ProgramsGrid = () => {
  const scope = useRef<HTMLElement>(null);

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
      <h3 className="text-center font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl md:leading-[3rem] lg:text-[2.8125rem]">
        Making a lasting impact
      </h3>
      <ul className="grid w-full grid-cols-1 items-center justify-center gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((item) => (
          <li
            key={item.key}
            className="program-card space-y-4 overflow-hidden rounded-3xl bg-white shadow-featured-project-card"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 pt-0 md:space-y-16">
              <div className="mb-8 space-y-1">
                <h4 className="font-aeonik text-xl font-medium leading-[1.725rem] text-black md:text-2xl">
                  {item.title}
                </h4>
                <p className="font-montreal text-sm leading-[1.3125rem] text-body-2 md:text-base">
                  {item.desc}
                </p>
              </div>
              <Link href={item.route} className="relative">
                <Button
                  variant="outline"
                  size="md"
                  className="group gap-2 border-input font-montreal text-black"
                >
                  <span>Learn more</span>
                  <span className="transition-transform duration-300 group-hover:right-4">
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
