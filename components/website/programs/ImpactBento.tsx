"use client";

import SmartImage from "@components/shared/SmartImage";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@lib/gsap";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export type ImpactGroup = {
  key: string;
  title: string;
  date: string;
  location: string;
  /** Moment page with the full story and gallery. */
  href: string;
  photos: { src: string; alt: string }[];
};

// Seven cells tile a 4-column, 3-row grid exactly:
//   [ 0 0 1 2 ]
//   [ 0 0 3 2 ]
//   [ 4 4 5 6 ]
// On phones the grid drops to two columns and the lead cell spans both.
const CELLS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

const SIZES = [
  "(max-width: 768px) 92vw, 46vw",
  "(max-width: 768px) 46vw, 23vw",
  "(max-width: 768px) 46vw, 23vw",
  "(max-width: 768px) 46vw, 23vw",
  "(max-width: 768px) 92vw, 46vw",
  "(max-width: 768px) 46vw, 23vw",
  "(max-width: 768px) 46vw, 23vw",
];

/**
 * Event-by-event photo bento for programme pages: each outreach gets its own
 * dated header and a seven-cell grid, with the last cell linking through to
 * the full gallery when there are more frames than fit.
 *
 * @param {{ groups: ImpactGroup[] }} props Component props.
 * @return {JSX.Element} One bento per event.
 */
const ImpactBento = ({ groups }: { groups: ImpactGroup[] }) => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      scope.current
        ?.querySelectorAll<HTMLElement>("[data-bento]")
        .forEach((grid) =>
          revealOnScroll(grid.querySelectorAll(".bento-cell"), {
            trigger: grid,
            y: 40,
            stagger: 0.06,
            duration: 0.8,
            start: "top 80%",
          })
        );
    },
    { scope }
  );

  return (
    <div ref={scope} className="space-y-20 md:space-y-28">
      {groups.map((group) => {
        const shown = group.photos.slice(0, CELLS.length);
        const remaining = group.photos.length - shown.length;

        return (
          <article key={group.key} aria-labelledby={`bento-${group.key}`}>
            <header className="mb-7 flex flex-col gap-4 md:mb-9 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex items-center gap-2 font-montreal text-xs font-semibold uppercase tracking-[0.16em] text-[#A67C00]">
                  <Calendar size={13} />
                  {group.date} · {group.location}
                </p>
                <h3
                  id={`bento-${group.key}`}
                  className="mt-3 font-aeonik text-2xl font-medium tracking-[-0.02em] text-black md:text-[2.25rem]"
                >
                  {group.title}
                </h3>
              </div>
              <Link
                href={group.href}
                className="group inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 font-montreal text-sm font-medium text-black ring-1 ring-inset ring-black/[0.15] transition-colors hover:bg-black/[0.04]"
              >
                Read the story
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </header>

            <div
              data-bento
              className="grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[15rem]"
            >
              {shown.map((photo, i) => {
                const isLast = i === shown.length - 1 && remaining > 0;
                const cell = (
                  <>
                    <SmartImage
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={SIZES[i]}
                      className="photo-real object-cover [transition-duration:1200ms] group-hover:scale-[1.05]"
                    />
                    {isLast ? (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-secondary-black/70 text-white backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-secondary-black/80">
                        <span className="font-aeonik text-3xl font-medium">
                          +{remaining}
                        </span>
                        <span className="font-montreal text-xs uppercase tracking-[0.14em] text-white/70">
                          more photographs
                        </span>
                      </span>
                    ) : (
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100 md:p-5 md:pt-14">
                        <span className="block font-montreal text-sm leading-snug text-white">
                          {photo.alt}
                        </span>
                      </span>
                    )}
                  </>
                );

                const className = `bento-cell group relative overflow-hidden rounded-[1.5rem] bg-[#efe9dc] ring-1 ring-black/[0.05] md:rounded-[1.75rem] ${
                  CELLS[i]
                } ${i === 0 ? "max-md:col-span-2" : ""}`;

                return isLast ? (
                  <Link
                    key={photo.src}
                    href={`${group.href}#gallery`}
                    aria-label={`See all ${group.photos.length} photographs from ${group.title}`}
                    className={className}
                  >
                    {cell}
                  </Link>
                ) : (
                  <figure key={photo.src} className={className}>
                    {cell}
                  </figure>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ImpactBento;
