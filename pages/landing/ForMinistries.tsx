"use client";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

import HeartHand from "@components/assets/svg/HeartHand";
import Lens from "@components/assets/svg/Lens";
import Receipt from "@components/assets/svg/Receipt";
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
          className="mx-auto flex flex-col items-center justify-center"
        >
          <h2 className="text_variant_h2 w-[60%] text-center">
            Are you a ministry with widow, orphan or mission programs? Register
            with us today!
          </h2>
          <p className="text_medium_body_p  mt-4 w-[70%] text-center">
            Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitudin
            dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
            dolor sit amet consectetur. Faucibus risus risus arcu imperdiet
            pellentesque.
          </p>
          <div className="mt-6 flex items-center space-x-4">
            <Button>Register as a ministry</Button>
            <Link href="/auth/ministry/sign-in">
              <Button variant="outline">Login to ministry account</Button>
            </Link>
          </div>
        </motion.div>

        <motion.section
          variants={defaultVariant({ delay: 0.6 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="my-40 flex w-full items-center justify-between"
        >
          <div className="flex w-[40%] flex-col space-y-8">
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
          <div className="relative aspect-square w-[45%] bg-gray-200" />
        </motion.section>
      </SectionContainer>
    </div>
  );
};

export default ForMinstriesPage;
