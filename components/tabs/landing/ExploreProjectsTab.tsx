"use client";
import ProjectCard from "@components/cards/ProjectCard";
import Loader from "@components/shared/Loader";
import ExploreEmpty from "@components/tabs/landing/ExploreEmpty";
import Pagination from "@components/shared/Pagination";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import usePagination from "@hooks/general/usePagination";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import { useState } from "react";
import { useExploreProjectsQuery } from "services/projects";

const ExploreProjectsTab = () => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const [category, setCategory] = useState<
    "all" | "widows" | "orphans" | "missions"
  >("all");
  const { data, isLoading, isFetching } = useExploreProjectsQuery({
    page: pagination.current,
    query: category,
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Tabs
        aria-label="Browse by category"
        defaultValue="all-projects"
        className="mt-4"
      >
        <TabsList className="flex h-auto items-center gap-1 rounded-full bg-black/[0.04] p-1.5">
          <TabsTrigger
            className="rounded-full px-4 py-2 font-montreal text-sm text-body-2 data-[state=active]:bg-secondary-black data-[state=active]:text-white data-[state=active]:shadow-none lg:px-5"
            value="all-projects"
            onClick={() => setCategory("all")}
          >
            All Projects
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full px-4 py-2 font-montreal text-sm text-body-2 data-[state=active]:bg-secondary-black data-[state=active]:text-white data-[state=active]:shadow-none lg:px-5"
            value="widows"
            onClick={() => setCategory("widows")}
          >
            Widows
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full px-4 py-2 font-montreal text-sm text-body-2 data-[state=active]:bg-secondary-black data-[state=active]:text-white data-[state=active]:shadow-none lg:px-5"
            value="orphans"
            onClick={() => setCategory("orphans")}
          >
            Orphans
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full px-4 py-2 font-montreal text-sm text-body-2 data-[state=active]:bg-secondary-black data-[state=active]:text-white data-[state=active]:shadow-none lg:px-5"
            value="missions"
            onClick={() => setCategory("missions")}
          >
            Missions
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
          className="mt-10 grid w-full grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {data?.data.length ? (
            data?.data.map((project, i) => {
              return (
                <ProjectCard {...project} variant="default" key={project.id} />
              );
            })
          ) : (
            <div className="col-span-full">
              <ExploreEmpty
                {...(category === "all"
                  ? {
                      title: "No published projects yet",
                      desc: "Projects from the churches and organisations we work with will appear here. Meanwhile, you can follow what SOOWER has delivered so far, or give directly to a programme.",
                    }
                  : {
                      title: "No published projects in this category yet",
                      desc: "Try another category, or give directly to one of our programmes.",
                    })}
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

export default ExploreProjectsTab;
