"use client";
import SectionContainer from "@components/sections/SectionContainer";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Link from "next/link";

const content = [
  {
    id: "1",
    title: "LAST UPDATED: 10TH MARCH 2024",
    text: "By accessing and using our website, you agree to comply with and be bound by these terms and conditions. If you do not agree with any part of these terms, please refrain from using our website.",
  },
  {
    id: "2",
    title: "ELIGIBILTY",
    text: "Only registered Christian ministries, churches, and nonprofit Christian organizations are eligible to create projects and receive donations on Soower.",
  },
  {
    id: "3",
    title: "VERIFICATION",
    text: "Soower reserves the right to verify the legitimacy and compliance of the ministry with our eligibility criteria.",
  },
  {
    id: "4",
    title: "RESPONSIBILITY & TRANSPARENCY",
    text: "Ministries are solely responsible for managing their projects, ensuring that they comply with applicable laws and regulations. Ministries are encouraged to provide regular updates on project progress to donors and to Soower to maintain transparency.",
  },
  {
    id: "4",
    title: "TERMINATION",
    text: "Soower reserves the right to suspend or terminate the participation of any ministry on the platform for any violation of these terms and conditions or for any other reason at our discretion.",
  },
  {
    id: "5",
    title: "REFUNDS",
    text: "Donations made through the Platform are non-refundable. Donors are responsible for ensuring the accuracy of their donation details, including the selected project and donation amount.",
  },
  {
    id: "6",
    title: "PRIVACY",
    text: "We respect your privacy. Information collected is used only in accordance with our Privacy Policy.",
  },
  {
    id: "7",
    title: "CHANGES TO TERMS",
    text: "Soower may update these terms and conditions as necessary. Any changes will be communicated to ministries and donors.",
  },
];

const TermsPage = () => {
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
          Terms of Use
        </h1>
        <div className="rounded-[.9375rem] bg-white px-8 py-12">
          {content.map((item) => (
            <div key={item.id} className="mb-8 space-y-1">
              <h5 className="font-jakarta text-sm font-semibold leading-[15.12px] tracking-[2%] text-[#333333]">
                {item.title}
              </h5>
              <p className="mt-2 text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
                {item.text}
              </p>
            </div>
          ))}
          <div className="mb-8 space-y-1">
            <h5 className="font-jakarta text-sm font-semibold leading-[15.12px] tracking-[2%] text-[#333333]">
              CONTACT US
            </h5>
            <p className="mt-2 text-[.8125rem] leading-[1.4375rem] tracking-[-2%] text-[#555]">
              Please direct all inquiries to{" "}
              <Link
                href="mailto:info@soower.com"
                className="underline underline-offset-2"
              >
                info@soower.com.
              </Link>
              <br />
              You may also contact us at:{" "}
              <Link
                href="tel:+2348162324609"
                className="underline underline-offset-2"
              >
                (+234) 816 232 4609
              </Link>
            </p>
          </div>
        </div>
      </motion.section>
    </SectionContainer>
  );
};

export default TermsPage;
