"use client";
import SectionContainer from "@components/sections/SectionContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

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
    body: "Yes, ministries are encouraged to provide regular updates on project progress. Once a project you've donated to is completed you can request an audit report to receive updates on the project, allowing you to see the impact of your support.",
    id: "4",
  },
];
const FAQs = () => {
  return (
    <section
      aria-label="frequetly asked questions"
      className="px-4 py-8 sm:px-6 sm:py-12"
    >
      <SectionContainer className="rounded-xl bg-[#F7F8FA] px-4 py-8 sm:rounded-3xl sm:px-6 sm:py-16">
        <motion.div
          variants={defaultVariant({})}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
        >
          <h2 className="header text-2xl sm:text-3xl md:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-4 w-full sm:mt-6">
            <Accordion type="single" collapsible>
              {data.map((item) => {
                return (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="mid_header text-base font-normal sm:text-lg">
                      {item.header}
                    </AccordionTrigger>
                    <AccordionContent className="font-montreal text-sm font-normal text-body-1 sm:text-base">
                      {item.body}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
};

export default FAQs;
