"use client";
import { useGetProjectDonationsForDonorUserQuery } from "services/projects";
import ProjectCard from "@components/cards/ProjectCard";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, cardContainerVariant } from "lib/variants";
import usePagination from "@hooks/general/usePagination";
import EmptyState from "@components/shared/EmptyState";
import Emptydonor from "@components/assets/svg/emptyDonor";
import Link from "next/link";
import { Button } from "@components/ui/button";
import Loader from "@components/shared/Loader";
import Pagination from "@components/shared/Pagination";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

const ProjectDonationsComp = () => {
  const { handleNext, handlePrevious, pagination } = usePagination();
  const {
    data: donations,
    isFetching,
    isLoading,
  } = useGetProjectDonationsForDonorUserQuery({
    page: pagination.current,
    pageSize: pagination.pageSize,
  });

  if (isLoading) {
    return <Loader className="h-[60vh]" />;
  }

  if (!isLoading && !isFetching && !donations?.data?.length) {
    return (
      <EmptyState
        image={<Emptydonor />}
        title="You have not donated to a project"
        desc="Donate to projects you believe in and see them appear here."
        action={
          <Link href="/projects">
            <Button>Start donating</Button>
          </Link>
        }
      />
    );
  }
  return (
    <div className="flex w-full flex-col items-center">
      <motion.div
        variants={cardContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="mt-6 grid w-full grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {donations?.data
          .filter((donation, index, self) => {
            // Use the filter method to keep only the first occurrence of each unique id
            return index === self.findIndex((d) => d.id === donation.id);
          })
          .map((project, i) => {
            return (
              <ProjectCard
                {...project}
                variant="default"
                key={project.title + i}
              />
            );
          })}
      </motion.div>
      <Pagination
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        hasNext={donations?.paginationInfo.hasNext || false}
        hasPrevious={donations?.paginationInfo.hasPrevious || false}
      />
    </div>
  );
};

const ProjectDonations = () => {
  return (
    <NoSSRWrapper>
      <ProjectDonationsComp />
    </NoSSRWrapper>
  );
};

export default ProjectDonations;
