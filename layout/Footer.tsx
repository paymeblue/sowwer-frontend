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
    <footer className="mt-auto w-full overflow-hidden bg-[#0A0C18] pt-16">
      <SectionContainer className="max-w-[1440px] px-4 sm:px-6 md:px-8">
        <div className="grid w-full grid-cols-1 gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Logo logoVariant="white" />
            <p className="mb-0 mt-3 max-w-sm font-baskervville text-sm italic text-white/80 sm:text-base">
              Pray. Give. Go.
            </p>
            <ul className="my-5 flex flex-col gap-2">
              <li className="flex items-start gap-2 text-white">
                <Calling set="bold" size={16} />
                <div className="flex flex-col">
                  <Link
                    href="tel:+2349055553431"
                    target="_blank"
                    className="text-xs leading-tight text-white/80 hover:text-white sm:text-sm"
                  >
                    (+234) 905 555 3431
                  </Link>
                  <Link
                    href="tel:+2347076016055"
                    className="text-xs leading-tight text-white/80 hover:text-white sm:text-sm"
                  >
                    (+234) 707 601 6055
                  </Link>
                </div>
              </li>
              <li>
                <Link
                  href="mailto:info@soower.org"
                  target="_blank"
                  className="flex items-center gap-2 text-xs leading-tight text-white/80 hover:text-white sm:text-sm"
                >
                  <Message set="bold" size={16} />
                  <span>info@soower.org</span>
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-2">
              <Link
                href="https://www.instagram.com/soo.wer?igsh=bXBldGV0dmNtNTc1"
                target="_blank"
                className="flex items-center justify-center rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61559724273051&mibextid=ZbWKwL"
                target="_blank"
                className="flex items-center justify-center rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/company/soower-foundation/"
                target="_blank"
                className="flex items-center justify-center rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
              >
                <LinkedinIcon />
              </Link>
            </div>
          </div>

          <div className="col-span-1">
            <h5 className="eyebrow mb-4 block text-white/50">Company</h5>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-sm text-white/80 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/registry/widow"
                  className="text-sm text-white/80 hover:text-white"
                >
                  Registry
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-sm text-white/80 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletters"
                  className="text-sm text-white/80 hover:text-white"
                >
                  Newsletters
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h5 className="eyebrow mb-4 block text-white/50">Our Programs</h5>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/programs/widow-care"
                  className="text-sm text-white/80 hover:text-white"
                >
                  WidowCare
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/dad-project"
                  className="text-sm text-white/80 hover:text-white"
                >
                  The DAD Project
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/mission-care"
                  className="text-sm text-white/80 hover:text-white"
                >
                  MissionCare
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/partnerships"
                  className="text-sm text-white/80 hover:text-white"
                >
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h5 className="eyebrow mb-4 block text-white/50">Get the app</h5>
            <div className="flex flex-col items-start gap-3">
              <Link href="#" target="_blank">
                <Image
                  src={appleStore}
                  width={148.53}
                  height={49.51}
                  placeholder="blur"
                  className="h-auto w-[130px] object-contain"
                  alt="Download app on iOS devices from Apple Store"
                />
              </Link>
              <Link href="#" target="_blank">
                <Image
                  src={playStore}
                  width={148.53}
                  height={49.51}
                  placeholder="blur"
                  className="h-auto w-[130px] object-contain"
                  alt="Download app on android devices from Google Play Store"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <span className="text-center font-montreal text-xs text-white/50 sm:text-left">
            © 2023 - {year} SOOWER. All rights reserved.
          </span>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            <Link
              href="/terms-of-use"
              className="font-body text-xs text-white/50 hover:text-white"
            >
              Terms of use
            </Link>
            <Link
              href="/privacy-policy"
              className="font-body text-xs text-white/50 hover:text-white"
            >
              Privacy policy
            </Link>
            <Link
              href="/acceptable-use-policy"
              className="font-body text-xs text-white/50 hover:text-white"
            >
              Acceptable use policy
            </Link>
          </div>
        </div>
      </SectionContainer>

      <div className="pointer-events-none select-none pb-2 pt-6 text-center">
        <span className="font-aeonik text-[18vw] font-bold leading-none tracking-tighter text-white/[0.04] sm:text-[15vw] lg:text-[12vw]">
          SOOWER
        </span>
      </div>
    </footer>
  );
};

export default Footer;
