"use client";

import { Button } from "@components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { josMedia } from "@lib/soowerContent";
import { Heart2 } from "react-iconly";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const Hero = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-line", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
      })
        .from(".hero-quote", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-cta", { y: 12, opacity: 0, duration: 0.4 }, "-=0.25");
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative min-h-[500px] w-full md:min-h-[600px] lg:h-screen 2xl:h-[49.125rem]"
    >
      <Image
        src={josMedia.heroCrowdWide}
        alt="Widows and missionaries gathered at the SOOWER Widows & Youth Conference in Jos"
        fill
        className="mx-auto aspect-auto object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
      <div className="absolute top-1/2 w-full max-w-[41.625rem] -translate-y-1/2 px-4 text-white sm:px-8 md:left-[3rem] md:space-y-6 lg:left-[6.25rem]">
        <h2 className="w-full max-w-[36.0625rem] overflow-hidden font-aeonik text-3xl font-medium leading-tight sm:text-4xl md:text-5xl md:leading-[3.5rem] lg:text-[4.0625rem] lg:leading-[3.9375rem]">
          <span className="hero-line block">
            Transforming lives with love and faith-driven support
          </span>
        </h2>
        <div className="hero-quote mb-4 w-full max-w-[34.3125rem]">
          <p className="font-baskervville text-base italic leading-normal sm:text-lg md:text-xl md:leading-[1.875rem] lg:text-[1.25rem]">
            &quot;Religion that God our Father accepts as pure and faultless is
            this: to look after orphans and widows in their distress and to keep
            oneself from being polluted by the world.&quot;
          </p>
          <span className="font-montreal text-xs leading-6 sm:text-sm">
            — James 1:27 (NIV)
          </span>
        </div>
        <Link href="/donate/widow-care" className="hero-cta inline-block">
          <div className="mt-4">
            <Button className="gap-2 border-input font-montreal text-black">
              <span>
                <Heart2 set="bold" size={19} />
              </span>
              <span>Donate now</span>
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
