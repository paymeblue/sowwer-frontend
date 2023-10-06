"use client";
import { Button } from "@components/ui/button";
import Image from "next/image";
import { ArrowRight } from "react-iconly";
import SectionContainer from "../SectionContainer";
import { motion } from "framer-motion";
import {
  DEFAULT_VIEWPORT,
  cardContainerVariant,
  cardItemVariant,
  defaultVariant,
} from "lib/variants";
import Link from "next/link";

const effectOfGiving = [
  {
    image: "/assets/images/grid_images.png",
    title: "Ministries",
    desc: " Lorem ipsum dolo consecteur, faucibus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim.",
  },
  {
    image: "/assets/images/hands.png",
    title: "Donors",
    desc: " Lorem ipsum dolo consecteur, faucibus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim.",
  },
  {
    image: "/assets/images/group_images.png",
    title: "Impact",
    desc: " Lorem ipsum dolo consecteur, faucibus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim.",
  },
];

const AboutsUsSection = () => {
  return (
    <SectionContainer>
      <section className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          variants={defaultVariant({})}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="flex w-full flex-col space-y-6 lg:w-[50%]"
        >
          <div className="flex flex-col space-y-4">
            <span className="font-body text-xs text-accent">ABOUT US</span>
            <h2 className="font-title text-[1.8rem] leading-[2.2rem] text-black lg:text-[2.8rem] lg:leading-[3rem]">
              Perfectly positioned to lend <br /> a helping hand
            </h2>

            <p className="text_medium_body_p w-full lg:w-[76%]">
              Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
              imperdiet pellentesque. Urna eros interdum est sollicitudin
              dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
              dolor sit amet consectetur. Faucibus risus risus arcu imperdiet
              pellentesque. Urna eros interdum est sollicitudin dignissim.
              Convallis iaculis blandit ultrices posuere.
            </p>

            <Link href="/about">
              <Button className="w-fit space-x-2">
                <span>Learn More</span>
                <ArrowRight set="light" size={18} />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={defaultVariant({ delay: 0.6 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="relative mt-14 aspect-[1/1.3] w-full rounded-md lg:mt-0 lg:aspect-[1/1] lg:w-[35%] "
        >
          <Image
            src="/assets/images/hands.png"
            alt="helping hands"
            fill
            className="rounded-[10px] object-cover"
          />

          <Image
            src="/assets/images/statbox.png"
            alt="stats"
            className="absolute -right-5 top-1/2 -translate-y-1/2 lg:-left-[150px]"
            width={224}
            height={279}
          />
        </motion.div>
      </section>

      <motion.div
        variants={defaultVariant({ delay: 0.5 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="relative mt-12 flex flex-col space-y-16 py-16 lg:mt-20"
        aria-label="Ripple Effect of Giving"
      >
        <Image
          src="/assets/images/circular_dotted_lines.svg"
          alt="Background spiral"
          fill
          className="object-contain pb-10"
        />
        <motion.div className="flex w-full flex-col space-y-4 lg:w-[60%]">
          <h2 className="font-title text-[1.8rem] leading-[2.2rem] text-black lg:text-[2.8rem] lg:leading-[3rem]">
            The Ripple Effect of Giving
          </h2>

          <p className="text_medium_body_p">
            Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitudin
            dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
            dolor sit amet consectetur.
          </p>
        </motion.div>
        <motion.div
          variants={cardContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="grid grid-cols-1 gap-12 lg:grid-cols-3"
        >
          {effectOfGiving.map((item) => {
            return (
              <motion.div
                key={item.title}
                variants={cardItemVariant}
                viewport={DEFAULT_VIEWPORT}
                className="flex w-full flex-col items-center"
              >
                <div className="relative aspect-square w-[75%]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-fit"
                  />
                </div>
                <div className="mt-10 flex flex-col items-center space-y-4">
                  <h4 className="font-title text-[24px] font-normal leading-[27px]">
                    {item.title}
                  </h4>
                  <p className="text_regular_body_p text-center">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default AboutsUsSection;
