"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import Loader from "@components/shared/Loader";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import MinistryProjectsTable from "@components/tables/ministry/MinistryProjectsTable";
import { Button } from "@components/ui/button";
import useUserAuth from "@hooks/auth/useUserAuth";
import usePagination from "@hooks/general/usePagination";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useGetMinistryProjectsQuery } from "services/projects";

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

  if (!user?.ministry?.verificationStatus) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="Pending Verification"
        desc="Your ministry is still awaiting verification. Please hang tight while we verify, afterwards you can create projects"
        action={
          <Link href="mailto:info@soower.org">
            <Button variant="secondary">Contact Support</Button>
          </Link>
        }
      />
    );
  }

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
