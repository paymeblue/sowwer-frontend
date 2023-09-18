import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import SectionContainer from "./SectionContainer";

const FAQsSection = () => {
  return (
    <section aria-label="frequetly asked questions" className="py-10">
      <SectionContainer>
        <h2 className="font-title text-[2.8rem] leading-[3rem]">
          Frequently asked questions
        </h2>
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
