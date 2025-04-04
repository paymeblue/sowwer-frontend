"use client";

import { Button } from "@components/ui/button";
import JoinUs from "@shared/JoinUs";
import { motion } from "framer-motion";
import {
  cardContainerVariant,
  cardItemVariant,
  DEFAULT_VIEWPORT,
  defaultVariant,
} from "lib/variants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import bigSpiral from "public/assets/images/circular_dotted_lines.svg";
import homeBg from "public/images/home-bg.png";
import img1 from "public/images/img-1.png";
import img2 from "public/images/img-2.png";
import img3 from "public/images/img-3.png";
import img4 from "public/images/img-4.png";
import img5 from "public/images/img-5.png";
import img6 from "public/images/img-6.png";
import img7 from "public/images/img-7.png";
import img8 from "public/images/img-8.png";
import img9 from "public/images/img-9.png";
import spiral from "public/images/spiral.png";
import { Heart2 } from "react-iconly";
import FAQs from "./FAQs";

const effectOfGiving = [
  {
    image: img6,
    title: "Ministries",
    desc: "The ripple effect of giving emanates from their dedicated work, strengthening their ability to serve their communities, share the gospel, and expand their outreach.",
  },
  {
    image: img7,
    title: "Donors",
    desc: "Your generosity doesn't just help those in need; it also triggers a chain reaction of giving, inspiring compassion in others, and amplifying the overall influence of your contribution.",
  },
  {
    image: img8,
    title: "Impact",
    desc: "Each donation, no matter how small, amplifies the impact of our mission, transforming lives, and spreading God's love far and wide, making a lasting difference in the world.",
  },
];
const list = [
  {
    key: "1",
    img: img2,
    title: "WidowCare",
    desc: "Providing financial aid and support to help widows rebuild their lives.",
  },

  {
    key: "2",
    img: img3,
    title: "The DAD Project",
    desc: "Giving orphans a future through educational sponsorships.",
  },
  {
    key: "3",
    img: img4,
    title: "MissionCare",
    desc: "Supporting missionaries with resources to spread the gospel.",
  },
  {
    key: "4",
    img: img5,
    title: "Partnerships",
    desc: "Collaborating with other ministries to support their projects.",
  },
];

const HomePage = () => {
  return (
    <main>
      <section className="relative w-full lg:h-screen 2xl:h-[49.125rem]">
        <Image
          src={homeBg}
          alt="happy woman"
          fill
          placeholder="blur"
          className="mx-auto aspect-auto object-cover"
        />
        <div className="absolute left-[6.25rem] top-1/2 w-full max-w-[41.625rem] -translate-y-1/2 space-y-6 text-white">
          <h2 className="w-full max-w-[36.0625rem] font-aeonik text-[4.0625rem] font-medium leading-[3.9375rem] ">
            Transforming lives with love and faith-driven support
          </h2>
          <div className="w-full max-w-[34.3125rem]">
            <p className="font-baskervville text-[1.25rem] italic leading-[1.875rem]">
              "Religion that God our Father accepts as pure and faultless is
              this: to look after orphans and widows in their distress and to
              keep oneself from being polluted by the world."
            </p>
            <span className="font-montreal text-sm leading-6">
              — James 1:27 (NIV)
            </span>
          </div>
          <Button className="gap-2 border-input font-montreal text-black">
            <span>
              <Heart2 set="bold" size={19} />
            </span>
            <span>Donate now</span>
          </Button>
        </div>
      </section>
      <section className="max-[94.5rem] flex w-full items-center justify-center gap-24 p-[6.25rem]">
        <div className="relative">
          <Image
            src={img1}
            alt="happy helping group of people"
            width={511}
            height={483}
            className="aspect-square"
          />
          <Image
            src={spiral}
            alt="spiral"
            height={98.09}
            width={98.09}
            className="absolute -bottom-10 -right-10 z-[-1]"
          />
        </div>
        <div className="w-full max-w-[41.625rem] space-y-6">
          <h2 className="header w-full max-w-[38.5625rem]">
            Perfectly positioned to lend a helping hand
          </h2>
          <p className="font-montreal text-lg leading-8">
            SOOWER is a nonprofit Christian organization dedicated to making a
            significant difference in the lives of orphans, widows and
            missionaries. We believe that we are all called to be a beacon of
            hope and compassion in the world. Our mission is to foster a network
            of compassion and generosity that empowers these vulnerable groups,
            providing them with the resources and support they often need to
            survive and, sometimes, to thrive. Together, we can be the hands and
            feet of Christ, spreading love, kindness, and assistance to those
            who require it most.
          </p>
          <Button
            variant="outline"
            className="group gap-2 border-input font-montreal text-black"
          >
            <span>Learn more</span>
            <span className="transition-transform duration-300 group-hover:right-4">
              <ArrowRight size={14} />
            </span>
          </Button>
        </div>
      </section>
      <section
        className="max-[94.5rem] flex w-full flex-col items-center
      justify-center gap-12 bg-[#FCF9F2] p-[6.25rem] pt-16"
      >
        <h3 className="font-aeonik text-[2.8125rem] font-medium leading-[3rem] text-black">
          Making a lasting impact
        </h3>
        <ul className="grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-2 lg:grid-cols-4 ">
          {list.map((item) => (
            <li key={item.key} className="space-y-4 rounded-3xl bg-white">
              <Image src={item.img} alt={item.title} className="" />
              <div className="space-y-16 p-6 pt-0">
                <div className="space-y-1">
                  <h4 className="font-aeonik text-2xl font-medium leading-[1.725rem] text-black">
                    {item.title}
                  </h4>
                  <p className="font-montreal text-base leading-[1.3125rem] text-body-2">
                    {item.desc}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  className="group gap-2 border-input font-montreal text-black"
                >
                  <span>Learn more</span>
                  <span className="transition-transform duration-300 group-hover:right-4">
                    <ArrowRight size={14} />
                  </span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <motion.section
        variants={defaultVariant({ delay: 0.5 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="relative my-12 flex items-center justify-center"
        aria-label="Ripple Effect of Giving"
      >
        <Image
          src={bigSpiral}
          alt="Background spiral"
          width={927}
          height={927}
          className="-z-10 object-cover lg:object-contain"
        />
        <div className="absolute top-1/2 -translate-y-1/2 p-[100px]">
          <motion.div className="flex w-full max-w-[799px] flex-col space-y-3">
            <h2 className="font-aeonik text-[1.8rem] leading-[2.2rem] text-black lg:text-[45px] lg:leading-[3rem]">
              The Ripple Effect of Giving
            </h2>
            <p className="font-montreal text-lg text-body-2">
              When you give with a generous heart, your act of kindness creates
              a ripple effect of love and positivity that extends far beyond the
              initial gift. You&apos;re not only transforming individual lives
              but also igniting a chain reaction of hope, inspiring others to
              join in spreading God's love and making a difference in the world.
            </p>
          </motion.div>
          <motion.div
            variants={cardContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 gap-14 lg:grid-cols-3 lg:gap-20"
          >
            {effectOfGiving.map((item) => {
              return (
                <motion.div
                  key={item.title}
                  variants={cardItemVariant}
                  viewport={DEFAULT_VIEWPORT}
                  className="flex w-full flex-col items-center gap-2"
                >
                  <div className="relative aspect-square w-[95%]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="aspect-square object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h4 className="mid_header">{item.title}</h4>
                    <p className="para text-center">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
      <FAQs />
      <JoinUs img={img9} alt="love girl" />
    </main>
  );
};

export default HomePage;
