import { TickIcon } from "@components/assets/icons";
import JsonLd from "@components/shared/JsonLd";
import { Button } from "@components/ui/button";
import PioneerSpotlight from "@components/website/programs/dad/PioneerSpotlight";
import SponsorshipOptions from "@components/website/programs/dad/SponsorshipOptions";
import { Project, WidowCareProgram } from "@components/website/programs/id";
import { formatText } from "@lib/functions";
import { momentBySlug } from "@lib/momentsContent";
import { programDecks, sitePhotos, widowGallery } from "@lib/soowerContent";
import { SITE_URL, breadcrumbJsonLd } from "@lib/siteMeta";
import { ArrowRight, Quote } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";

const scholarshipAward = momentBySlug("dad-scholarship-award")!;
const slumToSchool = momentBySlug("slum-to-school")!;

const ProgramPage = dynamic(() => import("@components/website/programs/id"));

type Props = {
  params: Promise<{ id: Project }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { id } = await params;
  const program = programs[id];
  if (!program) return { title: `${formatText(id)} - Program` };

  const path = `/programs/${id}`;
  const image = program.hero_deck[0];

  return {
    title: `${program.pillText} — ${program.hero_title}`,
    description: program.hero_subtitle,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      title: `${program.pillText} — ${program.hero_title}`,
      description: program.hero_subtitle,
      images: [{ url: image.src, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${program.pillText} — ${program.hero_title}`,
      description: program.hero_subtitle,
      images: [image.src],
    },
  };
};
type Programs = Record<Project, WidowCareProgram & { donateRoute: string }>;
const programs: Programs = {
  "widow-care": {
    pillColor: "#2F085A",
    pillShadow: "shadow-widow_care",
    donateRoute: "/widow-care",
    pillText: "WidowCare",
    hero_title: "Helping widows rebuild their lives",
    hero_subtitle:
      "Losing a spouse can leave a woman vulnerable, but no widow should have to struggle alone. Our WidowCare program provides financial relief, vocational training, and emotional support to help women regain stability and rebuild their lives with dignity.",
    hero_deck: programDecks["widow-care"],
    yellowSection: (
      <div className="px-4 md:px-6 lg:px-0">
        <p className="text-center font-aeonik text-xl leading-tight text-black sm:text-2xl md:text-3xl md:leading-[48px] lg:text-[32px]">
          The SOOWER Foundation widows list has grown to
          <b>&nbsp;169 widows and counting.</b>
        </p>
        <p className="mx-auto mt-4 w-full max-w-[1091px] text-center font-aeonik text-xl leading-tight text-black sm:text-2xl md:mt-0 md:text-3xl md:leading-[52px] lg:text-[32px]">
          By addressing both their immediate and long-term needs, our WidowCare
          program empowers women to heal, thrive, and build a future filled with
          renewed hope and purpose.
        </p>
      </div>
    ),
    impact_title: "Discover our impact through WidowCare",
    impact_subtitle:
      "Explore some of our past projects that have empowered widows with financial support, vocational training, and community care. Each initiative reflects our commitment to restoring dignity, hope, and independence, one widow at a time.",
    impact_items: widowGallery.map((photo) => ({
      key: photo.key,
      img: photo.src,
      alt: photo.alt,
      text: photo.text,
    })),
    testimonials: [
      {
        key: "1",
        testimonial:
          "My family is grateful to SOOWER Foundation. I needed to start a small business to support my kids and the money came in at the right time. I used the money to start my kunu business.",
        author: "Mrs. Esther Kyari Dauda",
      },
      {
        key: "2",
        testimonial:
          "I am one of the beneficiaries of SOOWER's support and I am thankful for the foundation for supporting my family.",
        author: "Mrs. Mary Fatima Egbe",
      },
    ],
    joinus_img: sitePhotos.widowsWide,
    joinus_alt:
      "Widows gathered with SOOWER welfare parcels at the Jos Widows & Youth Conference",
  },
  "dad-project": {
    pillColor: "#FAB80F",
    pillShadow: "shadow-dad_project",
    donateRoute: "/dad-project",
    pillText: "The DAD Project",
    hero_title: "Giving orphans a future through educational sponsorships",
    hero_accent: "future",
    // Figures from SOOWER Newsletter Vol 2 Issue 3 (September 2026).
    hero_stats: [
      { value: "7", label: "Pioneer DAD Scholars inducted in 2026" },
      { value: "JSS 1", label: "Where the Pioneer Seven began" },
      { value: "6 yrs", label: "Intended secondary support per scholar" },
    ],
    hero_subtitle:
      "Every child deserves the opportunity to learn, grow, and dream. The Donate A Dream (DAD) Project is dedicated to providing full or partial educational sponsorships for orphans, ensuring they have access to quality education and the chance for a brighter future. Whether through full adoption or pooled donations, every contribution helps shape a child's destiny.",
    hero_deck: programDecks["dad-project"],
    yellowSection: <SponsorshipOptions />,
    spotlight: <PioneerSpotlight />,
    impact_title: "Discover our impact through the DAD Project",
    impact_subtitle:
      "Real moments from the classrooms and ceremonies the DAD Project has reached, from the Pioneer Scholars' induction to five years of Slum-to-School.",
    impact_video: scholarshipAward.video,
    impact_groups: [
      {
        key: "dad-scholarship-award",
        title: scholarshipAward.title,
        date: scholarshipAward.date,
        location: scholarshipAward.location,
        href: `/moments/${scholarshipAward.slug}`,
        // The ceremony hero is already on this page in the spotlight, so the
        // bento leads with a different frame.
        photos: scholarshipAward.gallery.slice(1),
      },
      {
        key: "slum-to-school",
        title: slumToSchool.title,
        date: slumToSchool.date,
        location: slumToSchool.location,
        href: `/moments/${slumToSchool.slug}`,
        photos: slumToSchool.gallery,
      },
    ],
    // testimonials: [
    //   {
    //     key: "1",
    //     testimonial:
    //       "Lorem ipsum dolor sit amet consectetur. Quis tortor tempus sit volutpat egestas duis malesuada vulputate. Egestas diam at ut scelerisque nullam convallis. Dui porttitor sed ac habitasse tincidunt.",
    //     author: "Mr. John Doe",
    //   },
    //   {
    //     key: "2",
    //     img: testifier,
    //     testimonial:
    //       "I am one of the beneficiaries of SOOWER's support and I am thankful for the foundation for supporting my family.",
    //     author: "Mrs. Mary Fatima Egbe",
    //   },
    // ],
    joinus_img: sitePhotos.schoolWide,
    joinus_alt:
      "Pupils gathered at the Slum-to-School fifth-year celebration in Mabushi, Abuja",
  },
  "mission-care": {
    pillColor: "#3466FF",
    pillShadow: "shadow-mission_care",
    donateRoute: "/mission-care",
    pillText: "MissionCare",
    hero_title: "Supporting missionaries to spread the gospel",
    hero_subtitle:
      "Through MissionCare, we equip and sustain missionaries who dedicate their lives to spreading the Gospel in underserved communities. We provide them with financial aid, essential supplies, and spiritual encouragement, ensuring they can continue their mission with strength and purpose.",
    hero_deck: programDecks["mission-care"],
    yellowSection: (
      <div className="w-full px-4 md:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[1150px] space-y-3">
          <span className="eyebrow block text-center">MissionCare</span>
          <p className="mx-auto text-center font-aeonik text-xl leading-tight text-black sm:text-2xl md:text-3xl md:leading-[1.3] lg:text-[2rem]">
            We recognize the selfless sacrifices of missionaries who carry the
            message of hope and faith into underserved and often forgotten
            communities. Through MissionCare, we partner with churches and
            individuals to provide practical support to those serving on the
            frontlines of ministry.
          </p>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[1150px] gap-6 md:mt-14 md:grid-cols-[1.2fr_1fr] md:gap-8">
          <blockquote className="relative flex flex-col justify-between gap-6 rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_2px_18px_-6px_rgba(3,6,33,0.1)] sm:p-8">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/[0.15]">
              <Quote className="text-primary" size={18} />
            </span>
            <p className="font-baskervville text-lg italic leading-relaxed text-body-1 sm:text-xl">
              Compassion is the engine of commission. They challenged the
              paradox of full churches and few labourers, urging missionaries to
              truly see individuals as Jesus does.
            </p>
            <footer className="border-t border-black/[0.08] pt-4 font-montreal text-sm text-body-2">
              <span className="block font-aeonik text-base font-medium text-black">
                Rev. Sam Tukura &amp; Pst. Daniel Daku Wumani
              </span>
              Army of God Gospel Outreach
              <span className="mt-0.5 block text-xs uppercase tracking-[0.1em] text-primary">
                Mission Congress, March 2026
              </span>
            </footer>
          </blockquote>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                value: "45",
                label: "Missionaries trained in trauma-informed care",
              },
              { value: "120+", label: "Given free health screening at FWC" },
              { value: "188", label: "At the March 2026 Mission Congress" },
              { value: "40", label: "Housed for a 5-day missions training" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/10 bg-white p-5 text-center shadow-[0_2px_18px_-6px_rgba(3,6,33,0.1)] sm:text-left"
              >
                <p className="font-aeonik text-2xl font-medium text-primary sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-montreal text-xs leading-snug text-body-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    impact_title: "Discover our impact through MissionCare",
    impact_subtitle:
      "Through MissionCare, we have empowered missionaries and supported communities in need, ensuring the Gospel reaches even the most remote areas. Here are some of the impactful projects we've carried out:",
    impact_items: [
      {
        key: "1",
        img: sitePhotos.bloodScreening,
        alt: "Blood samples taken for cholesterol screening at the SOOWER medical outreach",
        text: "Free HPV and cholesterol screening for 120+ missionaries and widows",
      },
      {
        key: "2",
        img: sitePhotos.congressGroup,
        alt: "Missionaries gathered for a group photograph at the Mission Congress",
        text: "Accommodation and materials for missionaries in training",
      },
      {
        key: "3",
        img: sitePhotos.congressMaterials,
        alt: "Missionaries filling out training materials at a Mission Congress breakout session",
        text: "Breakout sessions equipping missionaries for the field",
      },
      {
        key: "4",
        img: sitePhotos.missionaryHeightCheck,
        alt: "A missionary's height measured at the SOOWER-sponsored medical outreach",
        text: "Full health checks for missionaries and their families",
      },
      {
        key: "5",
        img: sitePhotos.congressDiscussion,
        alt: "A missionary contributing to an open floor discussion at the Mission Congress",
        text: "Open floor discussions on the challenges missionaries face",
      },
    ],
    // testimonials: [
    //   {
    //     key: "1",
    //     testimonial:
    //       "Lorem ipsum dolor sit amet consectetur. Quis tortor tempus sit volutpat egestas duis malesuada vulputate. Egestas diam at ut scelerisque nullam convallis. Dui porttitor sed ac habitasse tincidunt.",
    //     author: "Mr. John Doe",
    //   },
    // ],
    joinus_img: sitePhotos.congressWide,
    joinus_alt:
      "Missionaries gathered at the Army of God Gospel Outreach Mission Congress",
  },
  partnerships: {
    pillColor: "#1AA551",
    pillShadow: "shadow-partnerships",
    pillText: "Partnerships",
    donateRoute: "/general-giving",
    hero_title:
      "Collaborating with other ministries to support their projects.",
    hero_subtitle:
      "At Soower, we believe in the power of collaboration to create lasting change. Through our Partnerships Program, we work alongside ministries that are making a difference—helping them secure the resources they need to continue their mission.",
    hero_deck: programDecks.partnerships,
    yellowSection: (
      <div className="px-4 md:px-6 lg:px-0">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-20">
          <div className="w-full max-w-full space-y-2 lg:max-w-[509px]">
            <h1 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-[35px] md:leading-[40px]">
              Are you a ministry with widow, orphan or mission programs? Join
              our registry today!
            </h1>
            <p className="font-montreal text-base text-body-2 md:text-lg">
              With SOOWER, Churches and Christian Organizations have the
              opportunity to raise funds for various projects tailored to
              support widows, orphans and missionaries across Nigeria.
            </p>
          </div>
          <div className="w-full max-w-full rounded-3xl bg-white p-4 sm:p-6 md:p-8 lg:max-w-[539px]">
            <p className="font-aeonik text-xl font-medium leading-tight text-black md:text-[22px] md:leading-[25.3px]">
              Here&apos;s how it works:
            </p>
            <ul className="mb-6 mt-3 space-y-2 md:mb-8">
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  <b className="font-medium">Register as a Ministry:&nbsp;</b>
                  Ministries, i.e, Churches and Christian Organizations can join
                  the SOOWER registry to partner with us.
                </span>
              </li>
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  <b className="font-medium">Raise Funds for a Cause:&nbsp;</b>
                  Choose to receive support for your ministry&apos;s operations
                  or for a specific project tailored for widows, orphans or
                  missionaries.
                </span>
              </li>
              <li className="flex items-start gap-2 font-montreal text-sm leading-tight text-body-1 md:text-[15px] md:leading-[20px]">
                <span className="mt-0.5 flex-shrink-0 md:mt-0">
                  <TickIcon />
                </span>
                <span>
                  <b className="font-medium">Share Impact:&nbsp;</b>
                  Share updates and testimonies, allowing donors to see the
                  impact of their contributions.
                </span>
              </li>
            </ul>
            <Link href="/registry/widow">
              <Button
                variant="outline"
                className="w-full gap-2 border-input font-montreal text-black md:w-auto"
              >
                <span>Join the registry</span>
                <span>
                  <ArrowRight size={16} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    ),
    // impact_title: "Discover our impact through partnerships",
    // impact_subtitle:
    //   "Through strategic partnerships, we join hands with other ministries, i.e, churches and christian organizations dedicated to supporting widows, orphans and missionaries. Discover how our collaborations have made a difference and see the incredible work we've accomplished together.",
    // impact_items: [
    //   {
    //     key: "1",
    //     img: img5,
    //     alt: "images",
    //     text: "This will be a header text about a partnership",
    //   },
    //   {
    //     key: "2",
    //     img: img6,
    //     alt: "images",
    //     text: "This will be a header text about a partnership",
    //   },
    // ],
    // testimonials: [
    //   {
    //     key: "1",
    //     testimonial:
    //       "Lorem ipsum dolor sit amet consectetur. Quis tortor tempus sit volutpat egestas duis malesuada vulputate. Egestas diam at ut scelerisque nullam convallis. Dui porttitor sed ac habitasse tincidunt.",
    //     author: "Light Walk and Work Mission International",
    //   },
    // ],
    joinus_img: sitePhotos.vocationalWide,
    joinus_alt:
      "Participants at the literacy and vocational support intervention in Galadimawa, Abuja",
  },
};

const Program = ({ params }: { params: { id: Project } }) => {
  const { id } = params;
  const program = programs[id];
  if (!program) notFound();

  const path = `/programs/${id}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${SITE_URL}${path}#program`,
          name: program.pillText,
          serviceType: "Charitable programme",
          description: program.hero_subtitle,
          url: `${SITE_URL}${path}`,
          image: program.hero_deck[0].src,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "Country", name: "Nigeria" },
          isRelatedTo: `${SITE_URL}/donate${program.donateRoute}`,
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Programs", path: "/programs/widow-care" },
          { name: program.pillText, path },
        ])}
      />
      <ProgramPage data={program} />
    </>
  );
};

export default Program;
