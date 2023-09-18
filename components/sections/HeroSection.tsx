"use client";
import { Button } from "@components/ui/button";
import { Heart2 } from "react-iconly";
import SectionContainer from "./SectionContainer";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "variants";

const Hero = () => {
  return (
    <SectionContainer>
      <section className="flex min-h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <motion.h1
            variants={defaultVariant({})}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center font-title text-[4rem] leading-[4.6rem] text-black"
          >
            Alone we can do so little; <br /> together we can do so much.
          </motion.h1>
          <motion.div
            variants={defaultVariant({ delay: 0.5 })}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="flex flex-col items-center"
          >
            <p className="mt-2 text-center text-[14px] text-body-1">
              "In all things I have shown you that by working hard in this way
              we must help the weak and remember the words <br /> of the Lord
              Jesus, how He himself said it is more blessed to give than to
              receive."
            </p>
            <span className="text-center text-[13px] text-body-1">
              — Acts 20:35 (ESV)
            </span>
            <Button className="mt-6">
              <div className="flex items-center space-x-2">
                <Heart2 set="bold" size={19} />
                <span>Make a Donation</span>
              </div>
            </Button>
          </motion.div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default Hero;
