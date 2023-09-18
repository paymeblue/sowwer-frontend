"use client";
import { Button } from "@components/ui/button";
import Image from "next/image";
import { ArrowRight } from "react-iconly";
import SectionContainer from "./SectionContainer";

const effectOfGiving = [
  {
    image: "/assets/images/grid_images.png",
    title: "Ministries",
    desc: " Lorem ipsum dolo consecteur, faucibus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim.",
  },
  {
    image: "/assets/images/hands.png",
    title: "Donors",
    desc: " Lorem ipsum dolo consecteur, faucibus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim.",
  },
  {
    image: "/assets/images/group_images.png",
    title: "Impact",
    desc: " Lorem ipsum dolo consecteur, faucibus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim.",
  },
];

const AboutsUsSection = () => {
  return (
    <SectionContainer>
      <section className="flex w-full items-center justify-between">
        <div className="flex w-[45%] flex-col space-y-6">
          <div className="flex flex-col space-y-4">
            <span className="font-body text-xs text-accent">ABOUT US</span>
            <h2 className="font-title text-[2.8rem] leading-[3rem] text-black">
              Perfectly positioned to lend a <br /> helping hand
            </h2>

            <p className="font-body text-[.9rem] leading-[1.5rem] text-body-1">
              Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
              imperdiet pellentesque. Urna eros interdum est sollicitudin
              dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
              dolor sit amet consectetur. Faucibus risus risus arcu imperdiet
              pellentesque. Urna eros interdum est sollicitudin dignissim.
              Convallis iaculis blandit ultrices posuere.
            </p>

            <Button className="w-fit space-x-2">
              <span>Learn More</span>
              <ArrowRight set="light" size={18} />
            </Button>
          </div>
        </div>

        <div className="relative aspect-[1/1] w-[40%] rounded-md ">
          <Image
            src="/assets/images/hands.png"
            alt="helping hands"
            fill
            className="rounded-[10px] object-cover"
          />
          <Image
            src="/assets/images/statbox.png"
            alt="stats"
            className="absolute -left-[150px] top-1/2 -translate-y-1/2"
            width={224}
            height={279}
          />
        </div>
      </section>

      <section
        className="relative mt-20 flex flex-col space-y-6 py-16"
        aria-label="Ripple Effect of Giving"
      >
        <Image
          src="/assets/images/circular_dotted_lines.svg"
          alt="Background spiral"
          fill
          className="object-contain pb-10"
        />
        <div className="flex w-[60%] flex-col space-y-4">
          <h2 className="font-title text-[2.8rem] leading-[3rem] text-black">
            The Ripple Effect of Giving
          </h2>

          <p className="font-body text-[.9rem] leading-[1.5rem] text-body-1">
            Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitudin
            dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
            dolor sit amet consectetur.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-12">
          {effectOfGiving.map((item) => {
            return (
              <div
                key={item.title}
                className="flex w-full flex-col items-center"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-fit"
                  />
                </div>
                <div className="mt-6 flex flex-col items-center space-y-4">
                  <h4 className="font-title text-[24px] font-normal leading-[27px]">
                    {item.title}
                  </h4>
                  <p className="text-center font-body text-[13px] font-normal leading-[23px] text-body-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SectionContainer>
  );
};

export default AboutsUsSection;
