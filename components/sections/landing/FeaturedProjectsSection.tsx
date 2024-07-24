"use client";
import { Button } from "@components/ui/button";
import { ArrowRight } from "react-iconly";
import SectionContainer from "../SectionContainer";
import { motion } from "framer-motion";
import {
  cardContainerVariant,
  DEFAULT_VIEWPORT,
  defaultVariant,
} from "lib/variants";
import Link from "next/link";
import { useGetTestimoniesQuery } from "services/testimonies";
import TestimonyCard from "@components/cards/TestimonyCard";

const FeaturedProjectSection = () => {
  const { data } = useGetTestimoniesQuery({
    limit: 3,
    page: 1,
  });

  if (!data?.data.length) {
    return null;
  }

  return (
    <div className="w-[100vw] bg-white py-16">
      <SectionContainer>
        <motion.section
          variants={defaultVariant({ delay: 0.5 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
        >
          <div className="mx-auto flex w-full flex-col space-y-4 lg:w-[60%]">
            <h2 className="text_variant_h2 text-center">
              Featured testimonies from past projects
            </h2>
            <p className="text_medium_body_p text-center">
              Read testimonies from past projects, each one exemplifying the
              impact of our collective faith, generosity, and compassion in
              action.
            </p>
            <Link href="/testimonies" className="self-center">
              <Button
                variant="link"
                className=" space-x-2 font-semibold text-accent"
              >
                <span>Explore more testimonies</span>
                <ArrowRight set="light" size={18} />
              </Button>
            </Link>
          </div>

          <motion.div
            variants={cardContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {data?.data.map((testimony, i) => {
              const {
                id,
                amount_raised,
                cover_photo,
                ministry_name,
                number_of_people_impacted,
                project_name,
                story,
                title,
                ministry_id,
              } = testimony;

              return (
                <TestimonyCard
                  key={id}
                  id={id}
                  amountRaised={amount_raised}
                  cover_photo={cover_photo}
                  title={title}
                  category="widows"
                  description={story}
                  featuredStat={{
                    metric: "widows impacted",
                    value: number_of_people_impacted,
                  }}
                  project={{
                    title: project_name,
                  }}
                  ministry={{
                    name: ministry_name,
                    id: ministry_id,
                  }}
                />
              );
            })}
          </motion.div>
        </motion.section>
      </SectionContainer>
    </div>
  );
};

export default FeaturedProjectSection;
