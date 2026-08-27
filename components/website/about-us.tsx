"use client";

// import { DownloadIcon } from "@components/assets/icons";
import { BentoGrid, BentoGridItem } from "@components/ui/bento-grid";
import { cn } from "@lib/cn";
import BrandPhoto from "@components/shared/BrandPhoto";
import {
  aboutPhotos,
  missionVisionPhotos,
  sitePhotos,
} from "@lib/soowerContent";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dir1 from "public/images/dir-1.png";
import dir10 from "public/images/dir-10.png";
import dir2 from "public/images/dir-2.png";
import dir3 from "public/images/dir-3.png";
import dir4 from "public/images/dir-4.png";
import dir5 from "public/images/dir-5.png";
import dir6 from "public/images/dir-6.png";
import dir7 from "public/images/dir-7.png";
import dir8 from "public/images/dir-8.png";
import dir9 from "public/images/dir-9.png";

const images = [
  {
    key: "1",
    img: sitePhotos.widowPortraitParcel,
    alt: "A widow in Jos holding the food parcel she received from SOOWER",
    kicker: "WidowCare",
    caption: "Food support, delivered hand to hand",
    span: "col-span-2 row-span-3",
  },
  {
    key: "2",
    img: sitePhotos.childrenReceivingShoes,
    alt: "Pupils with the school shoes and materials they received at the Slum-to-School celebration",
    kicker: "The DAD Project",
    caption: "500 children sponsored since 2021",
    span: "col-span-2 row-span-2",
  },
  {
    key: "3",
    img: sitePhotos.missionaryScreening,
    alt: "A missionary being measured at the SOOWER-sponsored medical outreach",
    kicker: "MissionCare",
    caption: "Free screening for 120+ missionaries",
    span: "col-span-1 row-span-2 md:col-span-1",
  },
  {
    key: "4",
    img: sitePhotos.campPortrait,
    alt: "A resident of Durumi IDP Camp during the Christmas Without Tears outreach",
    kicker: "Partnerships",
    caption: "153 displaced households at Durumi",
    span: "col-span-1 row-span-2 md:col-span-1",
  },
];
const cards = [
  {
    key: "1",
    img: sitePhotos.widowsWithSupport,
    alt: "Widows with the food support SOOWER provided in Jos",
    title: "WidowCare",
    description:
      "Financial relief, vocational training and welfare support to help widows rebuild.",
    stat: "156 on monthly support",
    link: "/programs/widow-care",
    span: "md:col-span-2",
  },
  {
    key: "2",
    img: sitePhotos.pupilsGathered,
    alt: "Pupils gathered at the Slum-to-School fifth-year celebration",
    title: "The DAD Project",
    description: "Educational sponsorships giving orphans a future.",
    stat: "205 children in school",
    link: "/programs/dad-project",
    span: "md:col-span-1",
  },
  {
    key: "3",
    img: sitePhotos.screeningUnderBanner,
    alt: "A missionary screened beneath the SOOWER banner at the Mid-Year Missions Conference",
    title: "MissionCare",
    description:
      "Welfare, healthcare and training for missionaries in the field.",
    stat: "120+ screened",
    link: "/programs/mission-care",
    span: "md:col-span-1",
  },
  {
    key: "4",
    img: sitePhotos.partnersTeam,
    alt: "The SOOWER team with partner organisations at the Christmas Without Tears outreach",
    title: "Partnerships",
    description:
      "Joint projects with churches and NGOs that extend the reach of both.",
    stat: "13 partner organisations",
    link: "/programs/partnerships",
    span: "md:col-span-2",
  },
];
const directors = [
  {
    key: "1",
    img: dir1,
    name: "Jonathan Agwunobi",
    position: "Chairman & Co-Founder",
  },
  {
    key: "2",
    img: dir2,
    name: "Lucy Agwunobi",
    position: "Co-Founder",
  },
  {
    key: "3",
    img: dir3,
    name: "Tobenna Nwokike",
    position: "Co-Founder",
  },
  {
    key: "4",
    img: dir4,
    name: "Pastor Regina Nuhu",
    position: "Board Member",
  },
  {
    key: "5",
    img: dir5,
    name: "Engr. Segun Toluhi",
    position: "Board Member",
  },
  {
    key: "6",
    img: dir6,
    name: "Pastor Nkwor Sunday",
    position: "Board Member",
  },
  {
    key: "7",
    img: dir7,
    name: "Major Gen. Charles Ofoche",
    position: "Board Member",
  },
  {
    key: "8",
    img: dir8,
    name: "Ogola Lois Kange",
    position: "Board Member",
  },
  {
    key: "9",
    img: dir9,
    name: "Prof. Imelda Udoh",
    position: "Executive Director",
  },
  {
    key: "10",
    img: dir10,
    name: "Chris A. Umar (SAN)",
    position: "Legal Adviser",
  },
];
const AboutPage = () => {
  return (
    <main className="max-lg:mt-10">
      <section className="relative">
        <div className="absolute left-14 top-[400.58px] h-[108px] w-[522.26px] rotate-[7.66deg] bg-[#B854FF] blur-[450px]" />
        <div className="mx-auto w-full max-w-[920px] px-4 py-16 text-center md:py-40">
          <p className="font-montreal text-sm font-medium leading-[22.99px] text-[#75808A]">
            ABOUT SOOWER
          </p>
          <h1 className="font-aeonik text-3xl font-medium leading-tight text-black md:text-[42px] md:leading-[61px] lg:text-[55px]">
            Spreading God&apos;s Love Through Faith, Generosity, and Compassion
            for Those in Need
          </h1>
        </div>
        {/* Bento: an asymmetric grid of real outreach photography, each cell
            labelled with the programme it belongs to. */}
        <div className="mx-auto grid w-full max-w-[1400px] auto-rows-[7rem] grid-cols-2 gap-3 px-4 sm:auto-rows-[9rem] md:grid-cols-4 md:px-6 lg:auto-rows-[10rem] lg:gap-4 lg:px-20">
          {images.map((image) => (
            <figure
              key={image.key}
              className={cn(
                "group relative overflow-hidden rounded-[1.5rem] bg-grey",
                image.span
              )}
            >
              <Image
                src={image.img}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="photo-real object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 pt-12 md:p-5 md:pt-16">
                <figcaption>
                  <span className="font-montreal text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-primary md:text-[0.68rem] md:tracking-[0.16em]">
                    {image.kicker}
                  </span>
                  <span className="mt-1 block font-aeonik text-sm font-medium leading-tight text-white md:text-base">
                    {image.caption}
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
        <div className="absolute right-0 top-[580.57px] h-[180.11px] w-[310.39px] rotate-[26.72deg] bg-[#34E1FF] blur-[606.7px] lg:left-[1154px]" />
      </section>
      <section className="mx-auto flex w-full max-w-[1560px] flex-col justify-between gap-8 px-4 py-16 sm:px-6 md:py-40 lg:flex-row lg:px-20">
        <p className="header2 w-full max-w-full text-2xl font-medium md:text-3xl lg:max-w-[400px] lg:text-4xl">
          Rooted in faith. Driven by love. Committed to transforming lives
        </p>
        <div className="flex w-full max-w-full flex-col gap-6 lg:max-w-[739px]">
          <p className="font-montreal text-base font-normal leading-relaxed text-body-2 md:text-lg md:leading-[30px]">
            SOOWER is a nonprofit Christian organization (officially registered
            in 2024) dedicated to making a significant difference in the lives
            of orphans, widows and missionaries. We connect donors with churches
            and ministries that offer programs for orphans, widows and missions
            in need of support.
          </p>
          <p className="font-montreal text-base font-normal leading-relaxed text-body-2 md:text-lg md:leading-[30px]">
            We&apos;re on a mission to foster a network of compassion and
            generosity that empowers these vulnerable groups, providing them
            with the resources and support they often need to survive and,
            sometimes, to thrive. Through our innovative platform, we bridge the
            gap between those in need and those who are called to help, ensuring
            that every contribution makes a meaningful impact.
          </p>
          {/* <Link
            href="/#"
            className="flex gap-2 font-montreal text-base leading-[19.2px] text-[#3466FF] underline underline-offset-2"
          >
            <DownloadIcon /> Download organization profile
          </Link> */}
        </div>
      </section>
      {/* The team, and the man who chaired the launch — both pulled from the
          newsletter PDFs' embedded photos rather than a standalone shoot. */}
      <section className="mx-auto w-full max-w-[1560px] px-4 pb-16 sm:px-6 md:pb-24 lg:px-20">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-grey sm:aspect-[16/9]">
            <Image
              src={aboutPhotos.teamHq}
              alt="The SOOWER team at the foundation's Abuja office"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="photo-real object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 sm:p-6">
              <span className="font-montreal text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                The team
              </span>
              <span className="mt-1 block font-aeonik text-lg font-medium text-white sm:text-xl">
                SOOWER, on the ground and behind the scenes
              </span>
            </figcaption>
          </figure>

          <div className="relative flex flex-col justify-center gap-5 rounded-3xl bg-[#FCF9F2] p-6 sm:p-8">
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-grey sm:h-44 sm:w-44">
              <Image
                src={aboutPhotos.cosmasMaduka}
                alt="Dr. Cosmas Maduka, CON, Chairman of Coscharis Group, addressing the SOOWER Foundation launch"
                fill
                sizes="176px"
                className="photo-real object-cover object-[75%_30%]"
              />
            </div>
            <div>
              <p className="font-script text-3xl leading-none text-black sm:text-4xl">
                Chaired by
              </p>
              <p className="mt-2 font-aeonik text-xl font-medium leading-tight text-black sm:text-2xl">
                Dr. Cosmas Maduka, CON
              </p>
              <p className="mt-1 font-montreal text-sm text-body-2">
                Chairman &amp; Founder, Coscharis Group
              </p>
              <p className="mt-3 font-montreal text-sm leading-relaxed text-body-1">
                Dr. Maduka chaired SOOWER&apos;s official launch on May 7, 2025,
                at the NAF Conference Centre, Abuja — the day now marked on the
                foundation&apos;s calendar as &ldquo;SOOWER Day.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-4 mb-12 w-full max-w-[1560px] rounded-3xl bg-[#FCF9F2] px-4 py-10 sm:mx-6 md:py-16 lg:mx-auto">
        <div className="mx-auto flex w-full flex-col items-center justify-around gap-8 lg:flex-row">
          <div className="w-full max-w-full space-y-8 md:space-y-12 lg:max-w-[708px]">
            <div>
              <small className="font-montreal text-[13px] font-medium leading-[22.99px]">
                OUR MISSION
              </small>
              <p className="font-aeonik text-xl leading-tight text-black md:text-2xl md:leading-[35px] lg:text-[1.75rem]">
                "To provide holistic support to widows, orphans and missionaries
                through educational, economic, emotional and spiritual
                assistance, to foster an environment of growth, hope and
                empowerment."
              </p>
            </div>
            <div>
              <small className="font-montreal text-[13px] font-medium leading-[22.99px] text-[#75808A]">
                OUR VISION
              </small>
              <p className="font-aeonik text-xl leading-tight text-black md:text-2xl md:leading-[35px] lg:text-[1.75rem]">
                "We see a world where widows, orphans and marginalized
                communities thrive through compassionate, faith-driven support."
              </p>
            </div>
          </div>
          <BrandPhoto
            photos={missionVisionPhotos}
            variant="soft"
            className="aspect-[4/3] w-full max-w-[26rem] shrink-0 lg:aspect-[4/5] lg:h-[26rem] lg:w-[22rem]"
            sizes="(max-width: 1024px) 100vw, 352px"
          />
        </div>
      </section>
      <section className="bg-[#253031] px-4 py-10 md:py-20">
        <div className="mx-auto w-full max-w-[956px] space-y-5 pb-10 text-center md:pb-20">
          <h2 className="mx-auto w-full max-w-[730px] text-center font-aeonik text-3xl font-medium leading-tight text-white md:text-4xl md:leading-[48px] lg:text-[52px]">
            Alone we can do so little; together we can do so much
          </h2>
          <p className="font-montreal text-base text-[#D7EDEA] md:text-lg">
            Through our carefully designed programs, we provide targeted support
            to widows, orphans, and missionaries, ensuring they receive the care
            and resources they need to thrive. Each initiative is built on the
            foundation of generosity and community, offering individuals and
            organizations an opportunity to make a lasting impact.
          </p>
        </div>
        <BentoGrid className="max-w-[1400px] gap-4 md:auto-rows-[20rem]">
          {cards.map((card) => (
            <BentoGridItem
              key={card.key}
              className={cn(
                "group relative overflow-hidden rounded-[1.5rem] border-white/10 bg-white/5 p-0 hover:shadow-2xl",
                card.span
              )}
              // Everything lives in `header` on purpose: Aceternity's
              // BentoGridItem wraps `title`/`description`/`icon` in an inner
              // div that gets `translate-x-2` on hover. A CSS transform opens
              // a new containing block for descendants, so an absolutely
              // positioned `fill` Image nested inside `title` was re-basing
              // itself against that (near-height-0, since its own children
              // are all position:absolute) wrapper instead of the card —
              // the image collapsed to a sliver on hover. `header` renders
              // directly under the untransformed card root, so `fill` stays
              // anchored to the full card at all times.
              header={
                <>
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="photo-real object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="via-black/35 absolute inset-0 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-500 group-hover:from-black/95" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <span className="font-montreal text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
                      {card.stat}
                    </span>
                    <h4 className="mt-2 font-aeonik text-xl font-medium leading-tight text-white md:text-2xl">
                      {card.title}
                    </h4>
                    <p className="mt-1.5 max-w-[32ch] font-montreal text-sm leading-snug text-white/70">
                      {card.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-montreal text-sm font-medium text-white">
                      Learn more
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                  <Link href={card.link} className="absolute inset-0 z-20">
                    <span className="sr-only">{card.title}</span>
                  </Link>
                </>
              }
            />
          ))}
        </BentoGrid>
      </section>
      <section className="px-4 py-10 sm:px-6 md:py-20 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <h3 className="font-aeonik text-2xl font-medium leading-tight text-black md:text-3xl md:leading-[48px] lg:text-[40px]">
            Our Board of Directors
          </h3>
          <p className="w-full max-w-[1037px] font-montreal text-base text-body-2 md:text-lg">
            At the heart of SOOWER&apos;s mission is a team of visionary leaders
            dedicated to driving impact and transformation. Our Board of
            Directors brings together individuals with deep faith, vast
            experience, and a shared commitment to uplifting lives through
            generosity and service.
          </p>
        </div>
        <div className="mx-auto w-full py-8 md:py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-8 md:gap-y-16">
            {directors.map((director) => (
              <div
                key={director.key}
                className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 sm:w-[calc(50%-16px)] lg:w-[calc(25%-16px)]"
              >
                <Image
                  src={director.img}
                  width={270}
                  height={295}
                  placeholder="blur"
                  alt={director.name}
                  className="h-auto w-full"
                />
                <div className="flex flex-col items-start gap-1">
                  <span className="font-aeonik text-base font-medium leading-tight text-black sm:text-lg md:text-[20px] md:leading-[23px]">
                    {director.name}
                  </span>
                  <span className="font-montreal text-xs leading-tight text-body-2 sm:text-sm md:text-[14px] md:leading-[16.7px]">
                    {director.position}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
