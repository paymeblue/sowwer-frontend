"use client";
import { Button } from "@components/ui/button";
import { ArrowRight } from "react-iconly";
import SectionContainer from "./SectionContainer";
import FeaturedProjectCard from "@components/cards/FeaturedProjectCard";

const FeaturedProjectSection = () => {
  return (
    <div className="w-[100vw] bg-white py-16">
      <SectionContainer>
        <div className="mx-auto flex w-[60%] flex-col space-y-4">
          <h2 className="text-center font-title text-[2.8rem] leading-[2rem]">
            Some of our featured projects
          </h2>
          <p className="text-center font-body text-sm leading-[26px] text-body-1">
            Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitudin
            dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
            dolor sit amet consectetur.
          </p>
          <Button
            variant="link"
            className=" space-x-2 font-semibold text-accent"
          >
            <span>Explore ongoing projects</span>
            <ArrowRight set="light" size={18} />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-12">
          <FeaturedProjectCard />
        </div>
      </SectionContainer>
    </div>
  );
};

export default FeaturedProjectSection;
