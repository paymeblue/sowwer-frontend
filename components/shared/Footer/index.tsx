"use client";
import Image from "next/image";
import Link from "next/link";
import appleStore from "public/assets/icons/app-store.svg";
import playStore from "public/assets/icons/google-play.svg";
import { Instagram } from "lucide-react";
import Facebook from "@components/assets/svg/Facebook";
import Twitter from "@components/assets/svg/twitter";
import YoutubeColor from "@components/assets/svg/youtubeColor";
import Calling from "@components/assets/svg/Calling";
import Message from "@components/assets/svg/Message";
import SectionContainer from "@components/sections/SectionContainer";
import Logo from "../Logo";

interface Props {
  variant?: "default" | "minimal";
}

const Footer = ({ variant = "default" }: Props) => {
  if (variant === "minimal") {
    return (
      <footer className="flex w-full flex-col justify-between border-t-[.3px] border-body-2 px-4 py-4 lg:flex-row">
        <span className="text_small_body_sb">
          © 2023 Soower. All rights reserved.
        </span>
        <div className="flex items-center space-x-2">
          <Link href="#">
            <span className="text_small_body_r">Terms of Use</span>
          </Link>
          <Link href="#">
            <span className="text_small_body_r">Privacy Policy</span>
          </Link>
        </div>
      </footer>
    );
  }
  return (
    <footer className="mt-auto min-h-[40vh] w-full flex-col bg-secondary-black pt-8 lg:flex-row">
      <SectionContainer>
        <div className="flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-between">
          {/* left */}
          <div className="flex flex-col items-center lg:items-start">
            <Logo logoVariant="white" />
            <p className="mb-0 mt-0 max-w-sm text-center font-body text-[14px] leading-[22px] text-[rgba(255,_255,_255,_0.8)] lg:text-start">
              The Kingdom Investment Platform. Perfectly positioned to lend a
              helping hand.
            </p>
            <div className="mt-4 flex items-center gap-6">
              <div className="cursor-pointer text-white">
                <Twitter />
              </div>
              <Instagram fill="white" className="cursor-pointer" />
              <div className="cursor-pointer text-white">
                <Facebook />
              </div>
              <div className="cursor-pointer text-white">
                <YoutubeColor />
              </div>
            </div>
            <div className="mt-8 flex flex-col space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0">
              <Link href="#" target="_blank">
                <Image
                  src={appleStore}
                  alt="Download app on iOS devices from Apple Store"
                />
              </Link>
              <Link href="#" target="_blank">
                <Image
                  src={playStore}
                  alt=" Download app on android devices from Google Play Store"
                />
              </Link>
            </div>
          </div>

          {/* right */}
          <div className="mt-6 flex flex-col space-y-6 lg:mt-0 lg:flex-row lg:space-x-40 lg:space-y-0">
            {/* Quick Links */}
            <div className="flex flex-col items-center space-y-6 lg:items-start">
              <h5 className="footerlink_header">Quick Links</h5>
              <ul className="flex flex-col items-center space-y-4 lg:items-start">
                <li>
                  <Link href={`/`} className="footerlink_sub">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href={`/`} className="footerlink_sub">
                    Explore projects
                  </Link>
                </li>
                <li>
                  <Link href={`/`} className="footerlink_sub">
                    For ministries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col space-y-6">
              <h5 className="footerlink_header">Contact Us</h5>
              <ul className="flex flex-col items-center space-y-4 lg:items-start">
                <li>
                  <Link
                    href={`/`}
                    className="footerlink_sub flex items-center space-x-2"
                  >
                    <Calling /> <span>(+234) 123 456 7890</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="footerlink_sub flex items-center space-x-2"
                  >
                    <Message /> <span>info@soower.com</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t-[0.3px] border-[#C4C4C4] py-8">
          <div className="flex flex-col items-center space-x-6 lg:flex-row">
            <span className="lg: text-center font-body text-[0.8rem] text-[rgba(255,_255,_255,_0.8)] lg:text-start">
              © 2023 Soower. All rights reserved.
            </span>
            <Link href="/">
              <span className="font-body text-[0.8rem] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
                Terms of use
              </span>
            </Link>
            <Link href="/">
              <span className="font-body text-[0.8rem] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
                Privacy policy
              </span>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
