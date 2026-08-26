"use client";

import { Button } from "@components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { heroImages } from "@lib/soowerContent";
import { Heart2 } from "react-iconly";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ROTATE_MS = 4500;

const Hero = () => {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % heroImages.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

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
        .from(".hero-cta", { y: 12, opacity: 0, duration: 0.4 }, "-=0.25");
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative min-h-[560px] w-full overflow-hidden md:min-h-[640px] lg:h-screen 2xl:h-[49.125rem]"
    >
      {heroImages.map((img, i) => (
        <div
          key={img.src}
          className="hero-slide absolute inset-0 transition-opacity ease-in-out [transition-duration:1400ms]"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            quality={90}
            className="photo-real object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="from-black/85 absolute inset-0 bg-gradient-to-t via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent md:from-black/80 md:via-black/20" />
      <div className="absolute top-1/2 w-full max-w-[42rem] -translate-y-1/2 px-4 text-white sm:px-8 md:left-[3rem] md:space-y-6 lg:left-[6.25rem]">
        <span className="hero-eyebrow eyebrow mb-3 block text-primary [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
          Sower Widows &amp; Missions Foundation
        </span>
        <h2 className="w-full max-w-[38rem] overflow-hidden font-aeonik text-4xl font-medium leading-[1.05] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.02]">
          <span className="hero-line block">Transforming lives</span>
          <span className="hero-line block">with love and faith</span>
        </h2>
        <div className="hero-quote mb-4 mt-5 w-full max-w-[34.3125rem] border-l-2 border-primary/70 pl-4">
          <p className="font-baskervville text-base italic leading-normal text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-lg md:text-xl md:leading-[1.875rem] lg:text-[1.25rem]">
            &quot;Religion that God our Father accepts as pure and faultless is
            this: to look after orphans and widows in their distress and to keep
            oneself from being polluted by the world.&quot;
          </p>
          <span className="font-montreal text-xs leading-6 text-white/70 sm:text-sm">
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
      <div className="absolute bottom-6 right-6 hidden gap-1.5 sm:flex">
        {heroImages.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-primary" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
