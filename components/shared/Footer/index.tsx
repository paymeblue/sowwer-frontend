"use client";
import Calling from "@components/assets/svg/Calling";
import Facebook from "@components/assets/svg/Facebook";
import Message from "@components/assets/svg/Message";
import Twitter from "@components/assets/svg/twitter";
import SectionContainer from "@components/sections/SectionContainer";
import { Instagram, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import appleStore from "public/assets/icons/app-store.svg";
import playStore from "public/assets/icons/google-play.svg";
import Logo from "../Logo";

interface Props {
  variant?: "default" | "minimal";
}

const Footer = ({ variant = "default" }: Props) => {
  const year = new Date().getFullYear();
  if (variant === "minimal") {
    return (
      <footer className="flex w-full flex-col items-center justify-center border-t-[.3px] border-body-2 px-4 py-4 lg:flex-row lg:justify-between">
        <span className="text_small_body_sb">
          © 2023 - {year} Soower. All rights reserved.
        </span>
        <div className="flex flex-col items-center space-x-0 max-lg:justify-center lg:flex-row lg:space-x-2">
          <Link href="terms-of-use">
            <span className="text_small_body_r max-lg:text-center">
              Terms of Use
            </span>
          </Link>
          <Link href="privacy-policy">
            <span className="text_small_body_r max-lg:text-center">
              Privacy Policy
            </span>
          </Link>
          <Link href="acceptable-use-policy">
            <span className="text_small_body_r max-lg:text-center">
              Acceptable use policy
            </span>
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
              <Link
                href="https://x.com/soowerMission?t=G0zmS8PLLu6RxcJkzdo42w&s=09"
                target="_blank"
              >
                <div className="cursor-pointer rounded-md bg-white">
                  <Twitter />
                </div>
              </Link>
              <Link
                href="https://www.instagram.com/soo.wer?igsh=bXBldGV0dmNtNTc1"
                target="_blank"
              >
                <Instagram fill="white" className="cursor-pointer" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61559724273051&mibextid=ZbWKwL"
                target="_blank"
              >
                <div className="cursor-pointer text-white">
                  <Facebook />
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/soower"
                target="_blank"
              >
                <div className="cursor-pointer text-white">
                  <LinkedinIcon />
                </div>
              </Link>
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
          <div className="mt-12 flex flex-col space-y-12 lg:mt-0 lg:flex-row lg:space-x-20 lg:space-y-0">
            {/* About */}
            <div className="flex flex-col items-center space-y-6 lg:items-start">
              <h5 className="footerlink_header">About</h5>
              <ul className="flex flex-col items-center space-y-4 lg:items-start">
                <li>
                  <Link href={`/the-foundation`} className="footerlink_sub">
                    The Foundation
                  </Link>
                </li>
                <li>
                  <Link href={`/our-team`} className="footerlink_sub">
                    Our Team
                  </Link>
                </li>
              </ul>
            </div>
            {/* Explore */}
            <div className="flex flex-col items-center space-y-6 lg:items-start">
              <h5 className="footerlink_header">Explore</h5>
              <ul className="flex flex-col items-center space-y-4 lg:items-start">
                <li>
                  <Link href={`/projects`} className="footerlink_sub">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href={`/ministries`} className="footerlink_sub">
                    Ministries
                  </Link>
                </li>
              </ul>
            </div>
            {/* Quick Links */}
            <div className="flex flex-col items-center space-y-6 lg:items-start">
              <h5 className="footerlink_header">Our Registry</h5>
              <ul className="flex flex-col items-center space-y-4 lg:items-start">
                <li>
                  <Link
                    href={`/registry/join?category=Widow`}
                    className="footerlink_sub"
                  >
                    For widows
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/registry/join?category=Missionaries`}
                    className="footerlink_sub"
                  >
                    For missionaries
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/registry/join?category=Orphanage`}
                    className="footerlink_sub"
                  >
                    For orphanages
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
                    className="footerlink_sub flex items-center space-x-2"
                    href="tel:+2349055553431"
                    target="_blank"
                  >
                    <Calling /> <span>(+234) 905 555 3431</span>
                  </Link>
                  <Link
                    href="tel:+2347076016055"
                    className="footerlink_sub flex items-center space-x-2"
                  >
                    <Calling /> <span>(+234) 707 601 6055</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:info@soower.org"
                    target="_blank"
                    className="footerlink_sub flex items-center space-x-2"
                  >
                    <Message /> <span>info@soower.org</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t-[0.3px] border-[#C4C4C4] py-8">
          <div className="flex flex-col items-center space-x-6 lg:flex-row">
            <span className="lg: text-center font-body text-[0.8rem] text-[rgba(255,_255,_255,_0.8)] lg:text-start">
              © 2023 - {year} Soower. All rights reserved.
            </span>
            <Link href="terms-of-use">
              <span className="font-body text-[0.8rem] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
                Terms of use
              </span>
            </Link>
            <Link href="privacy-policy">
              <span className="font-body text-[0.8rem] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
                Privacy policy
              </span>
            </Link>
            <Link href="acceptable-use-policy">
              <span className="font-body text-[0.8rem] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
                Acceptable use policy
              </span>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
