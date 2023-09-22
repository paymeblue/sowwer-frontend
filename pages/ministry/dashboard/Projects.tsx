import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";

const ProjectsPage = () => {
  return (
    <MainContentWrapper
      title="Projects"
      right={
        <Button size="md" variant="secondary" className="space-x-2 text-[13px]">
          <Plus size={20} /> <span>New Project</span>
        </Button>
      }
    >
      <EmptyState
        image={<EmptySpeaker />}
        title="No projects yet"
        desc="Create a new project and manage all your projects from here."
      />
    </MainContentWrapper>
  );
};

export default ProjectsPage;
