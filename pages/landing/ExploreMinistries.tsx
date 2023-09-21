"use client";
import MinistryCard, { IMinistryCard } from "@components/cards/MinistryCard";
import SectionContainer from "@components/sections/SectionContainer";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { motion } from "framer-motion";
import {
  DEFAULT_VIEWPORT,
  cardContainerVariant,
  defaultVariant,
} from "lib/variants";

const exploreMinistries: IMinistryCard[] = [
  {
    name: "Family Worship Centre",
    location: "Abuja, Nigeria",
    logoUrl: "",
  },
  {
    name: "The Bible Society of Nigeria",
    location: "Abuja, Nigeria",
    logoUrl: "",
  },
  {
    name: "Reedemed Christian Church of God",
    location: "Abuja, Nigeria",
    logoUrl: "",
  },
];

const ExploreMinistries = () => {
  return (
    <SectionContainer>
      <motion.section
        variants={defaultVariant({ delay: 0.1 })}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="safearea-top mb-20 w-full"
      >
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text_variant_h2 text-center text-[2.5rem]">
            Explore Ministries
          </h2>
          <p className="text_large_body_p w-[60%] text-center">
            Explore different ministries i.e, Churches and other Christian
            Organizations on Soower. Make a kingdom investment by donating to
            different ministries across Nigeria and supporting their projects.
          </p>
        </div>
        <div className="mt-8 flex w-full flex-col items-center  justify-center">
          <h3 className="text_regular_body_sb text-center">
            Browse by category
          </h3>
          <Tabs defaultValue="all-ministries" className="mt-4">
            <TabsList className="flex items-center space-x-2">
              <TabsTrigger value="all-ministries">All Ministries</TabsTrigger>
              <TabsTrigger value="churches">Churches</TabsTrigger>
              <TabsTrigger value="christian-organizations">
                Christian Organizations
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <motion.div
            variants={cardContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="mt-10 grid w-full grid-cols-3 gap-6"
          >
            {exploreMinistries.map((ministry, i) => {
              return <MinistryCard {...ministry} key={ministry.name + i} />;
            })}
          </motion.div>
        </div>
      </motion.section>
    </SectionContainer>
  );
};

export default ExploreMinistries;
