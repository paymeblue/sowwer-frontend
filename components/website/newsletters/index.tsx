"use client";

import PageHero from "@components/shared/PageHero";
import SectionContainer from "@components/sections/SectionContainer";
import SmartImage from "@components/shared/SmartImage";
import { ArrowUpRight, Download } from "lucide-react";

const COVER_BASE =
  "https://soower-landing-media.s3.amazonaws.com/newsletters/covers";

// Themes and page counts are read off each PDF's cover page.
const newsletters = [
  {
    title: "Volume 2, Issue 3",
    date: "September 2026",
    theme: "Hope in Action: Education | Empowerment | Partnership | Impact",
    pages: 12,
    cover: `${COVER_BASE}/vol-2-issue-3.jpg`,
    link: "/assets/newsletters/SOOWER Newsletter Vol 2 Issue 3 (September 2026).pdf",
  },
  {
    title: "Volume 2, Issue 2",
    date: "June 2026",
    theme:
      "Halfway Through 2026: Accelerating Sustainable Impact Through Partnership",
    pages: 8,
    cover: `${COVER_BASE}/vol-2-issue-2.jpg`,
    link: "/assets/newsletters/SOOWER Newsletter Vol 2 Issue 2 (June 2026).pdf",
  },
  {
    title: "Volume 2, Issue 1",
    date: "March 2026",
    theme: "Deepening and Expanding Impact",
    pages: 8,
    cover: `${COVER_BASE}/vol-2-issue-1.jpg`,
    link: "/assets/newsletters/SOOWER Newsletter Vol 2 Issue 1 (March 2026).pdf",
  },
  {
    title: "Volume 1, Issue 3",
    date: "December 2025",
    theme: "From Compassion to Impact: Our 2025 Journey",
    pages: 5,
    cover: `${COVER_BASE}/vol-1-issue-3.jpg`,
    link: "/assets/newsletters/Soower Newsletter Vol 1 Issue 3 Dec 2025.pdf",
  },
  {
    title: "Volume 1, Issue 2",
    date: "September 2025",
    theme: "Extending Hope and Transforming Lives",
    pages: 6,
    cover: `${COVER_BASE}/vol-1-issue-2.jpg`,
    link: "/assets/newsletters/volume-1-issue-2.pdf",
  },
  {
    title: "Volume 1, Issue 1",
    date: "June 2025",
    theme: "Debut Edition - Celebrating Our Launch!",
    pages: 4,
    cover: `${COVER_BASE}/vol-1-issue-1.jpg`,
    link: "/assets/newsletters/volume-1-issue-1.pdf",
  },
];

type Issue = (typeof newsletters)[number];

const fileName = (issue: Issue) =>
  `SOOWER-Newsletter-${issue.title.replace(/[^a-zA-Z0-9]+/g, "-")}.pdf`;

const IssueActions = ({ issue, dark }: { issue: Issue; dark?: boolean }) => (
  <div className="flex flex-wrap items-center gap-2.5">
    <a
      href={issue.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-montreal text-sm font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
    >
      Read issue
      <ArrowUpRight size={15} />
    </a>
    <a
      href={issue.link}
      download={fileName(issue)}
      aria-label={`Download ${issue.title} (PDF)`}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-montreal text-sm font-medium ring-1 ring-inset transition-colors duration-300 ${
        dark
          ? "text-white ring-white/25 hover:bg-white/10"
          : "text-black ring-black/[0.15] hover:bg-black/[0.04]"
      }`}
    >
      <Download size={15} />
      PDF
    </a>
  </div>
);

const NewsLetterPage = () => {
  const [latest, ...archive] = newsletters;

  return (
    <main>
      <PageHero
        eyebrow="SOOWER Newsletters"
        title="Stories that matter, impact you can"
        accent="feel."
        lede="Every quarter we report back on where your support went: the people, the places, the numbers and what we learned. Read online or download any edition."
      />

      {/* ------------------------------------------------ latest issue */}
      <section className="bg-secondary-black py-16 md:py-24">
        <SectionContainer>
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-16 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
            <a
              href={latest.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read ${latest.title}`}
              className="group relative mx-auto block aspect-[1000/1416] w-full max-w-[22rem] md:max-w-none"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-2xl bg-primary/80 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4 group-hover:rotate-3"
              />
              <span className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-1">
                <SmartImage
                  src={latest.cover}
                  alt={`Cover of the SOOWER Newsletter, ${latest.title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 88vw, 416px"
                  className="object-cover object-top"
                />
              </span>
            </a>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.15] px-3 py-1 font-montreal text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Latest issue
              </span>
              <p className="mt-6 font-montreal text-sm text-white/50">
                {latest.title} · {latest.date} · {latest.pages} pages
              </p>
              <h2 className="mt-3 max-w-[22ch] font-aeonik text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-white md:text-[2.75rem]">
                {latest.theme}
              </h2>
              <div className="mt-9">
                <IssueActions issue={latest} dark />
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ------------------------------------------------ archive */}
      <section className="bg-white py-16 md:py-24">
        <SectionContainer>
          <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 className="font-aeonik text-2xl font-medium tracking-[-0.02em] text-black md:text-4xl">
              Past editions
            </h2>
            <span className="font-montreal text-xs uppercase tracking-[0.14em] text-body-2">
              {archive.length} issues
            </span>
          </div>

          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {archive.map((issue) => (
              <li key={issue.title} className="group flex flex-col">
                <a
                  href={issue.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${issue.title}`}
                  className="relative block aspect-[1000/1416] overflow-hidden rounded-xl bg-[#efe9dc] shadow-[0_18px_40px_-22px_rgba(3,6,33,0.45)] ring-1 ring-black/[0.06] transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_60px_-24px_rgba(3,6,33,0.5)]"
                >
                  <SmartImage
                    src={issue.cover}
                    alt={`Cover of the SOOWER Newsletter, ${issue.title}`}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 230px"
                    className="object-cover object-top"
                  />
                </a>
                <p className="mt-5 font-montreal text-xs uppercase tracking-[0.12em] text-body-2">
                  {issue.date} · {issue.pages} pages
                </p>
                <h3 className="mt-2 font-aeonik text-lg font-medium leading-snug text-black">
                  {issue.theme}
                </h3>
                <p className="mt-1 font-montreal text-sm text-body-2">
                  {issue.title}
                </p>
                <div className="mt-5">
                  <IssueActions issue={issue} />
                </div>
              </li>
            ))}
          </ul>
        </SectionContainer>
      </section>
    </main>
  );
};

export default NewsLetterPage;
