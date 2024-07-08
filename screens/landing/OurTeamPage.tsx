"use client";
import { motion } from "framer-motion";

import TeamTopSection from "@components/sections/landing/TeamTopSection";
import SectionContainer from "@components/sections/SectionContainer";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { ArrowRight } from "react-iconly";
import Image from "next/image";

const OurTeamPage = () => {
  return (
    <div className="safearea-top">
      <TeamTopSection />

      <div className="mt-10 w-screen bg-white py-16">
        <SectionContainer>
          <motion.section
            variants={defaultVariant({ delay: 0.5 })}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex w-full flex-col space-y-6 lg:w-[50%]">
              <div className="flex flex-col space-y-4">
                <h2 className="font-title text-[1.8rem] leading-[2.2rem] text-black lg:text-[2.8rem] lg:leading-[3rem]">
                  The SOOWER Council
                </h2>

                <p className="text_medium_body_p w-full lg:w-[76%]">
                  At SOOWER, accountability and representation are at the core
                  of our mission. We are guided by a dedicated council composed
                  of experienced leaders who serve as guardians of our values
                  and champions for the communities we support.
                </p>
                <p className="text_medium_body_p w-full lg:w-[76%]">
                  This council includes representatives from the very categories
                  and demographics we aim to help—orphans, widows, and
                  missionaries. Their firsthand insights and diverse
                  perspectives ensure that our efforts are both impactful and
                  truly aligned with the needs of those we serve.
                </p>
                <p className="text_medium_body_p w-full lg:w-[76%]">
                  By holding us accountable and providing invaluable guidance,
                  our council plays a crucial role in steering SOOWER toward
                  meaningful and sustainable change.
                </p>

                <Link href="/#">
                  <Button className="w-fit space-x-2">
                    <span>Join the council</span>
                    <ArrowRight set="light" size={18} />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative mt-14 aspect-[1/0.6] w-full rounded-md lg:mt-0 lg:aspect-[1/0.7] lg:w-[45%] ">
              <Image
                src="/assets/images/hands.png"
                alt="helping hands"
                fill
                className="rounded-[10px] object-cover"
              />
            </div>
          </motion.section>
        </SectionContainer>
      </div>
    </div>
  );
};

export default OurTeamPage;
