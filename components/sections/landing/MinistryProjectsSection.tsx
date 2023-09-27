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
  } = useGetMinistryProjectsQuery({ id: ministryId, page: pagination.current });

  if (!ministryProjects?.data && (isLoading || isFetching)) return <Loader />;

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
    <div className="grid w-full grid-cols-3">
      {ministryProjects?.data.map((project) => {
        return <ProjectCard variant="default" {...project} key={project.id} />;
      })}
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
