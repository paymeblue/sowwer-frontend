"use client";
import HeartHand from "@components/assets/svg/HeartHand";
import Lens from "@components/assets/svg/Lens";
import Receipt from "@components/assets/svg/Receipt";
import Image from "next/image";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

const AboutMidSection = () => {
  return (
    <section className="mt-20 flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
      <motion.div
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="flex w-full flex-col space-y-8 lg:w-[40%]"
      >
        <h2 className="text_variant_h2">
          Make kingdom investments in just a few minutes.
        </h2>

        <div className="flex flex-col space-y-10">
          <div className="flex space-x-6">
            <div>
              <Lens />
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text_small_header">
                Explore projects and ministries
              </h3>
              <p className="text_small_body_p">
                Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                arcu imperdiet pellentesque. Urna eros interdum est sollicitid
                dignissim ipsum arcu imperdiet pellentesque.
              </p>
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="">
              <HeartHand />
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text_small_header">Make a donation</h3>
              <p className="text_small_body_p">
                Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                arcu imperdiet pellentesque. Urna eros interdum est sollicitid
                dignissim ipsum arcu imperdiet pellentesque.
              </p>
            </div>
          </div>
          <div className="flex space-x-6">
            <div>
              <Receipt />
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text_small_header">Get audit reports</h3>
              <p className="text_small_body_p">
                Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                arcu imperdiet pellentesque. Urna eros interdum est sollicitid
                dignissim ipsum arcu imperdiet pellentesque.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={defaultVariant({ delay: 0.6 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="relative h-[50vh] w-full lg:h-[100vh] lg:w-[55%]"
      >
        <Image
          src="/assets/images/coin_tree_jar.png"
          alt="Image of a jar with a tree and coins inside"
          fill
          className="object-contain"
        />
      </motion.div>
    </section>
  );
};

export default AboutMidSection;
