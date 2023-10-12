import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import ProjectCard from "@components/cards/ProjectCard";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import Pagination from "@components/shared/Pagination";

import usePagination from "@hooks/general/usePagination";
import { useGetMinistryProjectsQuery } from "services/projects";

interface Props {
  ministryId: string;
}

const MinistryProjectsSection = ({ ministryId }: Props) => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const {
    data: ministryProjects,
    isLoading,
    isFetching,
  } = useGetMinistryProjectsQuery({
    id: ministryId,
    page: pagination.current,
    status: "active",
  });

  if (!ministryProjects?.data && (isLoading || isFetching))
    return <Loader className="h-[50vh]" />;

  if (!ministryProjects?.data.length && !(isLoading || isFetching)) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No projects for this ministry"
        desc="Come back here once a ministry has published a project"
        className="h-[50vh]"
      />
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
        {ministryProjects?.data.map((project) => {
          return (
            <ProjectCard variant="default" {...project} key={project.id} />
          );
        })}
      </div>
      <Pagination
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        hasNext={ministryProjects?.paginationInfo.hasNext || false}
        hasPrevious={ministryProjects?.paginationInfo.hasPrevious || false}
      />
    </div>
  );
};

export default MinistryProjectsSection;
