"use client";
import Link from "next/link";

import DonationCard from "@components/cards/DonationCard";
import SectionContainer from "@components/sections/SectionContainer";
import Loader from "@components/shared/Loader";
import { Button } from "@components/ui/button";
import { Progress } from "@components/ui/progress";
import Tag from "@components/ui/tag";
import { formatCurrency } from "@lib/functions";
import { Link as LinkIcon } from "lucide-react";
import { Heart2 } from "react-iconly";
import { motion } from "framer-motion";

import {
  useGetProjectDetailsQuery,
  useGetMinistryProjectDonorsQuery,
} from "services/projects";
import Image from "next/image";
import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

interface Props {
  projectId: string;
}

const PageComp = ({ projectId }: Props) => {
  const {
    data: projectDetails,
    isLoading,
    isFetching,
  } = useGetProjectDetailsQuery(projectId);

  const { data: projectDonors } = useGetMinistryProjectDonorsQuery(projectId);
  const sortedProjectDonors = projectDonors?.data
    ?.map((item) => ({ ...item }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (!projectDetails?.data && (isLoading || isFetching))
    return <Loader showLogo />;

  if (!projectDetails?.data && !(isLoading || isFetching)) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No ministry found"
        desc="We currently don't have a ministry with that id"
        className="h-[80vh]"
      />
    );
  }

  const {
    title,
    organisedBy,
    category,
    amountRaised,
    description,
    targetAmount,
    organisedById,
    donors,
    image,
    donationPercent,
  } = projectDetails?.data!;

  return (
    <SectionContainer>
      <motion.div
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="safearea-top mb-20 w-full"
      >
        {/* Top Section */}
        <section className="grid grid-cols-2 gap-10">
          {/* Image goes here */}
          <div className="relative aspect-[1/0.7] w-full rounded-md">
            {image && (
              <Image
                src={image}
                alt="project image"
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex flex-col space-y-2">
              <Tag color={"#9B51E0"} backgroundColor={"#9747FF24"}>
                {category.toUpperCase()}
              </Tag>
              <h2 className="text_variant_h2">{title}</h2>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <p className="text_medium_body_p">
                  Organized by{" "}
                  <Link href={`/ministries/${organisedById}`}>
                    <span className="cursor-pointer font-[400] uppercase text-accent transition-all duration-300 hover:underline">
                      {organisedBy}
                    </span>
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-sub-title text-[.8rem] font-bold">
                    ₦{formatCurrency(amountRaised)}{" "}
                    <span className="font-body text-[.7rem] font-[400]">
                      raised
                    </span>
                  </h5>
                  <h5 className="font-title text-[1rem] font-bold">
                    ₦{formatCurrency(targetAmount)}
                  </h5>
                </div>
                <Progress value={Number(donationPercent || "0")} />
                <p className="text_regular_body_b">
                  {donors} <span className="font-[400] uppercase">donors</span>
                </p>
              </div>
              <div className="mb-10 mt-6 flex space-x-2">
                <Button className="space-x-2">
                  <Heart2 set="bold" size={19} />
                  <span>Donate</span>
                </Button>
                <Button variant="link" className="space-x-2 text-accent">
                  <LinkIcon size={19} />
                  <span>Share this project</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="mt-10 grid grid-cols-2 gap-10">
          <div className="flex flex-col space-y-3">
            <h3 className="text_variant_h2 text-[2rem]">Story</h3>
            <div className="felx flex-col space-y-10">
              <p className="text_regular_body_p">{description}</p>
            </div>
          </div>

          <div className=" flex w-full justify-center">
            <div className="h-fit w-[70%] rounded-[15px] bg-white p-[2rem]">
              <h3 className="text_variant_h2 text-[2rem]">Donations</h3>
              <div className="mt-6 min-h-[10rem] w-full space-y-10">
                {sortedProjectDonors && sortedProjectDonors.length ? (
                  sortedProjectDonors.slice(0, 3).map((donor) => {
                    const { amount, name, createdAt, id } = donor;
                    return (
                      <DonationCard
                        key={id}
                        name={name}
                        amount={amount}
                        createdAt={createdAt}
                      />
                    );
                  })
                ) : (
                  <p className="text-regular-body-p text-center ">
                    No donations yet for this project
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                className="mt-10 w-full border-accent text-accent"
              >
                View more donations
              </Button>
            </div>
          </div>
        </section>
      </motion.div>
    </SectionContainer>
  );
};

const ProjectPage = ({ projectId }: Props) => {
  return (
    <NoSSRWrapper>
      <PageComp projectId={projectId} />
    </NoSSRWrapper>
  );
};

export default ProjectPage;
