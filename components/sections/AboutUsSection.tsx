"use client";
import { Button } from "@components/ui/button";
import { ArrowRight } from "react-iconly";

const AboutsUsSection = () => {
  return (
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

      <div className="relative aspect-[1/1.1] w-[40%] rounded-md bg-gray-200">
        {/* <Image
          src="/assets/images/united_hands.png"
          alt="helping hands"
          fill
          className="object-fit w-auto"
        /> */}
      </div>
    </section>
  );
};

export default AboutsUsSection;
