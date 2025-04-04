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
      <footer className="flex w-full flex-col items-center justify-between border-t-[.3px] border-body-2 px-4 py-4 lg:flex-row lg:justify-between">
        <span className="text_small_body_sb">
          © 2023 - {year} SOOWER. All rights reserved.Z
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
    <footer className="mt-auto min-h-[40vh] w-full flex-col bg-[#121422] pt-8 lg:flex-row">
      <SectionContainer className="max-w-[1440px]">
        <div className="flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-center lg:items-start">
            <Logo logoVariant="white" />
            <p className="mb-0 mt-0 max-w-sm text-center font-baskervville text-base italic text-white lg:text-start">
              Pray. Give. Go.
            </p>
            <ul className="my-6 flex flex-col items-center gap-2 lg:items-start">
              <li className="flex items-start gap-2 text-white">
                <Calling set="bold" size={17} />
                <div className="flex flex-col">
                  <Link
                    href="tel:+2349055553431"
                    target="_blank"
                    className="text-sm leading-[22px]"
                  >
                    (+234) 905 555 3431
                  </Link>
                  <Link
                    href="tel:+2347076016055"
                    className="text-sm leading-[22px]"
                  >
                    (+234) 707 601 6055
                  </Link>
                </div>
              </li>
              <li>
                <Link
                  href="mailto:info@soower.org"
                  target="_blank"
                  className="flex items-center gap-2 text-sm leading-[22px] text-white"
                >
                  <Message set="bold" size={17} />
                  <span>info@soower.org</span>
                </Link>
              </li>
            </ul>
            <div className="flex items-center justify-center gap-2">
              <Link
                href="https://www.instagram.com/soo.wer?igsh=bXBldGV0dmNtNTc1"
                target="_blank"
                className="bg-white/15 flex items-center justify-center rounded-full bg-white/10 p-3"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61559724273051&mibextid=ZbWKwL"
                target="_blank"
                className="bg-white/15 flex items-center justify-center rounded-full bg-white/10 p-3"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/company/soower"
                target="_blank"
                className="bg-white/15 flex items-center justify-center rounded-full bg-white/10 p-3"
              >
                <LinkedinIcon />
              </Link>
            </div>
          </div>

          {/* right */}
          <div>
            <div className="mt-12 flex flex-col space-y-12 lg:mt-0 lg:flex-row lg:space-x-20 lg:space-y-0">
              {/* Quick Links */}
              <div className="flex flex-col items-center space-y-6 lg:items-start">
                <h5 className="font-montreal text-[13px] font-medium leading-[15.6px] text-white">
                  Company
                </h5>
                <ul className="flex flex-col items-center gap-2 lg:items-start">
                  <li>
                    <Link
                      href="/website/about-us"
                      className="text-xs text-white"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/website/registry"
                      className="text-xs text-white"
                    >
                      Registry
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/webiste/contact-us"
                      className="text-xs text-white"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center space-y-6 lg:items-start">
                <h5 className="font-montreal text-[13px] font-medium leading-[15.6px] text-white">
                  Our Programs
                </h5>
                <ul className="flex flex-col items-center gap-2 lg:items-start">
                  <li>
                    <Link
                      href="/website/widow-care"
                      className="text-xs text-white"
                    >
                      WidowCare
                    </Link>
                  </li>
                  <li>
                    <Link href="/website/dad" className="text-xs text-white">
                      The DAD Project
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/website/mission-care"
                      className="text-xs text-white"
                    >
                      MissionCare
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/website/partnerships"
                      className="text-xs text-white"
                    >
                      Partnerships
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex flex-col space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0">
              <Link href="/webiste#" target="_blank">
                <Image
                  src={appleStore}
                  width={148.53}
                  height={49.51}
                  placeholder="blur"
                  className="object-contain"
                  alt="Download app on iOS devices from Apple Store"
                />
              </Link>
              <Link href="/webiste#" target="_blank">
                <Image
                  src={playStore}
                  width={148.53}
                  height={49.51}
                  placeholder="blur"
                  className="object-contain"
                  alt="Download app on android devices from Google Play Store"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-x-0 border-b-0 border-t-[0.3px] border-[#DADADA] py-8">
          <div className="flex flex-col items-center justify-between space-x-6 lg:flex-row">
            <span className="text-center font-montreal text-xs leading-[14.4px] text-[rgba(255,_255,_255,_0.8)] lg:text-start">
              © 2023 - {year} SOOWER. All rights reserved.
            </span>
            <div className="flex items-center justify-center gap-4">
              <Link href="terms-of-use">
                <span className="font-body text-xs leading-[14.4px] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
                  Terms of use
                </span>
              </Link>
              <Link href="privacy-policy">
                <span className="font-body text-xs leading-[14.4px] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
                  Privacy policy
                </span>
              </Link>
              <Link href="acceptable-use-policy">
                <span className="font-body text-xs leading-[14.4px] text-[rgba(255,_255,_255,_0.8)] hover:text-white">
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
