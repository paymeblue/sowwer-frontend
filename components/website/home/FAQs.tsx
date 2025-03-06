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
    body: "Yes, ministries are encouraged to provide regular updates on project progress. Once a project you’ve donated to is completed you can request an audit report to receive updates on the project, allowing you to see the impact of your support.",
    id: "4",
  },
];
const FAQs = () => {
  return (
    <section aria-label="frequetly asked questions" className="px-6 py-12">
      <SectionContainer className="rounded-3xl bg-[#F7F8FA] py-16">
        <motion.div
          variants={defaultVariant({})}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
        >
          <h2 className="header">Frequently asked questions</h2>
          <div className="mt-6 w-full">
            <Accordion type="single" collapsible>
              {data.map((item) => {
                return (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="mid_header font-normal">
                      {item.header}
                    </AccordionTrigger>
                    <AccordionContent className="font-montreal text-base font-normal text-body-1">
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
