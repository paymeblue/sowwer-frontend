"use client";

import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import AdminProjectsTestimoniesTable from "@components/tables/admin/AdminProjectsTestimonies";
import { Button } from "@components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  id: string;
}

const ProjectTestimoniesComp = ({ id }: Props) => {
  const params = useSearchParams();
  const title = params.get("name");

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
        <div className="text-md font-[600]">
          <Link href="/admin/projects" className="hover:underline">
            <span className="font-[400] capitalize text-[#555555]">
              {title} &gt;
            </span>
          </Link>{" "}
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
