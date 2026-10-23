import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Props = { title: string; desc: string };

/**
 * Empty state for the public explore pages. Rather than a dead end, it
 * points visitors at the outreach record and the programmes they can give to
 * today.
 *
 * @param {Props} props Component props.
 * @return {JSX.Element} The empty panel.
 */
const ExploreEmpty = ({ title, desc }: Props) => (
  <div className="relative overflow-hidden rounded-[2rem] bg-[#FCF9F2] px-6 py-16 text-center ring-1 ring-black/[0.05] md:px-16 md:py-20">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(40% 70% at 50% 0%, rgba(255,198,41,0.22) 0%, transparent 70%)",
      }}
    />
    <div
      aria-hidden
      className="mask-soower relative mx-auto h-16 w-14 bg-gradient-to-b from-primary to-[#E8A900]"
    />
    <h3 className="relative mx-auto mt-8 max-w-[24ch] font-aeonik text-2xl font-medium leading-tight tracking-[-0.02em] text-black md:text-3xl">
      {title}
    </h3>
    <p className="relative mx-auto mt-4 max-w-[46ch] font-montreal text-base leading-relaxed text-body-2">
      {desc}
    </p>
    <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
      <Link
        href="/#moments"
        className="inline-flex items-center gap-2 rounded-full bg-secondary-black px-5 py-3 font-montreal text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
      >
        See our outreach record
        <ArrowUpRight size={15} />
      </Link>
      <Link
        href="/donate/widow-care"
        className="group inline-flex items-center gap-2 rounded-full px-5 py-3 font-montreal text-sm font-medium text-black ring-1 ring-inset ring-black/[0.15] transition-colors hover:bg-black/[0.04]"
      >
        Give to a programme
        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  </div>
);

export default ExploreEmpty;
