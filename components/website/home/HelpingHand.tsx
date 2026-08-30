"use client";

import { Button } from "@components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import BrandPhoto from "@components/shared/BrandPhoto";
import { whoWeArePhotos } from "@lib/soowerContent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import spiral from "public/images/spiral.png";
import { useRef } from "react";

const HelpingHand = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
        defaults: { ease: "power2.out", duration: 0.6 },
      });
      tl.from(".helping-hand-img", { x: -40, opacity: 0 })
        .from(
          ".helping-hand-badge",
          { y: 16, opacity: 0, duration: 0.4 },
          "-=0.2"
        )
        .from(".helping-hand-copy", { x: 40, opacity: 0 }, "-=0.5");
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="flex w-full flex-col items-center justify-center gap-16 px-4 py-12 pb-20 sm:gap-16 sm:p-8 sm:pb-20 md:p-12 md:pb-24 lg:flex-row lg:gap-24 lg:p-[6.25rem]"
    >
      <div className="helping-hand-img relative w-full max-w-[420px] lg:max-w-[31rem]">
        <BrandPhoto
          photos={whoWeArePhotos}
          className="aspect-[4/5] w-full lg:aspect-square"
          sizes="(max-width: 1024px) 90vw, 45vw"
        />
        <Image
          src={spiral}
          alt=""
          height={98.09}
          width={98.09}
          className="absolute -bottom-5 -right-5 z-[-1] h-16 w-16 md:-bottom-10 md:-right-10 md:h-auto md:w-auto"
        />
        <div className="helping-hand-badge absolute -bottom-10 left-0 z-10 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-featured-project-card">
          <span className="font-aeonik text-2xl font-medium text-primary sm:text-3xl">
            8
          </span>
          <span className="max-w-[6.5rem] font-montreal text-xs leading-snug text-body-2">
            years of uninterrupted monthly support
          </span>
        </div>
      </div>
      <div className="helping-hand-copy w-full max-w-[41.625rem]">
        {/* The newsletter pairs a small caps label with a big brush-script
            line above every masthead ("From the Chairman's Desk") — borrowing
            that pairing here for the same handwritten warmth. */}
        <span className="eyebrow">Who we are</span>
        <p
          aria-hidden
          className="mt-1 font-script text-4xl leading-none text-primary sm:text-5xl"
        >
          Straight from the heart
        </p>
        <h2 className="header mt-3 w-full max-w-[38.5625rem] text-2xl font-medium sm:text-3xl md:text-4xl lg:text-[2.8125rem]">
          Perfectly positioned to lend a helping hand
        </h2>
        <p className="my-6 font-montreal text-base leading-7 md:text-lg md:leading-8">
          SOOWER is a nonprofit Christian organization dedicated to making a
          significant difference in the lives of orphans, widows and
          missionaries. We believe that we are all called to be a beacon of hope
          and compassion in the world. Our mission is to foster a network of
          compassion and generosity that empowers these vulnerable groups,
          providing them with the resources and support they often need to
          survive and, sometimes, to thrive. Together, we can be the hands and
          feet of Christ, spreading love, kindness, and assistance to those who
          require it most.
        </p>
        <Link href="/about-us">
          <Button
            variant="outline"
            className="group gap-2 border-input font-montreal text-black"
          >
            <span>Learn more</span>
            <span className="transition-transform duration-300 group-hover:right-4">
              <ArrowRight size={14} />
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HelpingHand;
