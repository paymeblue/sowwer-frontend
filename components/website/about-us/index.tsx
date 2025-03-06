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
    link: "/website/programs/widow-care",
  },
  {
    key: "2",
    img: img8,
    title: "The DAD Project",
    description: "Giving orphans a future through educational sponsorships.",
    link: "/website/programs/dad-project",
  },
  {
    key: "3",
    img: img9,
    title: "MissionCare",
    description: "Supporting missionaries with resources to spread the gospel.",
    link: "/website/programs/mission-care",
  },
  // {
  //   key: "4",
  //   img: img7,
  //   title: "Partnerships",
  //   description:
  //     "Collaborating with other organizations to support those in need of assistance.",
  //   link: "/website/programs/partnerships",
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
    <main>
      <section className="bg-soft-gradient">
        <div className="mx-auto w-full max-w-[920px] py-40 text-center">
          <p className="font-montreal text-sm font-medium leading-[22.99px] text-[#75808A]">
            ABOUT SOOWER
          </p>
          <h1 className="font-aeonik text-[55px] font-medium leading-[61px] text-black">
            Spreading God&apos;s Love Through Faith, Generosity, and Compassion
            for Those in Need
          </h1>
        </div>
        <div className="flex flex-wrap items-end justify-between">
          {images.map((image) => (
            <div key={image.key} className="relative">
              <Image
                src={image.img}
                alt={image.key}
                width={305}
                placeholder="blur"
                className="aspect-auto w-full"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="flex w-full justify-between gap-4 px-36 py-40">
        <p className="header2 w-full max-w-[400px]">
          Rooted in faith. Driven by love. Committed to transforming lives
        </p>
        <div className="flex w-full max-w-[739px] flex-col gap-6">
          <p className="font-montreal text-lg font-normal leading-[30px] text-body-2">
            SOOWER is a nonprofit Christian organization (officially registered
            in 2024) dedicated to making a significant difference in the lives
            of orphans, widows and missionaries. We connect donors with churches
            and ministries that offer programs for orphans, widows and missions
            in need of support.
          </p>
          <p className="font-montreal text-lg font-normal leading-[30px] text-body-2">
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
      <section className="mx-6 mb-12 rounded-3xl bg-[#FCF9F2] px-0 py-16">
        <div className="mx-auto flex w-full items-center justify-around">
          <div className="w-full max-w-[708px]">
            <div>
              <small className="font-montreal text-[13px] font-medium leading-[22.99px]">
                OUR MISSION
              </small>
              <p className="font-aeonik text-[1.75rem] leading-[35px] text-black">
                “To provide holistic support to widows, orphans and missionaries
                through educational, economic, emotional and spiritual
                assistance, to foster an environment of growth, hope and
                empowerment.”
              </p>
            </div>
            <div>
              <small className="font-montreal text-[13px] font-medium leading-[22.99px] text-[#75808A]">
                OUR VISION
              </small>
              <p className="font-aeonik text-[1.75rem] leading-[35px] text-black">
                “We see a world where widows, orphans and marginalized
                communities thrive through compassionate, faith-driven support.”
              </p>
            </div>
          </div>
          <div>
            <Image
              src={img6}
              alt="happy woman and child"
              className="object-contain"
              width={456.57}
              height={497.67}
              placeholder="blur"
            />
          </div>
        </div>
      </section>
      <section className="bg-[#253031] py-20">
        <div className="mx-auto w-full max-w-[956px] space-y-5 pb-20 text-center">
          <h2 className="mx-auto w-full max-w-[730px] text-center font-aeonik text-[52px] font-medium leading-[48px] text-white">
            Alone we can do so little; together we can do so much
          </h2>
          <p className="font-montreal text-lg text-[#D7EDEA]">
            Through our carefully designed programs, we provide targeted support
            to widows, orphans, and missionaries, ensuring they receive the care
            and resources they need to thrive. Each initiative is built on the
            foundation of generosity and community, offering individuals and
            organizations an opportunity to make a lasting impact.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          {cards.map((card) => (
            <div
              key={card.key}
              className="flex w-full max-w-[463px]  items-center justify-between gap-5 rounded-xl bg-white p-4"
            >
              <Image
                src={card.img}
                width={176}
                height={150}
                placeholder="blur"
                alt="WidowCare"
              />
              <div className="flex flex-col items-end justify-center gap-6">
                <div className="flex flex-col">
                  <span className="font-aeonik text-[22px] font-medium leading-[25.3px] text-black">
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
      <section className="p-20">
        <div className="w-full max-w-[1037px]">
          <h3 className="font-aeonik text-[40px] font-medium leading-[48px] text-black">
            Our Board of Directors
          </h3>
          <p className="font-montreal text-lg text-body-2">
            At the heart of SOOWER&apos;s mission is a team of visionary leaders
            dedicated to driving impact and transformation. Our Board of
            Directors brings together individuals with deep faith, vast
            experience, and a shared commitment to uplifting lives through
            generosity and service.
          </p>
        </div>
        <div className="mx-auto w-full py-16">
          <div className="mx-auto flex w-full flex-wrap items-center gap-x-4 gap-y-16">
            {directors.map((director) => (
              <div
                key={director.key}
                className="flex flex-col gap-4 rounded-xl bg-white p-4"
              >
                <Image
                  src={director.img}
                  width={270}
                  height={295}
                  placeholder="blur"
                  alt={director.name}
                />
                <div className="flex flex-col items-start gap-1">
                  <span className="font-aeonik text-[20px] font-medium leading-[23px] text-black">
                    {director.name}
                  </span>
                  <span className="font-montreal text-[14px] leading-[16.7px] text-body-2">
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
