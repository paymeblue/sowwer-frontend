"use client";

import { HeroParallax } from "@components/ui/hero-parallax";
import { MovingBorderButton } from "@components/ui/moving-border";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { heroLoops, heroParallaxPhotos } from "@lib/soowerContent";
import { BookOpen } from "lucide-react";
import { Heart2 } from "react-iconly";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SCRIPTURE = {
  lead: "R",
  rest: "eligion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world.",
  reference: "James 1:27",
  version: "NIV",
};

const Hero = () => {
  const scope = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loopIndex, setLoopIndex] = useState(0);

  // Autoplay whenever the source changes — covers first mount and every clip
  // swap, since changing `src` doesn't resume playback on its own.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    videoRef.current?.play().catch(() => {});
  }, [loopIndex]);

  const currentLoop = heroLoops[loopIndex];
  const advanceLoop = () => setLoopIndex((i) => (i + 1) % heroLoops.length);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.5 })
        .from(
          ".hero-line",
          { y: 32, opacity: 0, duration: 0.8, stagger: 0.12 },
          "-=0.25"
        )
        .from(".hero-quote", { y: 16, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".hero-cta", { y: 12, opacity: 0, duration: 0.4 }, "-=0.25")
        .from(
          ".hero-loop",
          { scale: 0.85, opacity: 0, duration: 0.7, ease: "back.out(1.6)" },
          "-=0.5"
        );
    },
    { scope }
  );

  return (
    <div ref={scope}>
      <HeroParallax
        photos={heroParallaxPhotos}
        header={
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-20">
            {/* Opaque card behind the copy — legibility can't depend on how
                the photo wall happens to be tilted/positioned underneath it
                at a given scroll offset. */}
            <div className="flex flex-col items-start gap-10 rounded-[2rem] bg-[#FCF9F2]/95 p-6 shadow-[0_24px_60px_-24px_rgba(3,6,33,0.18)] backdrop-blur-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="w-full max-w-[38rem]">
                <span className="hero-eyebrow eyebrow mb-3 block text-primary">
                  Sower Widows &amp; Missions Foundation
                </span>
                <h1 className="font-aeonik text-4xl font-medium leading-[1.05] text-black sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.02]">
                  <span className="hero-line block">Transforming lives</span>
                  <span className="hero-line block">with love and faith</span>
                </h1>
                {/* Set like a page from the Book itself: an illuminated
                    drop-cap opening the verse, and a citation styled as a
                    printed reference rather than a plain caption. */}
                <div className="hero-quote relative mb-4 mt-5 w-full max-w-[34.3125rem] rounded-2xl border border-primary/25 bg-white/40 py-5 pl-6 pr-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <BookOpen
                    aria-hidden
                    className="absolute -left-3 -top-3 rounded-full bg-primary p-1.5 text-black shadow-[0_4px_14px_-4px_rgba(255,198,41,0.6)]"
                    size={26}
                  />
                  <p className="font-baskervville text-base italic leading-normal text-body-1 sm:text-lg md:text-xl md:leading-[1.875rem] lg:text-[1.25rem]">
                    <span className="float-left mr-1.5 font-aeonik text-[2.75rem] not-italic leading-[0.8] text-primary sm:text-[3.25rem]">
                      {SCRIPTURE.lead}
                    </span>
                    {SCRIPTURE.rest}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span aria-hidden className="h-px w-6 bg-primary/50" />
                    <span className="font-aeonik text-xs font-medium uppercase tracking-[0.14em] text-primary sm:text-sm">
                      {SCRIPTURE.reference}
                    </span>
                    <span className="font-montreal text-xs text-body-2 sm:text-sm">
                      {SCRIPTURE.version}
                    </span>
                  </div>
                </div>
                <Link
                  href="/donate/widow-care"
                  className="hero-cta inline-block"
                >
                  <div className="mt-4">
                    <MovingBorderButton>
                      <span>
                        <Heart2 set="bold" size={19} />
                      </span>
                      <span>Donate now</span>
                    </MovingBorderButton>
                  </div>
                </Link>
              </div>
            </div>

            {/* Real, silent footage cropped into the SOOWER mark — sized up
                and pulled outside the card so it physically breaks over the
                boundary onto the photo wall below, rather than sitting as a
                small icon fully contained inside the card. z-20 keeps it
                painting above both the card and the grid rows beneath it. */}
            <div className="hero-loop mask-soower absolute -bottom-24 right-6 z-20 hidden h-64 w-64 overflow-hidden shadow-[0_30px_70px_-16px_rgba(0,0,0,0.45)] lg:right-10 lg:block xl:-bottom-28 xl:h-80 xl:w-80">
              <video
                ref={videoRef}
                src={currentLoop.src}
                poster={currentLoop.poster}
                aria-label={currentLoop.alt}
                muted
                playsInline
                preload="metadata"
                onEnded={advanceLoop}
                className="video-real h-full w-full object-cover"
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Hero;
