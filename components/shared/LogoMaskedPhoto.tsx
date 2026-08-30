"use client";

import { prefersReducedMotion } from "@lib/gsap";
import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";

// The SOOWER mark, lifted from public/assets/icons/favicon.svg, reused here as
// a clipping path so a photograph can be poured into the shape of the logo.
const MARK_VIEWBOX = "0 0 24 27";
const MARK_PATHS = [
  "M3.21649 9.28896C2.81158 9.52047 2.3315 9.58231 1.88114 9.46096C1.43078 9.33962 1.04675 9.04496 0.812955 8.64136C0.579164 8.23776 0.514616 7.75803 0.633417 7.30699C0.752218 6.85595 1.04471 6.47027 1.44699 6.2342L11.0084 0.713861C11.2803 0.556277 11.5895 0.474156 11.9038 0.475982C12.2181 0.477808 12.5262 0.563514 12.7963 0.724249L22.2277 6.16985C22.5263 6.31495 22.7781 6.54116 22.9542 6.82261C23.1304 7.10406 23.2238 7.42939 23.2237 7.76141V11.2515C23.2238 11.5835 23.1304 11.9089 22.9542 12.1903C22.7781 12.4718 22.5263 12.698 22.2277 12.8431L19 14.7067C18.7148 14.8715 18.3891 14.9531 18.0599 14.9425C17.7307 14.9318 17.411 14.8293 17.137 14.6464L8.30753 9.55237L11.8308 7.51811L18.1116 11.1446L19.6867 10.236V8.77821L11.8948 4.27936L3.21649 9.28896Z",
  "M20.5697 17.2746C20.7704 17.1553 20.9928 17.077 21.224 17.0443C21.4551 17.0116 21.6905 17.025 21.9164 17.0839C22.1424 17.1427 22.3544 17.2458 22.5402 17.3872C22.726 17.5285 22.882 17.7053 22.999 17.9074C23.116 18.1094 23.1918 18.3326 23.2219 18.5642C23.252 18.7957 23.2359 19.0309 23.1746 19.2562C23.1132 19.4814 23.0077 19.6923 22.8642 19.8765C22.7208 20.0607 22.5422 20.2146 22.3389 20.3294L12.7778 25.8494C12.5059 26.007 12.1968 26.0892 11.8824 26.0874C11.5681 26.0855 11.26 25.9998 10.9899 25.839L1.55852 20.3934C1.25986 20.2483 1.00806 20.0221 0.831917 19.7406C0.655777 19.4592 0.562412 19.1338 0.5625 18.8018V15.3117C0.562451 14.9797 0.655831 14.6544 0.831966 14.3729C1.0081 14.0915 1.25988 13.8653 1.55852 13.7202L4.78621 11.8565C5.07148 11.6913 5.39731 11.6092 5.72681 11.6197C6.0563 11.6301 6.3763 11.7325 6.65057 11.9155L15.4783 17.0122L11.9551 19.0465L5.67532 15.42L4.10019 16.3285V17.7853L11.8924 22.2839L20.5697 17.2746Z",
];

export type LogoMaskedPhotoItem = { src: string; alt: string };

type Props = {
  /** One or more photographs. Several will crossfade on a timer. */
  photos: readonly LogoMaskedPhotoItem[];
  className?: string;
  /** Draws the mark's outline slightly offset behind the photo. */
  outline?: boolean;
  /** Seconds between crossfades when more than one photo is supplied. */
  interval?: number;
};

const LogoMaskedPhoto = ({
  photos,
  className,
  outline = true,
  interval = 5,
}: Props) => {
  // useId keeps the clipPath unique when several of these share a page.
  const clipId = `soower-mark-${useId().replace(/:/g, "")}`;
  const [active, setActive] = useState(0);
  const count = photos.length;

  const advance = useCallback(() => setActive((i) => (i + 1) % count), [count]);

  useEffect(() => {
    if (count < 2 || prefersReducedMotion()) return;
    const id = setInterval(advance, interval * 1000);
    return () => clearInterval(id);
  }, [advance, count, interval]);

  return (
    <div className={className}>
      <div className="relative h-full w-full">
        {outline ? (
          <svg
            aria-hidden
            viewBox={MARK_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            className="text-primary/35 absolute inset-0 h-full w-full translate-x-[3%] translate-y-[4%]"
          >
            {MARK_PATHS.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.45}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        ) : null}

        <svg
          viewBox={MARK_VIEWBOX}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={photos[active]?.alt}
          className="relative h-full w-full"
        >
          <defs>
            <clipPath id={clipId}>
              {MARK_PATHS.map((d) => (
                <path key={d} d={d} />
              ))}
            </clipPath>
          </defs>
          <foreignObject
            x="0"
            y="0"
            width="24"
            height="27"
            clipPath={`url(#${clipId})`}
          >
            {/* foreignObject lets next/image handle the loading and sizing
                while the SVG handles the shape. */}
            <div className="relative h-full w-full">
              {photos.map((photo, i) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 40vw, 22vw"
                  quality={i === 0 ? 82 : 70}
                  loading="lazy"
                  fetchPriority="low"
                  className="photo-real object-cover transition-opacity ease-in-out [transition-duration:1200ms] motion-reduce:transition-none"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ))}
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
};

export default LogoMaskedPhoto;
