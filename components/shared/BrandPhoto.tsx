"use client";

import { useGSAP } from "@gsap/react";
import { cn } from "@lib/cn";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type BrandPhotoItem = { src: string; alt: string };

type Props = {
  /** One or more photographs. Several will crossfade on a timer. */
  photos: readonly BrandPhotoItem[];
  className?: string;
  sizes?: string;
  /** Seconds between crossfades when more than one photo is supplied. */
  interval?: number;
  /** "soft" crops less — use it for portrait or very wide frames. */
  variant?: "default" | "soft";
  priority?: boolean;
  /** Offset echo of the mask behind the photo. Off for cells already sitting
   * inside their own bordered card, where the echo just reads as a smudge. */
  outline?: boolean;
  /** Pagination dots below the photo. Off for purely decorative placements
   * (e.g. inside a pointer-events-none watermark) where clickable-looking
   * dots that don't respond would read as broken. */
  showDots?: boolean;
};

/**
 * A standalone photograph masked into the SOOWER mark's silhouette, with the
 * same shape echoed as an offset outline behind it.
 *
 * @param {Props} props Component props.
 * @return {JSX.Element} The masked photo block.
 */
const BrandPhoto = ({
  photos,
  className,
  sizes = "(max-width: 1024px) 90vw, 45vw",
  interval = 5,
  variant = "default",
  priority = false,
  outline = true,
  showDots = true,
}: Props) => {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = photos.length;
  const mask = variant === "soft" ? "mask-soower-soft" : "mask-soower";

  const advance = useCallback(() => setActive((i) => (i + 1) % count), [count]);

  useEffect(() => {
    if (count < 2 || prefersReducedMotion()) return;
    const id = setInterval(advance, interval * 1000);
    return () => clearInterval(id);
  }, [advance, count, interval]);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !outline) return;
      // The outline drifts a touch slower than the photo, so the two shapes
      // separate as the section scrolls.
      gsap.to(".brand-photo-outline", {
        yPercent: 6,
        xPercent: 2,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className={cn("relative", className)}>
      {outline ? (
        <div
          aria-hidden
          className={cn(
            "brand-photo-outline absolute inset-0 translate-x-[3.5%] translate-y-[4%] bg-primary/25",
            mask
          )}
        />
      ) : null}
      <div className={cn("relative h-full w-full overflow-hidden", mask)}>
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={i === active ? photo.alt : ""}
            fill
            sizes={sizes}
            quality={i === 0 ? 88 : 74}
            priority={priority && i === 0}
            loading={priority && i === 0 ? undefined : "lazy"}
            fetchPriority={priority && i === 0 ? "high" : "low"}
            className="photo-real object-cover transition-opacity ease-in-out [transition-duration:1200ms] motion-reduce:transition-none"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
      </div>

      {count > 1 && showDots ? (
        <div className="absolute inset-x-0 -bottom-6 flex justify-center gap-1.5">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photograph ${i + 1} of ${count}`}
              aria-current={i === active}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-primary" : "w-1.5 bg-black/20"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default BrandPhoto;
