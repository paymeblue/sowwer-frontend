"use client";

import SectionContainer from "@components/sections/SectionContainer";
import SmartImage from "@components/shared/SmartImage";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@lib/gsap";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const GALLERY =
  "https://soower-landing-media.s3.amazonaws.com/events-2025-2026/gallery/dad-scholarship-award";

// Everything in this section is taken from SOOWER Newsletter Vol 2 Issue 3
// (September 2026), pages 6-11: "Spotlight of the Quarter".
const GLANCE = [
  { value: "7", label: "Pioneer DAD Scholars" },
  { value: "1", label: "Partner secondary school" },
  { value: "3", label: "Core partner organisations" },
  { value: "₦1.35m", label: "Estimated annual sponsorship per scholar" },
  { value: "6 yrs", label: "Intended secondary education support" },
  { value: "1", label: "Shared goal: every scholar completes school" },
];

const STORY = [
  "For these children, secondary school was not guaranteed. They had met the academic requirements to move on from primary school, but financial barriers threatened to stand in their way.",
  "Through the Donate A Dream (DAD) Project, that uncertainty has given way to opportunity. The seven, selected from Christ Foundation Orphanage and Widows Outreach, are the first beneficiaries of the DAD Scholarship Programme and have begun secondary school as JSS 1 students at KNOSK 100 Naira-A-Day School, with SOOWER sponsoring their education.",
  "One by one at the induction ceremony, they stepped forward to receive their DAD Scholarship Awards and Scholar Starter Packs. Speaking for the Pioneer Seven, Destiny Bawa thanked SOOWER and its partners for the chance to continue their education. The scholars then took the DAD Scholars' Pledge and were formally inducted.",
  "Board Chair and Co-Founder Engr. Jonathan Agwunobi reaffirmed SOOWER's commitment to support the scholars throughout their secondary education, and thanked the partners who made it possible.",
];

// Selection, follow-up and the lessons SOOWER published openly about this
// first cycle, set out as one report-style list.
const PROCESS = [
  {
    label: "Selection",
    body: "Head of Programs Ms. Ogba Abah explained that scholars were selected through a screening and assessment process that weighed academic performance and vulnerability, with orphanhood as a key criterion. Each had qualified for secondary school but had no sponsor.",
  },
  {
    label: "Follow-up",
    body: "SOOWER works with the school and caregivers to track each scholar's academic performance, attendance, class progression, personal development and wellbeing, through termly reports, review meetings, welfare check-ins and annual assessments.",
  },
  {
    label: "The challenge",
    body: "The candidates first identified did not meet the school's admission requirements, and no reserve candidates had been lined up.",
  },
  {
    label: "What we learned",
    body: "Scholarship selection needs to start earlier, leaving time for screening, school assessments and admission.",
  },
  {
    label: "Next cycle",
    body: "SOOWER will identify and screen candidates ahead of admission periods and keep a pool of eligible reserve candidates.",
  },
];

const VOICES = [
  {
    quote: "Today, you are receiving. Tomorrow, you should be giving.",
    name: "Prof. Imelda Udoh",
    role: "Executive Director, SOOWER Foundation",
    context:
      "From her welcome address. She told the scholars that a scholarship brings responsibility as well as opportunity, and urged them to study diligently, embrace discipline and stay resilient.",
  },
  {
    quote: "Your circumstances today do not have to determine your tomorrow.",
    name: "Mrs. Etima Umeh",
    role: "Guest Speaker",
    context:
      "The message of her charge to the Pioneer Seven: ten lessons on gratitude, resilience, discipline and the value of education.",
  },
];

const initials = (name: string) =>
  name
    .replace(/^(Prof|Mrs|Mr|Ms|Engr|Pst)\.\s*/, "")
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

const PARTNERS = [
  "KNOSK 100 Naira-A-Day School",
  "Christ Foundation Orphanage and Widows Outreach",
  "Federal Ministry of Women Affairs and Social Development",
  "Regy & Henry Amazing Grace Foundation",
  "Army of God Gospel Outreach",
  "KAFTAN TV",
  "Betharbel Foundation",
  "TRT Arredo",
];

/**
 * DAD Project spotlight on the Pioneer Seven — the first DAD scholarship
 * cohort, inducted September 28, 2026.
 *
 * @return {JSX.Element} The spotlight section.
 */
const PioneerSpotlight = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealOnScroll(".ps-head > *", { trigger: ".ps-head", stagger: 0.08 });
      revealOnScroll(".ps-para", { trigger: ".ps-story", stagger: 0.1 });
      revealOnScroll(".ps-photo", { trigger: ".ps-story", y: 50, scale: 0.97 });
      revealOnScroll(".ps-stat", {
        trigger: ".ps-glance",
        stagger: 0.07,
        y: 24,
      });
      scope.current
        ?.querySelectorAll<HTMLElement>(".ps-cards")
        .forEach((group) =>
          revealOnScroll(group.querySelectorAll(".ps-card"), {
            trigger: group,
            stagger: 0.1,
          })
        );
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      aria-labelledby="pioneer-seven"
      className="bg-white py-20 md:py-28"
    >
      <SectionContainer>
        {/* Heading */}
        <div className="ps-head mx-auto max-w-[50rem] text-center">
          <span className="block font-montreal text-xs font-semibold uppercase tracking-[0.2em] text-[#A67C00]">
            Spotlight · September 28, 2026
          </span>
          <h2
            id="pioneer-seven"
            className="mt-5 font-aeonik text-[2.4rem] font-medium leading-[1.04] tracking-[-0.035em] text-black md:text-[3.75rem]"
          >
            Seven children.{" "}
            <span className="text-black/[0.35]">One shared dream.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[38rem] font-montreal text-base leading-relaxed text-body-2 md:text-lg">
            The DAD 2026 Pioneer Scholarship Award and Induction Ceremony, held
            under the theme &ldquo;Giving a Child a Dream, Giving a Future a
            Chance,&rdquo; marked the start of a commitment to seven young
            lives.
          </p>
        </div>

        {/* Story + photograph */}
        <div className="ps-story mt-16 grid items-start gap-12 md:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-5">
            {STORY.map((para, i) => (
              <p
                key={i}
                className={`ps-para font-montreal ${
                  i === 0
                    ? "font-aeonik text-xl font-medium leading-snug tracking-[-0.01em] text-black md:text-[1.4rem]"
                    : "text-base leading-[1.75] text-body-1"
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          <figure className="ps-photo">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#efe9dc]">
              <SmartImage
                src={`${GALLERY}/hero.jpg`}
                alt="Two of the Pioneer DAD Scholars holding the induction ceremony programme"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="photo-real object-cover object-[50%_35%]"
              />
            </div>
            <figcaption className="mt-3 font-montreal text-sm text-body-2">
              Two of the Pioneer Seven at the induction ceremony. They began JSS
              1 at KNOSK 100 Naira-A-Day School.
            </figcaption>
          </figure>
        </div>

        {/* DAD at a glance */}
        <div className="ps-glance relative mt-20 overflow-hidden rounded-[2rem] bg-secondary-black p-8 md:mt-28 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 60% at 0% 0%, rgba(255,198,41,0.2) 0%, transparent 70%)",
            }}
          />
          <h3 className="relative font-montreal text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            DAD at a glance
          </h3>
          <dl className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
            {GLANCE.map((item) => (
              <div key={item.label} className="ps-stat">
                <dt className="font-aeonik text-[2.5rem] font-medium leading-none tracking-[-0.03em] text-white md:text-5xl">
                  {item.value}
                </dt>
                <dd className="mt-3 max-w-[12rem] font-montreal text-sm leading-snug text-white/60">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Voices */}
        <div className="ps-cards mt-20 grid divide-y divide-black/10 border-y border-black/10 md:mt-28 md:grid-cols-2 md:divide-x md:divide-y-0">
          {VOICES.map((voice, i) => (
            <figure
              key={voice.name}
              className={`ps-card flex flex-col py-10 md:py-12 ${
                i === 0 ? "md:pr-12" : "md:pl-12"
              }`}
            >
              <span
                aria-hidden
                className="h-[3px] w-10 rounded-full bg-primary"
              />
              <blockquote className="mt-6 font-aeonik text-[1.5rem] font-medium leading-[1.3] tracking-[-0.02em] text-black md:text-[1.75rem]">
                &ldquo;{voice.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-start gap-4">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-black font-montreal text-sm font-semibold text-primary"
                >
                  {initials(voice.name)}
                </span>
                <span>
                  <span className="block font-montreal text-sm font-semibold text-black">
                    {voice.name}
                  </span>
                  <span className="block font-montreal text-sm text-body-2">
                    {voice.role}
                  </span>
                  <span className="mt-3 block max-w-[30rem] font-montreal text-sm leading-relaxed text-body-2">
                    {voice.context}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* How the programme is run — selection, follow-up and lessons */}
        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <h3 className="font-aeonik text-[1.75rem] font-medium leading-tight tracking-[-0.02em] text-black md:text-[2.25rem]">
              How the programme is run
            </h3>
            <p className="mt-4 max-w-[24rem] font-montreal text-base leading-relaxed text-body-2">
              How the first scholars were chosen, how their progress is
              followed, and what SOOWER is changing after this first cycle.
            </p>
          </div>
          <dl className="ps-cards border-t border-black/10">
            {PROCESS.map((row, i) => (
              <div
                key={row.label}
                className="ps-card grid gap-2 border-b border-black/10 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8"
              >
                <dt className="flex items-baseline gap-3 font-montreal text-sm font-semibold text-black">
                  <span className="font-montreal text-xs tabular-nums text-black/[0.35]">
                    0{i + 1}
                  </span>
                  {row.label}
                </dt>
                <dd className="font-montreal text-[0.95rem] leading-relaxed text-body-1">
                  {row.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Partners + actions */}
        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <h3 className="font-aeonik text-[1.75rem] font-medium leading-tight tracking-[-0.02em] text-black md:text-[2.25rem]">
              Present at the ceremony
            </h3>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/moments/dad-scholarship-award"
                className="group inline-flex items-center gap-2 rounded-full bg-secondary-black px-6 py-3 font-montreal text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                Read the full story
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/donate/dad-project"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-montreal text-sm font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                Sponsor the next scholar
              </Link>
            </div>
          </div>
          <ul className="grid border-t border-black/10 sm:grid-cols-2 sm:gap-x-8">
            {PARTNERS.map((partner) => (
              <li
                key={partner}
                className="border-b border-black/10 py-4 font-montreal text-[0.95rem] text-body-1"
              >
                {partner}
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
};

export default PioneerSpotlight;
