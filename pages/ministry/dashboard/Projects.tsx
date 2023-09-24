import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import Link from "next/link";
import MinistryProjectsTable from "@components/tables/ministry/MinistryProjectsTable";

const ProjectsPage = () => {
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
      {/* <EmptyState
        image={<EmptySpeaker />}
        title="No projects yet"
        desc="Create a new project and manage all your projects from here."
      /> */}
      <div className="mt-8 w-full">
        <MinistryProjectsTable />
      </div>
    </MainContentWrapper>
  );
};

export default ProjectsPage;
