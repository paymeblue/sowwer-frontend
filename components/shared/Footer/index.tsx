"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "public/assets/icons/logo-white.svg";
import appleStore from "public/assets/icons/app-store.svg";
import playStore from "public/assets/icons/google-play.svg";
import { Instagram } from "lucide-react";
import Facebook from "@components/assets/svg/Facebook";
import Twitter from "@components/assets/svg/twitter";
import YoutubeColor from "@components/assets/svg/youtubeColor";
import Calling from "@components/assets/svg/Calling";
import Message from "@components/assets/svg/Message";
import SectionContainer from "@components/sections/SectionContainer";

const Footer = () => {
  return (
    <footer className="mt-auto min-h-[40vh] w-full bg-secondary-black py-8">
      <SectionContainer>
        <div className="flex w-full justify-between">
          {/* left */}
          <div className="flex flex-col">
            <Link href="/">
              <Image src={logo} alt="Soower logo" className="w-auto" />
            </Link>
            <p className="mb-0 mt-2 max-w-sm text-start text-[12px] leading-[20px] text-[rgba(255,_255,_255,_0.8)]">
              The Kingdom Investment Platform. Perfectly positioned to lend a
              helping hand.
            </p>
            <div className="mt-4 flex items-center gap-6">
              <div className="text-white">
                <Twitter />
              </div>
              <Instagram fill="white" />
              <div className="text-white">
                <Facebook />
              </div>
              <div className="text-white">
                <YoutubeColor />
              </div>
            </div>
            <div className="mt-8 flex space-x-4">
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
          <div className="flex space-x-40">
            {/* Quick Links */}
            <div className="flex flex-col space-y-6">
              <h5 className="footerlink_header">Quick Links</h5>
              <ul className="flex flex-col space-y-4">
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
              <ul className="flex flex-col space-y-4">
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
          <div className="flex items-center space-x-6">
            <span className="text-[0.8rem] text-[rgba(255,_255,_255,_0.8)]">
              © 2023 Soower. All rights reserved.
            </span>
            <Link href="/">
              <span className="text-[0.8rem] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
                Terms of use
              </span>
            </Link>
            <Link href="/">
              <span className="text-[0.8rem] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
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
