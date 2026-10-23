import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface IMinistryCard {
  name: string;
  location: string;
  logoUrl: string | null;
  id: string;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word) && word.length > 2)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

const MinistryCard = ({ name, location, logoUrl, id }: IMinistryCard) => {
  return (
    <Link
      href={`/ministries/${id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-7 ring-1 ring-black/[0.07] transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(3,6,33,0.3)] hover:ring-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flex items-start justify-between gap-4">
        {logoUrl ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#FCF9F2] ring-1 ring-black/[0.06]">
            <Image
              src={logoUrl}
              alt={`${name} logo`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        ) : (
          // No logo uploaded — a monogram on the brand gold stands in.
          <div
            aria-hidden
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#E8A900] font-aeonik text-xl font-medium text-black"
          >
            {initials(name)}
          </div>
        )}
        <span className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-black/10 transition-all duration-300 group-hover:bg-primary group-hover:ring-primary">
          <ArrowUpRight size={16} className="text-black" />
        </span>
      </div>

      <h3 className="mt-10 font-aeonik text-xl font-medium capitalize leading-snug tracking-[-0.01em] text-black">
        {name}
      </h3>
      <p className="mt-2 flex items-center gap-1.5 font-montreal text-sm text-body-2">
        <MapPin size={14} className="shrink-0" />
        {location}
      </p>
      <span className="mt-auto pt-8 font-montreal text-sm font-medium text-black underline decoration-primary decoration-2 underline-offset-4">
        Read their story
      </span>
    </Link>
  );
};

export default MinistryCard;
