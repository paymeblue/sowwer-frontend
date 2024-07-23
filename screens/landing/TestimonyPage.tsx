/* eslint-disable @next/next/no-head-element */
"use client";

import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import SectionContainer from "@components/sections/SectionContainer";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import { useGetTestimonyQuery } from "services/testimonies";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import Image from "next/image";
import Tag from "@components/ui/tag";
import { getColorForTag } from "@components/cards/ProjectCard";
import Link from "next/link";
import { Heart2 } from "react-iconly";
import { formatCurrency } from "@lib/functions";
import Soower from "@components/assets/svg/Soower";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import moment from "moment";

interface Props {
  testimonyId: string;
}

const PageComp = ({ testimonyId }: Props) => {
  const {
    data: details,
    isLoading,
    isFetching,
  } = useGetTestimonyQuery({
    id: testimonyId,
  });

  if (!details?.data && (isLoading || isFetching)) return <Loader />;
  if (!details?.data && !(isLoading || isFetching)) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No testimony found"
        desc="We currently don't have a testimony with that id"
        className="h-[80vh]"
      />
    );
  }
  const category = "widow";

  const {
    amount_raised,
    cover_photo,
    created_at,
    ministry_name,
    number_of_people_impacted,
    project_name,
    story,
    title,
  } = details?.data!;

  return (
    <SectionContainer>
      <head>
        <title>{`${title} | Soower`}</title>
      </head>
      <motion.div
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="safearea-top mb-20 w-full"
      >
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative aspect-[1/0.65] w-full overflow-hidden rounded-[0.625rem]">
            {cover_photo && (
              <Image
                src={cover_photo}
                alt={title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex flex-col space-y-4 lg:space-y-2">
              <Tag
                color={
                  getColorForTag(category.toLowerCase())?.tagColor || "#9B51E0"
                }
                backgroundColor={
                  getColorForTag(category.toLowerCase())?.bgColor || "#9747FF24"
                }
                className="text-[.75rem]"
              >
                {category.toUpperCase()}
              </Tag>
              <h2 className="text_variant_h2">{title}</h2>
              <span className="text-sm">
                Posted: {moment(created_at).format("Do MMMM YYYY")}
              </span>
            </div>

            <div className="mt-8 flex w-full flex-col lg:mt-0">
              <div className="flex flex-col space-y-0">
                <span className="text-lg font-medium text-black">
                  {project_name}
                </span>
                <p className="text-sm">
                  ORGANIZED BY{" "}
                  <Link
                    href={`/ministries/123`}
                    className="text-accent underline"
                  >
                    {ministry_name}
                  </Link>
                </p>
              </div>

              <div className="mt-12 flex w-full items-center space-x-8 lg:mb-8 lg:mt-8">
                <div className="flex w-fit items-center space-x-2">
                  <Heart2 set="light" primaryColor="#FFC629" />
                  <p className={`font-body  text-xs text-body-2`}>
                    <strong className="font-sub-title text-[.85rem] font-bold leading-[15.36px] text-black">
                      ₦{formatCurrency(amount_raised || "0")}
                    </strong>
                    <br />
                    <small className="font-body text-[.7rem] leading-[12.49px] text-body-2">
                      money raised
                    </small>
                  </p>
                </div>
                <div className="flex w-fit items-center space-x-2">
                  <Soower />
                  <p className="font-body  text-xs text-body-2">
                    <strong className="font-sub-title text-[.85rem] font-bold leading-[15.36px] text-black">
                      {number_of_people_impacted}
                    </strong>
                    <br />
                    <small className="font-body text-[.7rem] leading-[12.49px] text-body-2">
                      widows impacted
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 w-full">
          <p className="text_regular_body_p">{story}</p>
        </section>
      </motion.div>
    </SectionContainer>
  );
};

const TestimonyPage = ({ testimonyId }: Props) => {
  return (
    <NoSSRWrapper>
      <PageComp testimonyId={testimonyId} />
    </NoSSRWrapper>
  );
};

export default TestimonyPage;
