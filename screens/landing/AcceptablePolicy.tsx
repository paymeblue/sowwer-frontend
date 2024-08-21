"use client";
import SectionContainer from "@components/sections/SectionContainer";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Link from "next/link";

const AcceptablePolicyPage = () => {
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
          Acceptable Use Policy
        </h1>
        <div className="space-y-8 rounded-[.9375rem] bg-white px-8 py-12">
          <div className="mb-8 space-y-1">
            <h5 className="font-jakarta text-sm font-semibold leading-[15.12px] tracking-[2%] text-[#333333]">
              EFFECTIVE DATE: 18TH AUGUST, 2024
            </h5>
            <p className="mt-2 text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
              Thank you for being part of the SOOWER community. SOOWER connects
              donors with ministries, churches, and Christian organizations
              supporting orphans, widows, and missions. To ensure a safe and
              respectful environment, we have established the following
              Acceptable Use Policy (AUP). By using the SOOWER platform, you
              agree to comply with this policy.
            </p>
          </div>
          <div>
            <h2 className="font-jakarta text-[.8125rem] font-semibold uppercase leading-[1.0237rem] tracking-[10%] text-[#333333]">
              1. ⁠Permitted Uses
            </h2>
            <ul className="list-inside list-disc">
              <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[2%] text-[#333333]">
                You may use SOOWER to:
              </h5>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Donate to ministries, churches, and Christian organizations
                registered on the platform.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Raise funds for approved projects or causes aligned with
                SOOWER's mission.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Communicate with ministries and other users in a respectful and
                supportive manner.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Share testimonials and updates related to projects or
                donations.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-jakarta text-[.8125rem] font-semibold uppercase leading-[1.0237rem] tracking-[10%] text-[#333333]">
              2. ⁠Prohibited Activities
            </h2>
            <ul className="list-inside list-disc">
              <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[2%] text-[#333333]">
                You are not allowed to use SOOWER to:
              </h5>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Engage in Illegal Activities: Use the platform for any illegal
                activities, including but not limited to fraud, money
                laundering, or financing of terrorism.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Disseminate Harmful Content: Upload, post, or share content
                that is obscene, defamatory, abusive, hateful, or
                discriminatory.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Spam or Phish: Send unsolicited messages, advertisements, or
                requests to other users, or attempt to deceive others into
                revealing personal information.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Exploit Vulnerabilities: Attempt to hack, disrupt, or exploit
                vulnerabilities in the SOOWER platform, including introducing
                viruses or malicious software.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Misrepresent Information: Falsify information about yourself,
                your ministry, or the projects you represent, including using
                SOOWER under false pretenses.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Manipulate Donations: Engage in activities that manipulate,
                inflate, or otherwise interfere with the donation process for
                personal gain.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Harass or Harm Others: Harass, threaten, or cause harm to other
                users, ministries, or any individuals associated with SOOWER.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-jakarta mb-2 text-[.8125rem] font-semibold uppercase leading-[1.0237rem] tracking-[10%] text-[#333333]">
              3.⁠ ⁠User Responsibilities
            </h2>
            <ul className="list-inside list-disc">
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Accurate Information: Ensure that all information you provide
                is accurate, up-to-date, and truthful.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Confidentiality: Respect the privacy and confidentiality of
                other users. Do not share personal or sensitive information
                without consent.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Respect for the Community: Treat other users, ministries, and
                SOOWER staff with kindness, respect, and understanding.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-jakarta text-[.8125rem] font-semibold uppercase leading-[1.0237rem] tracking-[10%] text-[#333333]">
              4.⁠ ⁠Monitoring and Enforcement
            </h2>
            <ul className="list-inside list-disc">
              <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] font-semibold leading-[1.0237rem] tracking-[2%] text-[#333333]">
                SOOWER reserves the right to monitor user activities on the
                platform to ensure compliance with this AUP. Violations of this
                policy may result in:
              </h5>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Warnings: Issuance of warnings for minor violations.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Suspension: Temporary suspension of your account or access to
                certain features.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Termination: Permanent termination of your account and banning
                from the platform.
              </li>
              <li className="text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                ⁠Legal Action: In severe cases, legal action may be taken
                against users who engage in illegal activities or violate this
                policy.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-jakarta text-[.8125rem] font-semibold uppercase leading-[1.0237rem] tracking-[10%] text-[#333333]">
              5.⁠ ⁠Reporting Violations
            </h2>
            <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] leading-[1.0237rem] tracking-[2%] text-[#333333]">
              If you encounter or become aware of any violations of this AUP,
              please report them to SOOWER's support team at info@soower.com. We
              take all reports seriously and will investigate accordingly.
            </h5>
          </div>
          <div>
            <h2 className="font-jakarta text-[.8125rem] font-semibold uppercase leading-[1.0237rem] tracking-[10%] text-[#333333]">
              6.⁠ ⁠Changes to the AUP
            </h2>
            <h5 className="font-jakarta mb-2 mt-4 text-[.8125rem] leading-[1.0237rem] tracking-[2%] text-[#333333]">
              SOOWER may update this Acceptable Use Policy from time to time.
              You will be notified of any significant changes, and continued use
              of the platform after such changes indicates your acceptance of
              the updated policy.
            </h5>
          </div>
          <div className="mb-8 space-y-1">
            <h5 className="font-jakarta text-sm font-semibold leading-[15.12px] tracking-[2%] text-[#333333]">
              CONTACT US
            </h5>
            <p className="mt-2 text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
              If you have any questions about this Acceptable Use Policy, please
              contact us at{" "}
              <Link
                href="mailto:info@soower.com"
                className="underline underline-offset-2"
              >
                info@soower.com.
              </Link>
            </p>
          </div>
        </div>
      </motion.section>
    </SectionContainer>
  );
};

export default AcceptablePolicyPage;
