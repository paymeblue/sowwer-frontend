"use client";

import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import Image from "next/image";
import { useRef, useState } from "react";

export type DeckPhoto = { src: string; alt: string };

type Props = {
  photos: readonly DeckPhoto[];
  /** How far the page must scroll to walk the whole deck, in viewport heights. */
  travel?: number;
};

// Transform applied to each card by its distance from the front of the deck.
// Anything past the third card sits in the third slot at zero opacity, so a
// card leaving the front fades back into the stack rather than snapping.
const slot = (depth: number) => {
  const clamped = Math.min(depth, 3);
  return {
    transform: `translate3d(${clamped * 20}px, ${clamped * 15}px, 0) rotate(${
      clamped * 2.6
    }deg) scale(${1 - clamped * 0.045})`,
    opacity: depth >= 3 ? 0 : 1,
  };
};

const PhotoDeck = ({ photos, travel = 1.6 }: Props) => {
  const scope = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Set once the visitor takes over with the dots — scrolling stops driving
  // the deck so it does not fight their choice.
  const manual = useRef(false);
  const count = photos.length;

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

  return (
    <div ref={scope} className="w-full md:w-auto">
      <div
        ref={deckRef}
        className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] sm:max-w-[26rem] md:mx-0 md:w-[26rem] md:max-w-none lg:w-[32rem]"
      >
        {photos.map((photo, i) => {
          const depth = (i - active + count) % count;
          const { transform, opacity } = slot(depth);
          // Only the face-up card is worth blocking on. Everything stacked
          // behind it loads lazily at low priority so it never competes with
          // the LCP image.
          const isLead = i === 0;
          return (
            <div
              key={photo.src}
              aria-hidden={depth !== 0}
              className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-grey shadow-[0_18px_50px_-18px_rgba(3,6,33,0.35)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform, opacity, zIndex: count - depth }}
            >
              <Image
                src={photo.src}
                alt={depth === 0 ? photo.alt : ""}
                fill
                sizes="(max-width: 768px) 92vw, 512px"
                quality={isLead ? 88 : 72}
                priority={isLead}
                loading={isLead ? undefined : "lazy"}
                fetchPriority={isLead ? "high" : "low"}
                className="photo-real object-cover"
              />
            </div>
          );
        })}
      </div>

      {count > 1 ? (
        <div className="mx-auto mt-7 flex w-full max-w-[22rem] items-center justify-center gap-2 sm:max-w-[26rem] md:mx-0 md:w-[26rem] md:max-w-none lg:w-[32rem]">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => {
                manual.current = true;
                setActive(i);
              }}
              aria-label={`Show photograph ${i + 1} of ${count}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 hover:bg-primary ${
                i === active ? "w-8 bg-primary" : "w-2 bg-black/20"
              }`}
            />
          ))}
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
