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
import InstaColor from "@components/assets/svg/instaColor";
import Twitter from "@components/assets/svg/twitter";
import LinkedInColor from "@components/assets/svg/linkedInColor";
import YoutubeColor from "@components/assets/svg/youtubeColor";
import { Button } from "@components/ui/button";
import { useGetMinistryDetailsQuery } from "services/ministry";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import MinistryProjectsSection from "@components/sections/landing/MinistryProjectsSection";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

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

  const { about, state, website, name, id, logo } = ministryDetails?.data!;

  return (
    <SectionContainer>
      <Head>
        <title>{`${name} | Soower`}</title>
      </Head>
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
        <Tabs defaultValue="ministry-profile" className="mt-8">
          <TabsList>
            <TabsTrigger value="ministry-profile">Ministry Profile</TabsTrigger>
            <TabsTrigger value="ministry-projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="ministry-profile">
            <div className="flex w-full justify-between">
              <div className="flex w-[55%] flex-col space-y-2">
                <h3 className="text_variant_h2 text-[1.8rem]">Story</h3>
                <p className="text_regular_body_p">{about || "N/A"}</p>
              </div>

              <div className="w-[25%] rounded-[15px] bg-white p-6">
                <div className="flex flex-col space-y-8">
                  <div className="flex items-center space-x-3">
                    <Location size={24} />
                    <p className="text_small_body_p">{state}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Globe size={24} />
                    <p className="text_small_body_p">{website}</p>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-[#1877F2]">
                      <Facebook />
                    </div>

                    <div className="text-[#1877F2]">
                      <InstaColor />
                    </div>

                    <div className="text-[#1DA1F2]">
                      <Twitter />
                    </div>

                    <LinkedInColor />

                    <div className="text-[#FF0000]">
                      <YoutubeColor playColor="white" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 w-fit rounded-[6px] bg-[#FFF8D9] p-3">
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
