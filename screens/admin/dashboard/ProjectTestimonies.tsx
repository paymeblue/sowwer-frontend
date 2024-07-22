import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import AdminProjectsTestimoniesTable from "@components/tables/admin/AdminProjectsTestimonies";
import { Button } from "@components/ui/button";
import { PlusIcon } from "lucide-react";

interface Props {
  id: string;
}

const ProjectTestimoniesComp = ({ id }: Props) => {
  if (!id) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No testimony yet"
        desc="Add a new testimony and manage all your testimonies from here."
      />
    );
  }
  return (
    <ContentWrapper
      title={
        <div className="text-lg font-[600]">
          <span className="font-[400] text-[#555555]">Project Name &gt;</span>{" "}
          Testimonies
        </div>
      }
      right={
        <Button variant="secondary" className="space-x-2" size="md">
          <PlusIcon size={18} />
          <span>New Testimony</span>
        </Button>
      }
    >
      <AdminProjectsTestimoniesTable />
    </ContentWrapper>
  );
};

const ProjectTestimonies = ({ id }: Props) => {
  return (
    <NoSSRWrapper>
      <ProjectTestimoniesComp id={id} />
    </NoSSRWrapper>
  );
};

export default ProjectTestimonies;
