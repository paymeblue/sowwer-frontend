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

const HOW = [
  {
    title: "How the seven were chosen",
    body: "Head of Programs Ms. Ogba Abah explained that scholars were selected through a screening and assessment process that weighed academic performance and vulnerability, with orphanhood as a key criterion. Each had qualified for secondary school but had no sponsor.",
  },
  {
    title: "How progress is followed",
    body: "SOOWER works with the school and caregivers to track each scholar's academic performance, attendance, class progression, personal development and wellbeing, through termly reports, review meetings, welfare check-ins and annual assessments.",
  },
];

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
      revealOnScroll(".ps-card", { trigger: ".ps-cards", stagger: 0.12 });
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
            className="mt-5 font-aeonik text-[2.4rem] font-medium leading-[1.02] tracking-[-0.035em] text-black md:text-[4rem]"
          >
            Seven children.{" "}
            <em className="font-baskervville font-normal italic text-[#C9960C]">
              One shared dream.
            </em>
          </h2>
          <p className="mx-auto mt-6 max-w-[38rem] font-montreal text-base leading-relaxed text-body-2 md:text-lg">
            The DAD 2026 Pioneer Scholarship Award and Induction Ceremony, held
            under the theme &ldquo;Giving a Child a Dream, Giving a Future a
            Chance,&rdquo; marked the start of a commitment to seven young
            lives.
          </p>
        </div>

        {/* Story + photograph */}
        <div className="ps-story mt-16 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div className="space-y-6">
            {STORY.map((para, i) => (
              <p
                key={i}
                className={`ps-para font-montreal text-[1.0625rem] leading-[1.8] text-body-1 ${
                  i === 0
                    ? "first-letter:float-left first-letter:mr-2 first-letter:mt-1.5 first-letter:font-baskervville first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-[#C9960C]"
                    : ""
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          <figure className="ps-photo lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#efe9dc] shadow-[0_30px_70px_-30px_rgba(3,6,33,0.45)]">
              <SmartImage
                src={`${GALLERY}/hero.jpg`}
                alt="Two of the Pioneer DAD Scholars holding the induction ceremony programme"
                fill
                sizes="(max-width: 1024px) 92vw, 42vw"
                className="photo-real object-cover"
              />
            </div>
            <figcaption className="mt-4 font-montreal text-sm text-body-2">
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
        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-2">
          <blockquote className="ps-card rounded-[2rem] bg-[#FCF9F2] p-8 ring-1 ring-black/[0.05] md:p-10">
            <p className="font-baskervville text-[1.75rem] italic leading-[1.25] text-black md:text-[2.1rem]">
              &ldquo;Today, you are receiving. Tomorrow, you should be
              giving.&rdquo;
            </p>
            <footer className="mt-6 font-montreal text-sm text-body-2">
              <span className="font-medium text-black">Prof. Imelda Udoh</span>,
              Executive Director, in her welcome address. She told the scholars
              that a scholarship brings responsibility as well as opportunity,
              and urged them to study diligently, embrace discipline and stay
              resilient.
            </footer>
          </blockquote>
          <blockquote className="ps-card rounded-[2rem] bg-[#FCF9F2] p-8 ring-1 ring-black/[0.05] md:p-10">
            <p className="font-baskervville text-[1.75rem] italic leading-[1.25] text-black md:text-[2.1rem]">
              &ldquo;Your circumstances today do not have to determine your
              tomorrow.&rdquo;
            </p>
            <footer className="mt-6 font-montreal text-sm text-body-2">
              The message of Guest Speaker{" "}
              <span className="font-medium text-black">Mrs. Etima Umeh</span>,
              who gave the Pioneer Seven ten lessons on gratitude, resilience,
              discipline and the value of education.
            </footer>
          </blockquote>
        </div>

        {/* Selection + accountability */}
        <div className="ps-cards mt-6 grid gap-6 md:grid-cols-2">
          {HOW.map((item) => (
            <div
              key={item.title}
              className="ps-card rounded-[2rem] p-8 ring-1 ring-black/[0.08] md:p-10"
            >
              <h3 className="font-aeonik text-xl font-medium tracking-[-0.01em] text-black">
                {item.title}
              </h3>
              <p className="mt-3 font-montreal text-[0.95rem] leading-relaxed text-body-2">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Lessons learned — published openly in the newsletter */}
        <div className="ps-card mt-6 grid gap-8 rounded-[2rem] bg-[#FCF9F2] p-8 ring-1 ring-black/[0.05] md:grid-cols-3 md:p-10">
          {[
            {
              label: "The challenge",
              body: "The candidates first identified did not meet the school's admission requirements, and no reserve candidates had been lined up.",
            },
            {
              label: "What we learned",
              body: "Scholarship selection needs to start earlier, leaving time for screening, school assessments and admission.",
            },
            {
              label: "What changes next cycle",
              body: "SOOWER will identify and screen candidates ahead of admission periods and keep a pool of eligible reserve candidates.",
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-montreal text-xs font-semibold uppercase tracking-[0.16em] text-[#A67C00]">
                {item.label}
              </p>
              <p className="mt-3 font-montreal text-[0.95rem] leading-relaxed text-body-1">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Partners + actions */}
        <div className="mt-16 flex flex-col gap-10 border-t border-black/10 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[46rem]">
            <p className="font-montreal text-xs font-semibold uppercase tracking-[0.16em] text-body-2">
              In the room
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {PARTNERS.map((partner) => (
                <li
                  key={partner}
                  className="rounded-full bg-black/[0.04] px-3.5 py-1.5 font-montreal text-sm text-body-1"
                >
                  {partner}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
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
      </SectionContainer>
    </section>
  );
};

export default PioneerSpotlight;
