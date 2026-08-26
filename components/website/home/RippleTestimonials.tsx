"use client";

import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { testimonials } from "@lib/soowerContent";
import { Quote } from "lucide-react";
import Image from "next/image";
import bigSpiral from "public/assets/images/circular_dotted_lines.svg";
import { useRef } from "react";

const RippleTestimonials = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".testimonial-card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative my-8 flex items-center justify-center px-4 md:my-12 md:px-0"
      aria-label="Ripple Effect of Giving"
    >
      <Image
        src={bigSpiral}
        alt="Background spiral"
        width={927}
        height={927}
        className="-z-10 hidden object-cover md:block lg:object-contain"
      />
      <div className="p-4 sm:p-6 md:absolute md:top-1/2 md:-translate-y-1/2 md:p-[100px]">
        <div className="flex w-full max-w-[799px] flex-col space-y-3">
          <span className="eyebrow text-center md:text-left">
            In their words
          </span>
          <h2 className="text-center font-aeonik text-xl leading-tight text-black sm:text-2xl md:text-left md:text-[1.8rem] md:leading-[2.2rem] lg:text-[45px] lg:leading-[3rem]">
            The Ripple Effect of Giving
          </h2>
          <p className="text-center font-montreal text-base text-body-2 md:text-left md:text-lg">
            When you give with a generous heart, your act of kindness creates a
            ripple effect of love and positivity that extends far beyond the
            initial gift. Real words from the widows and missionaries SOOWER
            supports:
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:gap-10 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.key}
              className="testimonial-card flex w-full flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 transition-shadow duration-300 hover:shadow-featured-project-card"
            >
              <Quote className="text-primary" size={28} />
              <p className="font-baskervville text-base italic leading-relaxed text-black">
                &quot;{item.quote}&quot;
              </p>
              <div>
                <p className="font-aeonik text-sm font-medium text-black">
                  {item.name}
                </p>
                <p className="font-montreal text-xs text-body-2">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RippleTestimonials;
