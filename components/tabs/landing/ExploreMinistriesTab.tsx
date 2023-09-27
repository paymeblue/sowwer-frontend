"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import MinistryCard from "@components/cards/MinistryCard";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import Pagination from "@components/shared/Pagination";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import usePagination from "@hooks/general/usePagination";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import { useState } from "react";
import { useExploreMinistriesQuery } from "services/ministry";

const ExploreMinistriesTab = () => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const [category, setCategory] = useState<"all" | "church" | "organisation">(
    "all"
  );
  const { data, isLoading, isFetching } = useExploreMinistriesQuery({
    page: pagination.current,
    query: category,
  });
  return (
    <div className="mt-8 flex w-full flex-col items-center  justify-center">
      <h3 className="text_regular_body_sb text-center">Browse by category</h3>
      <Tabs defaultValue="all-ministries" className="mt-4">
        <TabsList className="flex items-center space-x-2">
          <TabsTrigger
            value="all-ministries"
            onClick={() => setCategory("all")}
          >
            All Ministries
          </TabsTrigger>
          <TabsTrigger value="churches" onClick={() => setCategory("church")}>
            Churches
          </TabsTrigger>
          <TabsTrigger
            value="christian-organizations"
            onClick={() => setCategory("organisation")}
          >
            Christian Organizations
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {isLoading || isFetching ? (
        <Loader className="h-[50vh]" />
      ) : (
        <motion.div
          variants={defaultVariant({ delay: 0.3 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="mt-10 grid w-full grid-cols-3 gap-6"
        >
          {data?.data.length ? (
            data?.data.map((ministry) => {
              const { id, name, logo, state } = ministry;
              return (
                <MinistryCard
                  key={id}
                  location={state}
                  logoUrl={logo}
                  name={name}
                />
              );
            })
          ) : (
            <div className="col-span-3">
              <EmptyState
                image={<EmptySpeaker />}
                title={`No ministry in this category`}
                desc="We are working hard to spread to the word about Soower"
              />
            </div>
          )}
        </motion.div>
      )}
      <Pagination
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        hasNext={data?.paginationInfo.hasNext || false}
        hasPrevious={data?.paginationInfo.hasPrevious || false}
      />
    </div>
  );
};

export default ExploreMinistriesTab;
