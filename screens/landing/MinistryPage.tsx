/* eslint-disable @next/next/no-head-element */
"use client";
import SectionContainer from "@components/sections/SectionContainer";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import { Globe } from "lucide-react";
import { Heart2, InfoCircle, Location } from "react-iconly";

import Facebook from "@components/assets/svg/Facebook";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import InstaColor from "@components/assets/svg/instaColor";
import LinkedInColor from "@components/assets/svg/linkedInColor";
import Twitter from "@components/assets/svg/twitter";
import YoutubeColor from "@components/assets/svg/youtubeColor";
import MinistryProjectsSection from "@components/sections/landing/MinistryProjectsSection";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useGetMinistryDetailsQuery } from "services/ministry";

interface Props {
  ministryId: string;
}

const MinistryPageComp = ({ ministryId }: Props) => {
  const {
    data: ministryDetails,
    isLoading,
    isFetching,
  } = useGetMinistryDetailsQuery(ministryId);

  if (!ministryDetails?.data && (isLoading || isFetching)) return <Loader />;

  if (!ministryDetails?.data && !(isLoading || isFetching)) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No ministry found"
        desc="We currently don't have a ministry with that id"
        className="h-[80vh]"
      />
    );
  }

  const { about, state, website, name, id, logo, social_links } =
    ministryDetails?.data!;

  return (
    <SectionContainer>
      <head>
        <title>{`${name} | Soower`}</title>
      </head>
      <motion.div
        variants={defaultVariant({})}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="safearea-top mb-20 w-full"
      >
        <div className="flex items-center space-x-4">
          {logo ? (
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image
                src={logo}
                alt="ministry logo"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-14 w-14 rounded-full bg-gray-200" />
          )}
          <h1 className="text_variant_h2 text-[2.1rem] capitalize">{name}</h1>
        </div>
        <Tabs
          defaultValue="ministry-profile"
          className="mt-8 flex flex-col max-lg:items-center"
        >
          <TabsList className="">
            <TabsTrigger value="ministry-profile">Ministry Profile</TabsTrigger>
            <TabsTrigger value="ministry-projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="ministry-profile">
            <div className="flex w-full flex-col lg:flex-row lg:justify-between">
              <div className="flex w-full flex-col space-y-2 lg:w-[55%]">
                <h3 className="text_variant_h2 text-[1.8rem]">Story</h3>
                <p className="text_regular_body_p">{about || "N/A"}</p>
              </div>

              <div className="mt-10 w-full rounded-[15px] bg-white p-6 lg:mt-0 lg:w-[25%]">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <Location size={24} />
                    <p className="text_small_body_p">{state}</p>
                  </div>

                  {website && website !== "undefined" && (
                    <div className="flex items-center space-x-3">
                      <Globe size={24} />
                      <Link
                        href={`http://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text_small_body_p"
                      >
                        {website}
                      </Link>
                    </div>
                  )}

                  {Object.keys(social_links).length > 0 && (
                    <div className="flex items-center space-x-4">
                      {social_links.facebook && (
                        <Link
                          href={`http://${social_links.facebook}`}
                          className="text-[#1877F2]"
                        >
                          <Facebook />
                        </Link>
                      )}
                      {social_links.facebook && (
                        <Link
                          href={`http://${social_links.instagram}`}
                          className="text-[#1877F2]"
                        >
                          <InstaColor />
                        </Link>
                      )}
                      {social_links.facebook && (
                        <Link
                          href={`http://${social_links.twitter}`}
                          className="text-[#1877F2]"
                        >
                          <Twitter />
                        </Link>
                      )}
                      {social_links.facebook && (
                        <Link
                          href={`http://${social_links.linkedin}`}
                          className="text-[#1877F2]"
                        >
                          <LinkedInColor />
                        </Link>
                      )}

                      {social_links.facebook && (
                        <Link
                          href={`http://${social_links.youtube}`}
                          className="text-[#1877F2]"
                        >
                          <YoutubeColor playColor="white" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 w-fit rounded-[6px] bg-[#FFF8D9] p-3">
                  <div className="flex space-x-2">
                    <div>
                      <InfoCircle />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="font-body text-[.8rem] text-body-1 ">
                        To make a general donation to our ministry use the
                        button below.
                      </p>
                    </div>
                  </div>
                </div>

                <Link href={`/donate/ministries/${id}`}>
                  <Button className="mt-6 w-full space-x-2">
                    <Heart2 set="bold" size={19} />
                    <span>Make a donation</span>
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="ministry-projects">
            <MinistryProjectsSection ministryId={ministryId} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </SectionContainer>
  );
};

const MinstryPage = ({ ministryId }: Props) => {
  return (
    <NoSSRWrapper>
      <MinistryPageComp ministryId={ministryId} />
    </NoSSRWrapper>
  );
};

export default MinstryPage;
