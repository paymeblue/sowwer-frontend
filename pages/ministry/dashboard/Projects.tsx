import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";

const ProjectsPage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-body text-[1.5rem] font-[700]">Projects</h2>
        <Button size="md" variant="secondary" className="space-x-2 text-[13px]">
          <Plus size={20} /> <span>New Project</span>
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          image={<EmptySpeaker />}
          title="No projects yet"
          desc="Create a new project and manage all your projects from here."
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
