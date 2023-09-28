"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import ProjectCard from "@components/cards/ProjectCard";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
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
    <div className="mt-8 flex w-full flex-col items-center  justify-center">
      <h3 className="text_regular_body_sb text-center">Browse by category</h3>
      <Tabs defaultValue="all-projects" className="mt-4">
        <TabsList className="flex items-center space-x-0 lg:space-x-2">
          <TabsTrigger value="all-projects" onClick={() => setCategory("all")}>
            All Projects
          </TabsTrigger>
          <TabsTrigger value="widows" onClick={() => setCategory("widows")}>
            Widows
          </TabsTrigger>
          <TabsTrigger value="orphans" onClick={() => setCategory("orphans")}>
            Orphans
          </TabsTrigger>
          <TabsTrigger value="missions" onClick={() => setCategory("missions")}>
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
            <div className="col-span-3">
              <EmptyState
                image={<EmptySpeaker />}
                title={`No published projects yet for this category`}
                desc="We are working hard to have more projects soon."
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
