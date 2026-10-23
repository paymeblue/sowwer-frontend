"use client";
import MinistryCard from "@components/cards/MinistryCard";
import Loader from "@components/shared/Loader";
import ExploreEmpty from "@components/tabs/landing/ExploreEmpty";
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
    <div className="flex w-full flex-col items-center justify-center">
      <Tabs
        aria-label="Browse by category"
        defaultValue="all-ministries"
        className="mt-4"
      >
        <TabsList className="flex h-auto items-center gap-1 rounded-full bg-black/[0.04] p-1.5">
          <TabsTrigger
            className="rounded-full px-4 py-2 font-montreal text-sm text-body-2 data-[state=active]:bg-secondary-black data-[state=active]:text-white data-[state=active]:shadow-none lg:px-5"
            value="all-ministries"
            onClick={() => setCategory("all")}
          >
            All Ministries
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full px-4 py-2 font-montreal text-sm text-body-2 data-[state=active]:bg-secondary-black data-[state=active]:text-white data-[state=active]:shadow-none lg:px-5"
            value="churches"
            onClick={() => setCategory("church")}
          >
            Churches
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full px-4 py-2 font-montreal text-sm text-body-2 data-[state=active]:bg-secondary-black data-[state=active]:text-white data-[state=active]:shadow-none lg:px-5"
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
          className="mt-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
                  id={id}
                />
              );
            })
          ) : (
            <div className="col-span-full">
              <ExploreEmpty
                title="No ministries in this category yet"
                desc="Try another category, or give directly to one of our programmes."
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
