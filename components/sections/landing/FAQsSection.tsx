"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Link from "next/link";
import { Heart2 } from "react-iconly";
import SectionContainer from "../SectionContainer";

const FAQsSection = () => {
  return (
    <section aria-label="frequetly asked questions" className="py-10">
      <SectionContainer>
        <motion.div
          variants={defaultVariant({})}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
        >
          <h2 className="text_variant_h2">Frequently asked questions</h2>
          <div className="mt-10 w-full">
            <Accordion type="single" collapsible>
              {data.map((item) => {
                return (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>{item.header}</AccordionTrigger>
                    <AccordionContent>{item.body}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </motion.div>

        <motion.div
          variants={defaultVariant({})}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="mb-16 mt-20 flex w-full flex-col items-center justify-center rounded-[30px] bg-[#FDFBF2] py-8 lg:py-10"
        >
          <h2 className="w-[90%] text-center font-title text-[1.7rem] leading-[2.2rem] lg:w-[75%] lg:text-[2.8rem] lg:leading-[3.5rem]">
            "Religion that God our Father accepts as pure and faultless is this:
            to look after orphans and widows in their distress and to keep
            oneself from being polluted by the world."
          </h2>
          <p className="text_large_body_r mt-2 lg:mt-4">— James 1:27 (NIV)</p>
          <Link href="/projects">
            <Button className="mt-10 px-9 py-7">
              <div className="flex items-center space-x-2">
                <Heart2 set="bold" size={19} />
                <span>Make a Donation</span>
              </div>
            </Button>
          </Link>
        </motion.div>
      </SectionContainer>
    </section>
  );
};
const data = [
  {
    header: "What type of ministries and projects can I donate to on Soower?",
    body: "You can donate to various ministries across Nigeria, as long as they have a ministry account with Soower. This includes Churches & Christian Organizations. Projects on Soower are classified into 3 categories: Widows, Orphans and Missions.",
    id: "1",
  },
  {
    header:
      "How can I ensure the security of the donations received through Soower?",
    body: "Soower uses secure payment processing systems to protect your donations. Additionally, we verify the legitimacy and compliance of ministries to maintain transparency and trust within our community.",
    id: "2",
  },
  {
    header:
      "Can I get a refund for my donation if I make an error while donating?",
    body: "Donations made through Soower are generally non-refundable. We recommend reviewing your donation details carefully before confirming the transaction. If you believe an error has occurred, please contact our support team for assistance.",
    id: "3",
  },
  {
    header: "Can I get updates on the projects I've donated to?",
    body: "Yes, ministries are encouraged to provide regular updates on project progress. Once a project you’ve donated to is completed you can request an audit report to receive updates on the project, allowing you to see the impact of your support.",
    id: "4",
  },
];

export default FAQsSection;
