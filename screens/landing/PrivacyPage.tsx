"use client";
import SectionContainer from "@components/sections/SectionContainer";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <SectionContainer>
      <motion.section
        variants={defaultVariant({ delay: 0.1 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="safearea-top mb-20 w-full"
      >
        <h1 className="text_medium_header mb-8 text-[40px] leading-[45.76px]">
          Privacy Policy
        </h1>
        <div className="rounded-[.9375rem] bg-white px-8 py-12">
          <div className="mb-8 space-y-1">
            <h5 className="font-jakarta text-sm font-semibold leading-[15.12px] tracking-[2%] text-[#333333]">
              LAST UPDATED: 10TH MARCH 2024
            </h5>
            <p className="mt-2 text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
              We are committed to protecting your privacy and ensuring the
              security of your personal information. This Privacy Policy
              outlines how we collect, use, disclose, and safeguard your
              personal data when you visit our website. By accessing or using
              our website, you consent to the practices described in this
              policy.
            </p>
          </div>
          <div>
            <h2 className="font-jakarta text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[10%] text-[#333333]">
              INFORMATION WE COLLECT
            </h2>
            <ul className="list-inside list-disc">
              <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[2%] text-[#333333]">
                Ministries
              </h5>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                We collect information provided during the registration process,
                including organization names, contact details, and project
                details.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Financial information, such as bank account details, required
                for donation processing and fund disbursement.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Any additional information voluntarily provided by Ministries to
                enhance their profiles or projects.
              </li>
            </ul>
            <ul className="list-inside list-disc">
              <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[2%] text-[#333333]">
                Donors
              </h5>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                We collect information provided during the donation process,
                including names, contact details, and payment information.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Transaction details, including donation amounts, chosen
                projects, and any additional comments or preferences.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-jakarta mt-8 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[10%] text-[#333333]">
              HOW WE USE INFORMATION
            </h2>
            <ul className="list-inside list-disc">
              <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[2%] text-[#333333]">
                Ministries
              </h5>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                To facilitate the creation and management of projects on the
                Platform.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                For communication regarding project updates, account status, and
                other Platform-related matters.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Financial information is used for donation processing and fund
                disbursement.
              </li>
            </ul>
            <ul className="list-inside list-disc">
              <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[2%] text-[#333333]">
                Donors
              </h5>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                To process and record donations made through the Platform.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                For communication regarding donation receipts, project updates,
                and other Platform-related matters.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Transaction details are used to provide donation history and
                statements.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-jakarta mt-8 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[10%] text-[#333333]">
              INFORMATION SHARING
            </h2>
            <ul className="list-inside list-disc">
              <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[2%] text-[#333333]">
                Ministries
              </h5>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Limited information, such as organization names and project
                details, may be shared on the Platform for transparency and
                promotional purposes.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Financial information is securely processed through trusted
                third-party payment processors.
              </li>
            </ul>
            <ul className="list-inside list-disc">
              <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[2%] text-[#333333]">
                Donors
              </h5>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Limited information, such as names and donation amounts, may be
                shared on the Platform for transparency and recognition
                purposes, except in a case where donation is made anonymously.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Financial information is securely processed through trusted
                third-party payment processors.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-jakarta mt-8 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[10%] text-[#333333]">
              DATA SECURITY
            </h2>
            <ul className="list-inside list-disc">
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                We implement industry-standard security measures to protect
                personal information.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                Financial information is securely processed through encrypted
                connections.
              </li>
            </ul>
          </div>
          <div className="my-8 space-y-1">
            <h5 className="font-jakarta text-sm font-semibold leading-[15.12px] tracking-[2%] text-[#333333]">
              CHANGES TO PRIVACY POLICY
            </h5>
            <p className="mt-2 text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
              Soower may update this Privacy Policy as necessary. Any changes
              will be communicated through the website and email.
            </p>
          </div>
          <div className="mb-8 space-y-1">
            <h5 className="font-jakarta text-sm font-semibold leading-[15.12px] tracking-[2%] text-[#333333]">
              CONTACT US
            </h5>
            <p className="mt-2 text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
              Please direct all inquiries to{" "}
              <Link
                href="mailto:info@soower.org"
                className="underline underline-offset-2"
              >
                info@soower.org.
              </Link>
              <br />
              You may also contact us at:{" "}
              <Link
                href="tel:+2349055553431"
                className="underline underline-offset-2"
              >
                (+234) 905 555 3431,
              </Link>
              &nbsp;
              <Link
                href="tel:+2347076016055"
                className="underline underline-offset-2"
              >
                (+234) 707 601 6055
              </Link>
            </p>
          </div>
        </div>
      </motion.section>
    </SectionContainer>
  );
};

export default PrivacyPage;
