"use client";

import { DownloadIcon } from "@components/assets/icons";
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
import img1 from "public/images/img-10.png";
import img2 from "public/images/img-11.png";
import img3 from "public/images/img-12.png";
import img4 from "public/images/img-13.png";
import img5 from "public/images/img-14.png";
import img6 from "public/images/img-15.png";
import img7 from "public/images/img-16.png";
import img8 from "public/images/img-17.png";
import img9 from "public/images/img-18.png";

const images = [
  {
    key: "1",
    img: img1,
  },
  {
    key: "2",
    img: img2,
  },
  {
    key: "3",
    img: img3,
  },
  {
    key: "4",
    img: img4,
  },
  {
    key: "5",
    img: img5,
  },
];
const cards = [
  {
    key: "1",
    img: img7,
    title: "WidowCare",
    description:
      "Providing financial aid and support to help widows rebuild their lives.",
    link: "/programs/widow-care",
  },
  {
    key: "2",
    img: img8,
    title: "The DAD Project",
    description: "Giving orphans a future through educational sponsorships.",
    link: "/programs/dad-project",
  },
  {
    key: "3",
    img: img9,
    title: "MissionCare",
    description: "Supporting missionaries with resources to spread the gospel.",
    link: "/programs/mission-care",
  },
  // {
  //   key: "4",
  //   img: img7,
  //   title: "Partnerships",
  //   description:
  //     "Collaborating with other organizations to support those in need of assistance.",
  //   link: "/programs/partnerships",
  // },
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
        <div className="mx-auto flex w-full max-w-[1560px] flex-wrap items-center justify-center gap-4 px-4 lg:items-end lg:justify-between">
          {images.map((image) => (
            <div key={image.key} className="w-full max-w-[300px] sm:w-auto">
              <Image
                src={image.img}
                alt={image.key}
                width={305}
                placeholder="blur"
                className="aspect-auto h-auto w-full"
              />
            </div>
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
          <Link
            href="/#"
            className="flex gap-2 font-montreal text-base leading-[19.2px] text-[#3466FF] underline underline-offset-2"
          >
            <DownloadIcon /> Download organization profile
          </Link>
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
          <div className="w-full max-w-[300px] lg:max-w-none">
            <Image
              src={img6}
              alt="happy woman and child"
              className="h-auto w-full object-contain"
              width={456.57}
              height={497.67}
              placeholder="blur"
            />
          </div>
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
        <div className="flex flex-col flex-wrap items-center justify-center gap-6 md:flex-row">
          {cards.map((card) => (
            <div
              key={card.key}
              className="flex w-full max-w-[463px] flex-col items-center justify-between gap-5 rounded-xl bg-white p-4 sm:flex-row"
            >
              <Image
                src={card.img}
                width={176}
                height={150}
                placeholder="blur"
                alt="WidowCare"
                className="h-auto w-full max-w-[176px] sm:w-auto"
              />
              <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:mt-0 sm:items-end sm:gap-6">
                <div className="flex flex-col text-center sm:text-right">
                  <span className="font-aeonik text-xl font-medium leading-tight text-black md:text-[22px] md:leading-[25.3px]">
                    {card.title}
                  </span>
                  <span className="font-montreal text-[15px] leading-[19px] text-body-2">
                    {card.description}
                  </span>
                </div>
                <Link
                  href={card.link}
                  className="rounded-full border border-[#DADADA] p-2"
                >
                  <ArrowUpRight strokeWidth={1.25} color="#333333" />
                </Link>
              </div>
            </div>
          ))}
        </div>
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
