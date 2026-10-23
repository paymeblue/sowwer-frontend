import SectionContainer from "@components/sections/SectionContainer";
import { cn } from "@lib/cn";
import { ReactNode } from "react";

type Props = {
  eyebrow: string;
  /** Headline before the accent word. */
  title: string;
  /** One word or phrase set in gold italic serif, after `title`. */
  accent?: string;
  /** Headline text after the accent. */
  titleEnd?: string;
  lede?: ReactNode;
  /** Optional right-hand column (photo, stats, contact card…). */
  aside?: ReactNode;
  className?: string;
};

/**
 * Shared opening band for inner pages, matching the moment pages: cream
 * ground with a warm and a cool glow, eyebrow, display headline with one
 * italic accent, and a lede.
 *
 * @param {Props} props Component props.
 * @return {JSX.Element} The page header.
 */
const PageHero = ({
  eyebrow,
  title,
  accent,
  titleEnd,
  lede,
  aside,
  className,
}: Props) => (
  <header
    className={cn(
      "relative overflow-hidden bg-[#FCF9F2] pb-14 pt-32 md:pb-20 md:pt-40",
      className
    )}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(46% 60% at 88% 8%, rgba(255,198,41,0.18) 0%, transparent 68%), radial-gradient(40% 55% at 4% 92%, rgba(52,102,255,0.08) 0%, transparent 68%)",
      }}
    />
    <SectionContainer className="relative">
      <div
        className={cn(
          "grid items-end gap-12",
          aside && "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16"
        )}
      >
        <div className="max-w-[44rem]">
          <span className="block font-montreal text-xs font-semibold uppercase tracking-[0.2em] text-[#A67C00]">
            {eyebrow}
          </span>
          <h1 className="mt-5 font-aeonik text-[2.6rem] font-medium leading-[1] tracking-[-0.03em] text-black sm:text-6xl lg:text-[4.25rem]">
            {title}
            {accent ? (
              <>
                {" "}
                <em className="font-baskervville font-normal italic text-[#C9960C]">
                  {accent}
                </em>
              </>
            ) : null}
            {titleEnd ? ` ${titleEnd}` : null}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-[38rem] font-montreal text-base leading-relaxed text-body-2 md:text-lg">
              {lede}
            </p>
          ) : null}
        </div>
        {aside ? <div>{aside}</div> : null}
      </div>
    </SectionContainer>
  </header>
);

export default PageHero;
