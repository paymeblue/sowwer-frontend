"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import SectionContainer from "../SectionContainer";
import { Button } from "@components/ui/button";
import { Heart2 } from "react-iconly";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

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
            "Therefore, as we have opportunity, let us do good to all people,
            especially to those who belong to the family of believers."
          </h2>
          <p className="text_large_body_r mt-2 lg:mt-4">
            — Galatians 6:10 (NIV)
          </p>
          <Button className="mt-10 px-9 py-7">
            <div className="flex items-center space-x-2">
              <Heart2 set="bold" size={19} />
              <span>Make a Donation</span>
            </div>
          </Button>
        </motion.div>
      </SectionContainer>
    </section>
  );
};
const data = [
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "1",
  },
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "2",
  },
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "3",
  },
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "4",
  },
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "5",
  },
];

export default FAQsSection;
