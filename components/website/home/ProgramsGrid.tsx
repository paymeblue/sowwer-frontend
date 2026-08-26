"use client";

import { Button } from "@components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { dadProjectPhotos, eventPhotos, josMedia } from "@lib/soowerContent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const programs = [
  {
    key: "1",
    img: josMedia.widowReceivingParcel1,
    title: "WidowCare",
    desc: "Financial aid and welfare support to help widows rebuild their lives.",
    route: "/programs/widow-care",
  },
  {
    key: "2",
    img: dadProjectPhotos[1].src,
    title: "The DAD Project",
    desc: "Educational sponsorships giving orphans a future.",
    route: "/programs/dad-project",
  },
  {
    key: "3",
    img: eventPhotos.missionCareScreening,
    title: "MissionCare",
    desc: "Welfare, healthcare and training for missionaries in the field.",
    route: "/programs/mission-care",
  },
  {
    key: "4",
    img: eventPhotos.slumToSchoolCelebration,
    title: "Partnerships",
    desc: "Working alongside churches and NGOs to extend our reach.",
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
      <div className="max-w-[36rem] space-y-3 text-center">
        <span className="eyebrow">Our programs</span>
        <h3 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl md:leading-[3rem] lg:text-[2.8125rem]">
          Making a lasting impact
        </h3>
      </div>
      <ul className="grid w-full grid-cols-1 items-stretch justify-center gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((item) => (
          <li
            key={item.key}
            className="program-card group overflow-hidden rounded-3xl border border-black/5 bg-white transition-shadow duration-300 hover:shadow-featured-project-card"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="photo-real object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
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
