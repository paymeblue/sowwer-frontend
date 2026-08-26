"use client";

import { Button } from "@components/ui/button";
import JoinUs from "@shared/JoinUs";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// import brand1 from "public/images/brand-1.png";
// import brand2 from "public/images/brand-2.png";
// import brand3 from "public/images/brand-3.png";
// import brand4 from "public/images/brand-4.png";
// import brand5 from "public/images/brand-5.png";
// import brand6 from "public/images/brand-6.png";
import { ReactNode } from "react";
import { Heart2 } from "react-iconly";
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
  img?: StaticImageData;
};

export type WidowCareProgram = {
  pillColor: string;
  pillShadow: string;
  pillText: string;
  hero_title: string;
  hero_subtitle: string;
  hero_img: StaticImageData;
  yellowSection?: ReactNode;
  impact_title?: string;
  impact_subtitle?: string;
  impact_items?: ImpactItem[];
  testimonials?: Testimonial[];
  joinus_img: StaticImageData;
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
    <main className="max-lg:mt-24">
      <section className="flex flex-col-reverse items-center justify-between gap-8 p-4 md:flex-row md:p-10 lg:p-20 xl:p-40">
        <div className="w-full md:w-auto">
          <div
            className={`my-4 flex w-max items-center justify-center gap-2 rounded-full px-4 py-2 md:my-8 md:px-6 md:py-3 ${data.pillShadow}`}
          >
            <div
              className="h-[6px] w-[6px] rounded-full"
              style={{ background: data.pillColor }}
            />
            <h2
              className="font-aeonik text-xs font-medium leading-tight md:text-sm md:leading-[16.1px]"
              style={{ color: data.pillColor }}
            >
              {data.pillText}
            </h2>
          </div>
          <div className="w-full max-w-[650px] md:space-y-8">
            <div className="mb-4 space-y-2">
              <h1 className="w-full max-w-[500px] font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl md:leading-tight lg:text-[45px] lg:leading-[48px]">
                {data.hero_title}
              </h1>
              <p className="font-montreal text-base text-body-2 md:text-lg">
                {data.hero_subtitle}
              </p>
            </div>
            <Link href={`/donate${data.donateRoute}`}>
              <Button className="w-full gap-2 border-input font-montreal text-black sm:w-auto">
                <span>
                  <Heart2 set="bold" size={19} />
                </span>
                <span>Donate now</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex w-full justify-center md:w-auto">
          <Image
            src={data.hero_img}
            width={495}
            height={321}
            alt="hero image"
            placeholder="blur"
            className="aspect-auto h-auto max-w-full object-contain md:max-w-[400px] lg:max-w-[495px]"
          />
        </div>
      </section>
      {data.yellowSection && (
        <section className="flex items-center justify-center gap-4 bg-[#FCF9F2] p-6 sm:p-10 md:p-16 lg:p-20 xl:p-40">
          {data.yellowSection}
        </section>
      )}
      {(data?.testimonials || data?.impact_items) && (
        <section className="p-4 sm:p-8 md:p-12 lg:p-20">
          <div className="w-full max-w-[1037px]">
            <h3 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl md:leading-tight lg:text-[40px] lg:leading-[48px]">
              {data.impact_title}
            </h3>
            <p className="mt-2 font-montreal text-base text-body-2 md:text-lg">
              {data.impact_subtitle}
            </p>
          </div>
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
                    className="relative h-72 w-64 shrink-0 snap-start overflow-hidden rounded-3xl sm:h-80 sm:w-80"
                  >
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 256px, 320px"
                      className={
                        isRemote ? "photo-real object-cover" : "object-cover"
                      }
                      placeholder={isRemote ? "empty" : "blur"}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <p className="absolute bottom-5 left-5 right-5 font-aeonik text-lg font-medium leading-tight text-white sm:text-xl">
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
      <JoinUs img={data.joinus_img} alt={data.joinus_alt} />
    </main>
  );
};

export default Program;
