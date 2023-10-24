"use client";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import Link from "next/link";
import MinistryProjectsTable from "@components/tables/ministry/MinistryProjectsTable";
import useUserAuth from "@hooks/auth/useUserAuth";
import usePagination from "@hooks/general/usePagination";
import { useGetMinistryProjectsQuery } from "services/projects";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

const ProjectsPageComp = () => {
  const { user } = useUserAuth();
  let ministryId: string | undefined;
  if (user && "ministry" in user) {
    ministryId = user?.ministry?.id;
  }
  const { pagination } = usePagination();
  const { data: projects, isLoading } = useGetMinistryProjectsQuery({
    id: ministryId,
    page: pagination.current,
  });

  if (!projects?.data && isLoading) return <Loader className="h-[80vh]" />;

  return (
    <MainContentWrapper
      title="Projects"
      right={
        <Link href="/ministry/projects/create">
          <Button
            size="md"
            variant="secondary"
            className="space-x-2 text-[13px]"
          >
            <Plus size={20} /> <span>New Project</span>
          </Button>
        </Link>
      }
    >
      {!projects?.data.length && !isLoading ? (
        <EmptyState
          image={<EmptySpeaker />}
          title="No projects yet"
          desc="Create a new project and manage all your projects from here."
        />
      ) : (
        <div className="mt-8 w-full">
          <MinistryProjectsTable ministryId={ministryId || ""} />
        </div>
      )}
    </MainContentWrapper>
  );
};

const ProjectsPage = () => {
  return (
    <NoSSRWrapper>
      <ProjectsPageComp />
    </NoSSRWrapper>
  );
};

export default ProjectsPage;
