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
    header: "What type of projects can I donate to on Soower?",
    body: "You can donate to a variety of faith-based and humanitarian initiatives, including projects that support widows, orphans (through the DAD Project), missionaries, and ministry partnerships.",
    id: "1",
  },
  {
    header:
      "How can I ensure the security of the donations received through Soower?",
    body: "All donations on Soower are processed through secure, encrypted payment gateways. Donors also receive confirmation receipts and can monitor donation history through their dashboard.",
    id: "2",
  },
  {
    header:
      "Can I get a refund for my donation if I make an error while donating?",
    body: "Donations are generally non-refundable. However, if a donation was made in error (e.g. duplicate payments or incorrect amount), you can contact our support team within 24 hours, and we’ll review the request on a case-by-case basis.",
    id: "3",
  },
  {
    header: "Can I get updates on the projects I've donated to?",
    body: "Yes! Donors receive updates and testimonies related to the programs or individuals they’ve supported. If you fully fund a child through the DAD Project, you’ll also get progress reports directly from the admin team via your dashboard.",
    id: "4",
  },
  {
    header: "Can widows apply for support directly?",
    body: "Yes, widows seeking assistance can apply directly through our Registry page. After completing the application form, our team reviews each submission and follows up with eligible candidates for further steps.",
    id: "5",
  },
  {
    header: "How does Soower identify missionaries in need of support?",
    body: "Missionaries can apply through our Registry, and we work closely with churches and Christian organizations to verify their mission work. Each application is reviewed to ensure alignment with our values and the genuine need for support before funding is considered.",
    id: "6",
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
