"use client";

import { MovingBorderButton } from "@components/ui/moving-border";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import Link from "next/link";
import { useRef } from "react";
import { Heart2 } from "react-iconly";
import PhotoDeck, { DeckPhoto } from "./PhotoDeck";

export type HeroStat = { value: string; label: string };

type Props = {
  pillText: string;
  pillColor: string;
  title: string;
  /** Word or phrase inside `title` to set in gold italic serif. */
  accent?: string;
  subtitle: string;
  donateRoute: string;
  deck: readonly DeckPhoto[];
  stats?: HeroStat[];
};

/**
 * Programme page opening: the headline rises in word by word from behind a
 * mask, then the lede, actions and figures follow on one timeline. Words are
 * split in markup (not at runtime) so the server-rendered heading is intact
 * for search engines and for visitors with motion turned off.
 *
 * @param {Props} props Component props.
 * @return {JSX.Element} The hero section.
 */
const ProgramHero = ({
  pillText,
  pillColor,
  title,
  accent,
  subtitle,
  donateRoute,
  deck,
  stats,
}: Props) => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".ph-pill", { y: 12, opacity: 0, duration: 0.6 })
        .from(
          ".ph-word",
          { yPercent: 110, rotate: 4, duration: 1.05, stagger: 0.055 },
          "-=0.35"
        )
        .from(".ph-rule", { scaleX: 0, duration: 0.9 }, "-=0.7")
        .from(
          ".ph-fade",
          { y: 18, opacity: 0, duration: 0.8, stagger: 0.1 },
          "-=0.75"
        );
    },
    { scope }
  );

  // Split around the accent so it can be styled, then into words for the
  // reveal. Each word keeps its trailing space outside the mask.
  const accentAt = accent ? title.indexOf(accent) : -1;
  const parts =
    accentAt >= 0 && accent
      ? [
          { text: title.slice(0, accentAt), accent: false },
          { text: accent, accent: true },
          { text: title.slice(accentAt + accent.length), accent: false },
        ]
      : [{ text: title, accent: false }];

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-[#FCF9F2] px-4 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-20 xl:px-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 55% at 82% 30%, rgba(255,198,41,0.2) 0%, transparent 70%), radial-gradient(38% 50% at 0% 100%, rgba(52,102,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col-reverse items-center gap-14 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="w-full max-w-[42rem]">
          <div className="ph-pill inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_6px_20px_-10px_rgba(3,6,33,0.25)] ring-1 ring-black/[0.06]">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: pillColor }}
            />
            <span
              className="font-montreal text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: pillColor }}
            >
              {pillText}
            </span>
          </div>

          <h1 className="mt-7 font-aeonik text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] text-black sm:text-[3.25rem] lg:text-[3.6rem] xl:text-[3.9rem]">
            {parts.map((part, p) =>
              part.text
                .split(/(\s+)/)
                .filter(Boolean)
                .map((word, w) =>
                  /^\s+$/.test(word) ? (
                    " "
                  ) : (
                    <span
                      key={`${p}-${w}`}
                      className="inline-block overflow-hidden pb-[0.12em] align-bottom"
                    >
                      <span
                        className={`ph-word inline-block will-change-transform ${
                          part.accent
                            ? "pr-[0.06em] font-baskervville font-normal italic text-[#C9960C]"
                            : ""
                        }`}
                      >
                        {word}
                      </span>
                    </span>
                  )
                )
            )}
          </h1>

          <span
            aria-hidden
            className="ph-rule mt-7 block h-[3px] w-20 origin-left rounded-full bg-primary"
          />

          <p className="ph-fade mt-7 max-w-[36rem] font-montreal text-base leading-[1.7] text-body-2 md:text-[1.0625rem]">
            {subtitle}
          </p>

          <div className="ph-fade mt-9">
            <Link href={`/donate${donateRoute}`}>
              <MovingBorderButton className="w-full sm:w-auto">
                <span>
                  <Heart2 set="bold" size={19} />
                </span>
                <span>Donate now</span>
              </MovingBorderButton>
            </Link>
          </div>

          {stats?.length ? (
            <dl className="ph-fade mt-12 grid max-w-[36rem] grid-cols-3 divide-x divide-black/10 border-t border-black/10 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="px-4 first:pl-0">
                  <dt className="font-aeonik text-2xl font-medium leading-none tracking-[-0.02em] text-black md:text-[1.75rem]">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 font-montreal text-xs leading-snug text-body-2">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="flex w-full justify-center md:w-auto">
          <PhotoDeck photos={deck} />
        </div>
      </div>
    </section>
  );
};

export default ProgramHero;
