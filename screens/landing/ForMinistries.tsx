"use client";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

import SectionContainer from "@components/sections/SectionContainer";
import { Button } from "@components/ui/button";
import Link from "next/link";

const ForMinstriesPage = () => {
  return (
    <div className="safearea-top">
      <SectionContainer>
        <motion.div
          variants={defaultVariant({})}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="mx-auto mb-20 flex flex-col items-center justify-center"
        >
          <h2 className="text_variant_h2 w-full text-center max-lg:text-[2.6rem] max-lg:leading-[3.3rem] lg:w-[60%]">
            Are you a ministry with widow, orphan or mission programs? Register
            with us today!
          </h2>
          <p className="text_medium_body_p  mt-4 w-full text-center lg:w-[70%]">
            With Soower, Churches and Christian Organizations have the
            opportunity to raise funds for various projects tailored to support
            widows, orphans and missions across Nigeria.
          </p>
          <div className="mt-6 flex items-center space-x-4">
            <Link href="/auth/ministry/sign-up">
              <Button>Register as a ministry</Button>
            </Link>
            <Link href="/auth/ministry/sign-in" className="hidden lg:inline">
              <Button variant="outline">Login to ministry account</Button>
            </Link>
          </div>
        </motion.div>

        {/* <motion.section
          variants={defaultVariant({ delay: 0.6 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="my-32 flex w-full flex-col items-center justify-between lg:my-40 lg:flex-row"
        >
          <div className="flex w-full flex-col space-y-8 lg:w-[40%]">
            <h2 className="text_variant_h2">
              Lorem ipsum dolor sit amet consectetur. Nisi.
            </h2>

            <div className="flex flex-col space-y-10">
              <div className="flex space-x-4">
                <div>
                  <Lens />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text_small_header">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="text_small_body_p">
                    Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                    arcu imperdiet pellentesque. Urna eros interdum est
                    sollicitid dignissim ipsum arcu imperdiet pellentesque.
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div>
                  <HeartHand />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text_small_header">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="text_small_body_p">
                    Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                    arcu imperdiet pellentesque. Urna eros interdum est
                    sollicitid dignissim ipsum arcu imperdiet pellentesque.
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div>
                  <Receipt />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text_small_header">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="text_small_body_p">
                    Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                    arcu imperdiet pellentesque. Urna eros interdum est
                    sollicitid dignissim ipsum arcu imperdiet pellentesque.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-10 aspect-square w-full bg-gray-200 lg:mt-0 lg:w-[45%]" />
        </motion.section> */}
      </SectionContainer>
    </div>
  );
};

export default ForMinstriesPage;
