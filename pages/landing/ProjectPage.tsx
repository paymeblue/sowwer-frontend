"use client";
import Link from "next/link";

import SectionContainer from "@components/sections/SectionContainer";
import Loader from "@components/shared/Loader";
import { Button } from "@components/ui/button";
import { Progress } from "@components/ui/progress";
import Tag from "@components/ui/tag";
import { formatCurrency } from "@lib/functions";
import { Link as LinkIcon } from "lucide-react";
import { Heart2 } from "react-iconly";
import { motion } from "framer-motion";

import { useGetProjectDetailsQuery } from "services/projects";
import Image from "next/image";
import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useCopyToClipboard from "@hooks/general/useCopyToClipboard";
import { useToast } from "@components/ui/use-toast";
import ProjectDonationsDialog from "@components/dialogs/landing/ProjectDonationsDialog";

interface Props {
  projectId: string;
}

const PageComp = ({ projectId }: Props) => {
  const { toast } = useToast();
  const { copyToClipboard } = useCopyToClipboard({
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Project link copied successfully",
        description: "You can now share this link with friends and family",
      });
    },
    onFailure: () => {
      toast({
        variant: "destructive",
        title: "Error occured copying link",
        description:
          "There seems to be an error copying project link, please try again later",
      });
    },
  });

  const {
    data: projectDetails,
    isLoading,
    isFetching,
  } = useGetProjectDetailsQuery(projectId);

  if (!projectDetails?.data && (isLoading || isFetching)) return <Loader />;

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
    link,
    id,
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
          <div className="relative aspect-[1/0.7] w-full overflow-hidden rounded-[0.625rem]">
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
              <Tag
                color={"#9B51E0"}
                backgroundColor={"#9747FF24"}
                className="text-[.75rem]"
              >
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
                  <h5 className="font-sub-title text-[1rem] font-bold">
                    ₦{formatCurrency(amountRaised)}{" "}
                    <span className="font-body text-[.75rem] font-[400] text-body-2">
                      raised
                    </span>
                  </h5>
                  <h5 className="font-title text-[1.2rem] font-bold">
                    ₦{formatCurrency(targetAmount)}
                  </h5>
                </div>
                <Progress value={Number(donationPercent || "0")} />
                <p className="text_regular_body_b">
                  {donors} <span className="font-[400] uppercase">donors</span>
                </p>
              </div>
              <div className="mb-10 mt-6 flex space-x-2">
                <Link href={`/donate/projects/${id}`}>
                  <Button className="space-x-2">
                    <Heart2 set="bold" size={19} />
                    <span>Donate</span>
                  </Button>
                </Link>
                <Button
                  variant="link"
                  className="space-x-2 text-accent"
                  onClick={() => copyToClipboard(link)}
                >
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
            <ProjectDonationsDialog projectId={projectId} title={title} />
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
