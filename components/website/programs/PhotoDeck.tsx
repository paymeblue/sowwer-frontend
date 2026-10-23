"use client";

import SmartImage from "@components/shared/SmartImage";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type DeckPhoto = { src: string; alt: string };

type Props = {
  photos: readonly DeckPhoto[];
  /** How far the page must scroll to walk the whole deck, in viewport heights. */
  travel?: number;
};

// Transform applied to each card by its distance from the front of the deck.
// Cards fan out up and to the right so a sliver of each photo stays visible —
// the stack reads as real prints rather than blank sheets. Anything past the
// third card sits in the third slot at zero opacity, so a card leaving the
// front fades back into the stack rather than snapping.
// `spread` narrows the fan on phones so the stack stays inside the viewport.
const slot = (depth: number, spread: number) => {
  const clamped = Math.min(depth, 3);
  return {
    transform: `translate3d(${clamped * 26 * spread}px, ${
      clamped * -14
    }px, 0) rotate(${clamped * 3.2 * spread}deg) scale(${1 - clamped * 0.06})`,
    opacity: depth >= 3 ? 0 : 1,
  };
};

const pad = (n: number) => String(n).padStart(2, "0");

const PhotoDeck = ({ photos, travel = 1.6 }: Props) => {
  const scope = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Set once the visitor takes over with the dots — scrolling stops driving
  // the deck so it does not fight their choice.
  const manual = useRef(false);
  const count = photos.length;
  const [spread, setSpread] = useState(1);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setSpread(query.matches ? 0.35 : 1);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(deckRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // The deck drifts and tilts a little as the hero scrolls past, so the
      // stack reads as a physical object rather than a flat frame.
      gsap.to(deckRef.current, {
        y: -46,
        rotate: -1.6,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Scrolling deals the deck: progress across `travel` viewport heights
      // maps onto the card index, so each scroll step turns one card.
      if (count > 1) {
        ScrollTriggerDeal({
          trigger: scope.current,
          count,
          travel,
          manual,
          onStep: setActive,
        });
      }
    },
    { scope, dependencies: [count, travel] }
  );

  const go = (i: number) => {
    manual.current = true;
    setActive((i + count) % count);
  };

  return (
    <div
      ref={scope}
      className="w-full md:w-auto"
      role="region"
      aria-roledescription="carousel"
      aria-label="Programme photographs"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
    >
      <div
        ref={deckRef}
        className="relative mx-auto aspect-[4/5] w-full max-w-[21rem] sm:max-w-[25rem] md:mx-0 md:w-[25rem] md:max-w-none lg:w-[30rem]"
      >
        {/* Soft gold bloom behind the stack so it sits in light, not on a
            flat page. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(50% 50% at 60% 45%, rgba(255,198,41,0.28) 0%, transparent 70%)",
          }}
        />

        {photos.map((photo, i) => {
          const depth = (i - active + count) % count;
          const { transform, opacity } = slot(depth, spread);
          // Only the face-up card is worth blocking on. Everything stacked
          // behind it loads lazily at low priority so it never competes with
          // the LCP image.
          const isLead = i === 0;
          const isFront = depth === 0;
          return (
            <figure
              key={photo.src}
              aria-hidden={!isFront}
              className="absolute inset-0 overflow-hidden rounded-[2rem] bg-[#efe9dc] shadow-[0_30px_60px_-24px_rgba(3,6,33,0.45)] ring-1 ring-black/[0.06] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform, opacity, zIndex: count - depth }}
            >
              <SmartImage
                src={photo.src}
                alt={isFront ? photo.alt : ""}
                fill
                sizes="(max-width: 768px) 88vw, 480px"
                quality={isLead ? 85 : 70}
                priority={isLead}
                className="photo-real object-cover"
              />

              {/* Cards in the stack dim with depth so the front photo
                  always reads first. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-secondary-black transition-opacity duration-700"
                style={{ opacity: isFront ? 0 : 0.28 + depth * 0.1 }}
              />

              <figcaption
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-6 pb-6 pt-20 transition-all duration-500 ${
                  isFront
                    ? "translate-y-0 opacity-100 delay-200"
                    : "translate-y-3 opacity-0"
                }`}
              >
                <p className="max-w-[26ch] font-aeonik text-[1.05rem] font-medium leading-snug text-white">
                  {photo.alt}
                </p>
              </figcaption>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20"
              />
            </figure>
          );
        })}

        {count > 1 ? (
          <span className="bg-black/45 absolute left-5 top-5 z-[60] rounded-full px-3 py-1 font-montreal text-xs tabular-nums tracking-[0.08em] text-white backdrop-blur-md">
            {pad(active + 1)}
            <span className="text-white/50"> / {pad(count)}</span>
          </span>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="mx-auto mt-8 flex w-full max-w-[21rem] items-center gap-4 sm:max-w-[25rem] md:mx-0 md:w-[25rem] md:max-w-none lg:w-[30rem]">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous photograph"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-black/20 hover:bg-primary"
          >
            <ArrowLeft size={17} />
          </button>

          <div className="flex flex-1 items-center gap-1.5">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show photograph ${i + 1} of ${count}`}
                aria-current={i === active}
                className="group relative h-6 flex-1"
              >
                <span
                  className={`absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full transition-colors duration-500 ${
                    i <= active
                      ? "bg-primary"
                      : "bg-black/[0.12] group-hover:bg-black/25"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next photograph"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition-all duration-300 hover:translate-x-0.5 hover:border-black/20 hover:bg-primary"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

/**
 * Maps scroll progress over the deck onto a card index. Kept out of the
 * component body so the useGSAP callback stays readable.
 */
function ScrollTriggerDeal({
  trigger,
  count,
  travel,
  manual,
  onStep,
}: {
  trigger: Element | null;
  count: number;
  travel: number;
  manual: React.MutableRefObject<boolean>;
  onStep: (i: number) => void;
}) {
  if (!trigger) return;

  gsap.to(
    {},
    {
      ease: "none",
      scrollTrigger: {
        trigger,
        // "top top" keeps progress at 0 while the hero is still at rest, so the
        // lead card — the one loaded at high priority — is what a visitor sees
        // before they scroll at all.
        start: "top top",
        end: () => `+=${window.innerHeight * travel}`,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (manual.current) return;
          // progress 0..1 spread across the cards, clamped to the last index.
          const index = Math.min(
            count - 1,
            Math.floor(self.progress * count * 0.999)
          );
          onStep(index);
        },
      },
    }
  );
}

export default PhotoDeck;
