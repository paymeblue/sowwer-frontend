"use client";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@components/assets/icons";
import SectionContainer from "@components/sections/SectionContainer";
import Logo from "@components/shared/Logo";
import Image from "next/image";
import Link from "next/link";
import appleStore from "public/images/appstore.png";
import playStore from "public/images/playstore.png";
import { Calling, Message } from "react-iconly";

interface Props {
  variant?: "default" | "minimal";
}

const Footer = ({ variant = "default" }: Props) => {
  const year = new Date().getFullYear();
  if (variant === "minimal") {
    return (
      <footer className="flex w-full flex-col items-center justify-between gap-4 border-t-[.3px] border-body-2 px-4 py-6 sm:py-4 md:flex-row md:gap-6 lg:flex-row lg:justify-between">
        <span className="text-center text-xs font-semibold sm:text-sm">
          © 2023 - {year} SOOWER. All rights reserved.
        </span>
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 md:space-x-6">
          <Link href="terms-of-use">
            <span className="text-center text-xs sm:text-sm">Terms of Use</span>
          </Link>
          <Link href="privacy-policy">
            <span className="text-center text-xs sm:text-sm">
              Privacy Policy
            </span>
          </Link>
          <Link href="acceptable-use-policy">
            <span className="text-center text-xs sm:text-sm">
              Acceptable use policy
            </span>
          </Link>
        </div>
      </footer>
    );
  }
  return (
    <footer className="mt-auto min-h-[40vh] w-full flex-col bg-[#121422] pt-8">
      <SectionContainer className="max-w-[1440px] px-4 sm:px-6 md:px-8">
        <div className="flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-center lg:items-start">
            <Logo logoVariant="white" />
            <p className="mb-0 mt-0 max-w-sm text-center font-baskervville text-sm italic text-white sm:text-base lg:text-start">
              Pray. Give. Go.
            </p>
            <ul className="my-4 flex flex-col items-center gap-2 sm:my-6 lg:items-start">
              <li className="flex items-start gap-2 text-white">
                <Calling set="bold" size={17} />
                <div className="flex flex-col">
                  <Link
                    href="tel:+2349055553431"
                    target="_blank"
                    className="text-xs leading-tight hover:text-white/80 sm:text-sm sm:leading-[22px]"
                  >
                    (+234) 905 555 3431
                  </Link>
                  <Link
                    href="tel:+2347076016055"
                    className="text-xs leading-tight hover:text-white/80 sm:text-sm sm:leading-[22px]"
                  >
                    (+234) 707 601 6055
                  </Link>
                </div>
              </li>
              <li>
                <Link
                  href="mailto:info@soower.org"
                  target="_blank"
                  className="flex items-center gap-2 text-xs leading-tight text-white hover:text-white/80 sm:text-sm sm:leading-[22px]"
                >
                  <Message set="bold" size={17} />
                  <span>info@soower.org</span>
                </Link>
              </li>
            </ul>
            <div className="mb-8 flex items-center justify-center gap-2 lg:mb-0">
              <Link
                href="https://www.instagram.com/soo.wer?igsh=bXBldGV0dmNtNTc1"
                target="_blank"
                className="bg-white/15 flex items-center justify-center rounded-full bg-white/10 p-2 sm:p-3"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61559724273051&mibextid=ZbWKwL"
                target="_blank"
                className="bg-white/15 flex items-center justify-center rounded-full bg-white/10 p-2 sm:p-3"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/company/soower"
                target="_blank"
                className="bg-white/15 flex items-center justify-center rounded-full bg-white/10 p-2 sm:p-3"
              >
                <LinkedinIcon />
              </Link>
            </div>
          </div>

          {/* right */}
          <div className="w-full lg:w-auto">
            <div className="flex flex-col space-y-8 sm:space-y-12 md:flex-row md:space-x-10 md:space-y-0 lg:space-x-20">
              {/* Quick Links */}
              <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:items-start">
                <h5 className="font-montreal text-xs font-medium leading-tight text-white sm:text-[13px] sm:leading-[15.6px]">
                  Company
                </h5>
                <ul className="flex flex-col items-center gap-2 md:items-start">
                  <li>
                    <Link
                      href="/about-us"
                      className="text-[10px] text-white hover:text-white/80 sm:text-xs"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/registry/widow"
                      className="text-[10px] text-white hover:text-white/80 sm:text-xs"
                    >
                      Registry
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="text-[10px] text-white hover:text-white/80 sm:text-xs"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:items-start">
                <h5 className="font-montreal text-xs font-medium leading-tight text-white sm:text-[13px] sm:leading-[15.6px]">
                  Our Programs
                </h5>
                <ul className="flex flex-col items-center gap-2 md:items-start">
                  <li>
                    <Link
                      href="/programs/widow-care"
                      className="text-[10px] text-white hover:text-white/80 sm:text-xs"
                    >
                      WidowCare
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/programs/dad-project"
                      className="text-[10px] text-white hover:text-white/80 sm:text-xs"
                    >
                      The DAD Project
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/programs/mission-care"
                      className="text-[10px] text-white hover:text-white/80 sm:text-xs"
                    >
                      MissionCare
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/programs/partnerships"
                      className="text-[10px] text-white hover:text-white/80 sm:text-xs"
                    >
                      Partnerships
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 md:justify-start lg:flex-row lg:space-x-4 lg:space-y-0">
              <Link href="#" target="_blank">
                <Image
                  src={appleStore}
                  width={148.53}
                  height={49.51}
                  placeholder="blur"
                  className="h-auto w-[120px] object-contain sm:w-auto"
                  alt="Download app on iOS devices from Apple Store"
                />
              </Link>
              <Link href="#" target="_blank">
                <Image
                  src={playStore}
                  width={148.53}
                  height={49.51}
                  placeholder="blur"
                  className="h-auto w-[120px] object-contain sm:w-auto"
                  alt="Download app on android devices from Google Play Store"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-x-0 border-b-0 border-t-[0.3px] border-[#DADADA] py-6 sm:mt-10 sm:py-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:space-y-6 md:flex-row md:space-x-6 md:space-y-0">
            <span className="text-center font-montreal text-[10px] leading-tight text-[rgba(255,_255,_255,_0.8)] sm:text-xs sm:leading-[14.4px] lg:text-start">
              © 2023 - {year} SOOWER. All rights reserved.
            </span>
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
              <Link href="/terms-of-use">
                <span className="font-body text-[10px] leading-tight text-[rgba(255,_255,_255,_0.8)] hover:text-white sm:text-xs sm:leading-[14.4px]">
                  Terms of use
                </span>
              </Link>
              <Link href="/privacy-policy">
                <span className="font-body text-[10px] leading-tight text-[rgba(255,_255,_255,_0.8)] hover:text-white sm:text-xs sm:leading-[14.4px]">
                  Privacy policy
                </span>
              </Link>
              <Link href="/acceptable-use-policy">
                <span className="font-body text-[10px] leading-tight text-[rgba(255,_255,_255,_0.8)] hover:text-white sm:text-xs sm:leading-[14.4px]">
                  Acceptable use policy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
