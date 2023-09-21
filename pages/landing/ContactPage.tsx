"use client";

import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

import SectionContainer from "@components/sections/SectionContainer";
import { Instagram } from "lucide-react";
import Facebook from "@components/assets/svg/Facebook";
import Twitter from "@components/assets/svg/twitter";
import YoutubeColor from "@components/assets/svg/youtubeColor";
import Link from "next/link";
import Calling from "@components/assets/svg/Calling";
import Message from "@components/assets/svg/Message";
import ContactForm from "@components/forms/ContactForm";

const ContactPage = () => {
  return (
    <SectionContainer>
      <section className="safearea-top my-40 flex w-full justify-between">
        <motion.div
          variants={defaultVariant({})}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="flex w-[50%] flex-col"
        >
          <h2 className="text_variant_h2">Contact us</h2>
          <p className="font-body text-[.9rem] leading-[1.5rem] text-body-1">
            Want to make an inquiry or give us some feedback? Fill out the form
            and <br /> we’ll be in touch within 24hours.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <div className="cursor-pointer text-black">
              <Twitter />
            </div>
            <Instagram fill="black" color="white" className="cursor-pointer" />
            <div className="cursor-pointer text-black">
              <Facebook />
            </div>
            <div className="cursor-pointer text-black">
              <YoutubeColor playColor="white" />
            </div>
          </div>

          <ul className="mt-8 flex flex-col space-y-4">
            <li>
              <Link
                href={`/`}
                className="contactlink_sub flex items-center space-x-2"
              >
                <Calling /> <span>(+234) 123 456 7890</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/`}
                className="contactlink_sub flex items-center space-x-2"
              >
                <Message /> <span>info@soower.com</span>
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          variants={defaultVariant({ delay: 0.6 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="relative mr-14 w-[35%]"
        >
          <div className="z-20 h-full w-full bg-[#fff] p-10 shadow-[-18px_10px_30px_-4px_rgba(0,_0,_0,_0.05),_-3px_0px_15px_-15px_rgba(0,_0,_0,_0.15),_5px_0px_20px_0px_rgba(0,_0,_0,_0.05)]">
            <ContactForm />
          </div>
          <div className="absolute -right-8 top-8 -z-10  h-full w-full border border-accent bg-transparent" />
        </motion.div>
      </section>
    </SectionContainer>
  );
};

export default ContactPage;
