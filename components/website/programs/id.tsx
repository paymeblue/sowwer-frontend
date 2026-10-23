"use client";

import SmartImage from "@components/shared/SmartImage";
import VideoPlayer from "@components/shared/VideoPlayer";
import JoinUs from "@shared/JoinUs";
import ImpactBento, { ImpactGroup } from "./ImpactBento";
import { DeckPhoto } from "./PhotoDeck";
import ProgramHero, { HeroStat } from "./ProgramHero";
import Image, { StaticImageData } from "next/image";
// import brand1 from "public/images/brand-1.png";
// import brand2 from "public/images/brand-2.png";
// import brand3 from "public/images/brand-3.png";
// import brand4 from "public/images/brand-4.png";
// import brand5 from "public/images/brand-5.png";
// import brand6 from "public/images/brand-6.png";
import { ReactNode } from "react";
import Slider from "./slider";
// import Slider from "./slider";

export type Project =
  | "widow-care"
  | "dad-project"
  | "mission-care"
  | "partnerships";
type ImpactItem = {
  key: string;
  img: StaticImageData | string;
  alt: string;
  text: string;
};

type Testimonial = {
  key: string;
  testimonial: string;
  author: string;
  img?: StaticImageData | string;
};

export type WidowCareProgram = {
  pillColor: string;
  pillShadow: string;
  pillText: string;
  hero_title: string;
  hero_subtitle: string;
  hero_deck: readonly DeckPhoto[];
  /** Word or phrase inside hero_title set in gold italic. */
  hero_accent?: string;
  hero_stats?: HeroStat[];
  yellowSection?: ReactNode;
  /** Optional feature section between the giving options and the impact. */
  spotlight?: ReactNode;
  impact_title?: string;
  impact_subtitle?: string;
  impact_items?: ImpactItem[];
  /** Event-by-event bento; replaces the flat impact_items strip. */
  impact_groups?: ImpactGroup[];
  impact_video?: { src: string; poster: string; caption: string };
  testimonials?: Testimonial[];
  joinus_img: StaticImageData | string;
  joinus_alt: string;
};
type Props = { data: WidowCareProgram & { donateRoute: string } };
// const brands = [
//   {
//     img: brand1,
//     alt: "Brand 1",
//     width: 143,
//     height: 32.5,
//   },
//   {
//     img: brand2,
//     alt: "Brand 2",
//     width: 70,
//     height: 44,
//   },
//   {
//     img: brand3,
//     alt: "Brand 3",
//     width: 183.64,
//     height: 36.36,
//   },
//   {
//     img: brand4,
//     alt: "Brand 4",
//     width: 119,
//     height: 30,
//   },
//   {
//     img: brand5,
//     alt: "Brand 5",
//     width: 125,
//     height: 40,
//   },
//   {
//     img: brand6,
//     alt: "Brand 6",
//     width: 135.42,
//     height: 32.05,
//   },
// ];

const Program = ({ data }: Props) => {
  return (
    <main>
      <ProgramHero
        pillText={data.pillText}
        pillColor={data.pillColor}
        title={data.hero_title}
        accent={data.hero_accent}
        subtitle={data.hero_subtitle}
        donateRoute={data.donateRoute}
        deck={data.hero_deck}
        stats={data.hero_stats}
      />
      {data.yellowSection && (
        <section className="flex items-center justify-center gap-4 border-t border-black/[0.05] bg-[#FCF9F2] px-4 py-20 md:px-10 md:py-28 lg:px-20">
          {data.yellowSection}
        </section>
      )}
      {data.spotlight}
      {(data?.testimonials || data?.impact_items || data?.impact_groups) && (
        <section className="bg-white px-4 py-20 sm:px-8 md:px-12 md:py-28 lg:px-20">
          <div className="mx-auto w-full max-w-[52rem] text-center">
            <span className="block font-montreal text-xs font-semibold uppercase tracking-[0.2em] text-[#A67C00]">
              Our impact
            </span>
            <h2 className="mt-4 font-aeonik text-[2.1rem] font-medium leading-[1.05] tracking-[-0.03em] text-black md:text-5xl">
              {data.impact_title}
            </h2>
            <p className="mx-auto mt-5 max-w-[40rem] font-montreal text-base leading-relaxed text-body-2 md:text-lg">
              {data.impact_subtitle}
            </p>
          </div>
          {data.impact_video && (
            <div className="mt-12 md:mt-16">
              <VideoPlayer {...data.impact_video} meta="Watch the film" />
            </div>
          )}
          {data.impact_groups?.length ? (
            <div className="mx-auto mt-20 max-w-[1280px] md:mt-28">
              <ImpactBento groups={data.impact_groups} />
            </div>
          ) : null}
          {data?.impact_items && data.impact_items.length === 1 && (
            <div className="my-8 flex flex-col items-center gap-6 md:my-16 md:flex-row md:gap-4">
              {data.impact_items.map((item) => {
                const isRemote = typeof item.img === "string";
                return (
                  <div key={item.key} className="relative w-full md:w-auto">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      className={
                        isRemote
                          ? "photo-real h-auto w-full object-cover"
                          : "h-auto w-full object-contain"
                      }
                      width={585}
                      height={515}
                      placeholder={isRemote ? "empty" : "blur"}
                    />
                    <p className="absolute bottom-4 left-4 w-full max-w-[300px] font-aeonik text-xl font-medium leading-tight text-white sm:text-2xl md:bottom-8 md:left-8 md:max-w-[450px] md:text-3xl md:leading-7 lg:text-[30px]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {data?.impact_items && data.impact_items.length > 1 && (
            <div className="scrollbar-none my-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 md:my-16">
              {data.impact_items.map((item) => {
                const isRemote = typeof item.img === "string";
                return (
                  <div
                    key={item.key}
                    className="impact-tile group relative h-[24rem] w-[17rem] shrink-0 snap-start overflow-hidden rounded-3xl bg-grey sm:h-[30rem] sm:w-[22rem] lg:h-[34rem] lg:w-[25rem]"
                  >
                    {isRemote ? (
                      <SmartImage
                        src={item.img}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 272px, (max-width: 1024px) 352px, 400px"
                        className="photo-real object-cover group-hover:scale-[1.04]"
                      />
                    ) : (
                      <Image
                        src={item.img}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 272px, (max-width: 1024px) 352px, 400px"
                        className="object-cover"
                        placeholder="blur"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <p className="absolute bottom-6 left-6 right-6 font-aeonik text-lg font-medium leading-snug text-white sm:text-xl">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          <Slider data={data.testimonials} />
          {/* <div className="mx-auto w-full max-w-[1151.06px] pb-8 pt-10 md:pb-12 md:pt-20">
          <p className="text-center font-aeonik text-xl font-medium leading-tight text-black sm:text-2xl md:text-3xl md:leading-[36.8px] lg:text-[32px]">
            Churches and faith-based nonprofits partnering with us:
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:justify-between md:gap-4">
            {brands.map((brand) => (
              <Image
                key={brand.alt}
                src={brand.img}
                alt={brand.alt}
                width={brand.width}
                height={brand.height}
                className="h-auto object-contain"
                placeholder="blur"
              />
            ))}
          </div>
        </div> */}
        </section>
      )}
      <JoinUs
        img={data.joinus_img}
        alt={data.joinus_alt}
        caption={{ kicker: "From the field", title: data.joinus_alt }}
      />
    </main>
  );
};

export default Program;
