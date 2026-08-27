"use client";

import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { testimonials } from "@lib/soowerContent";
import { Quote } from "lucide-react";
import { useRef } from "react";

// Featured quote — the strongest single line, pulled out as the section's
// opening statement rather than buried at card size.
const FEATURED_KEY = "bello";

const RippleTestimonials = () => {
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const featured = testimonials.find((t) => t.key === FEATURED_KEY)!;
  const rest = testimonials.filter((t) => t.key !== FEATURED_KEY);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".rt-heading > *", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 78%" },
      });

      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const cards = gsap.utils.toArray<HTMLElement>(".rt-card");

      // Horizontal scroll rail: the section pins while the track translates
      // left, driven entirely by scrub — never a one-shot .from(), so there
      // is no state for a missed trigger to get stuck in.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const distance = () => track.scrollWidth - pin.clientWidth;

        const scrollTween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: () =>
              `+=${Math.max(distance(), 1) + window.innerHeight * 0.3}`,
            pin: pin,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Whichever card is nearest the rail's centre gets pushed
              // forward — scaled up, fully lit — while its neighbours recede.
              // Driven straight off scroll progress every frame via gsap.set
              // (not React state) so there's no re-render cost to the scrub.
              const railRect = railRef.current?.getBoundingClientRect();
              if (!railRect) return;
              const centre = railRect.left + railRect.width / 2;

              cards.forEach((card) => {
                const r = card.getBoundingClientRect();
                const cardCentre = r.left + r.width / 2;
                const d = Math.min(
                  1,
                  Math.abs(cardCentre - centre) / (railRect.width * 0.62)
                );
                gsap.set(card, {
                  scale: 1 - d * 0.14,
                  opacity: 1 - d * 0.55,
                  filter: `blur(${d * 2.5}px)`,
                });
                const num = card.querySelector<HTMLElement>(".rt-num");
                if (num) gsap.set(num, { opacity: 0.06 + (1 - d) * 0.1 });
              });
            },
          },
        });

        return () => scrollTween.scrollTrigger?.kill();
      });

      // Featured quote: large-type entrance, independent of the rail.
      gsap.from(".rt-featured > *", {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".rt-featured", start: "top 82%" },
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-white pb-16 pt-16 md:pb-0 md:pt-24"
      aria-label="Ripple Effect of Giving"
    >
      <div className="mx-auto w-full max-w-[2000px] px-6 lg:px-20">
        <div className="rt-heading flex w-full max-w-[46rem] flex-col space-y-3">
          <span className="eyebrow">In their words</span>
          <h2 className="font-aeonik text-[2rem] font-medium leading-[1.05] tracking-[-0.02em] text-black sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            The Ripple Effect of Giving
          </h2>
          <p className="font-montreal text-base leading-relaxed text-body-2 md:text-lg">
            When you give with a generous heart, your act of kindness creates a
            ripple that extends far beyond the initial gift. Real words from the
            widows and missionaries SOOWER supports.
          </p>
        </div>

        {/* Featured quote — set apart in large serif italic with the script
            face for a personal, handwritten counterpoint. */}
        <figure className="rt-featured relative mt-14 max-w-[52rem] border-l-2 border-primary pl-6 md:mt-20 md:pl-8">
          <Quote
            aria-hidden
            className="text-primary/15 absolute -left-3 -top-2 -z-10"
            size={72}
          />
          <blockquote className="font-baskervville text-2xl italic leading-[1.35] text-black sm:text-3xl md:text-[2.5rem] md:leading-[1.25]">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span className="font-script text-3xl leading-none text-primary">
              {featured.name}
            </span>
            <span className="font-montreal text-xs text-body-2">
              {featured.location}
            </span>
          </figcaption>
        </figure>
      </div>

      {/* Horizontal scroll rail. `pinRef` is what GSAP pins; `trackRef` is
          what it translates. Falls back to a plain scroll-snap strip below
          md, where a pin-scrub rail fights native scroll on touch. */}
      <div ref={pinRef} className="relative mt-16 md:mt-20 md:overflow-hidden">
        <div
          ref={railRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:overflow-visible md:pb-0 lg:px-20"
        >
          <div
            ref={trackRef}
            className="flex shrink-0 gap-6 md:w-max md:pr-[20vw]"
          >
            {rest.map((item, i) => (
              <div
                key={item.key}
                className="rt-card relative flex h-[22rem] w-[78vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#FCF9F2] p-7 shadow-[0_2px_18px_-6px_rgba(3,6,33,0.1)] sm:w-[26rem] sm:p-8 md:h-[24rem] md:w-[28rem]"
              >
                <span
                  aria-hidden
                  className="rt-num pointer-events-none absolute -bottom-6 -right-2 select-none font-script text-[9rem] leading-none text-black opacity-[0.06] sm:text-[11rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="bg-primary/15 relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <Quote className="text-primary" size={18} />
                </span>

                <blockquote className="relative font-baskervville text-lg italic leading-relaxed text-body-1 sm:text-xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="relative border-t border-black/[0.08] pt-4">
                  <p className="font-aeonik text-base font-medium text-black">
                    {item.name}
                  </p>
                  <p className="font-montreal text-xs text-body-2">
                    {item.location}
                  </p>
                  {item.source ? (
                    <p className="mt-0.5 font-montreal text-[0.68rem] uppercase tracking-[0.1em] text-primary">
                      {item.source}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RippleTestimonials;
