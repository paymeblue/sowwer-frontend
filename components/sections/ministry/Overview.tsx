"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinistryCreateProjectValidation } from "lib/validations/ministry";
import { useCreateProjectMutation } from "services/projects";
import { usePublishOrDraftProjectMutation } from "services/projects";

import MinistryProjectCreateForm, {
  ProjectDescription,
  UploadCoverPhoto,
} from "@components/forms/ministry/MinistryProjectCreateForm";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";
import QuestionRounded from "@components/assets/svg/QuestionRounded";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { useToast } from "@components/ui/use-toast";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { convertBase64toFile } from "@lib/functions";

interface Props {
  id?: string;
}

const OverviewComp = ({ id }: Props) => {
  const form = useForm<z.infer<typeof MinistryCreateProjectValidation>>({
    resolver: zodResolver(MinistryCreateProjectValidation),
  });
  const { toast } = useToast();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [publishOrDraftProject, { isLoading: togglingProject }] =
    usePublishOrDraftProjectMutation();

  const handleProjectCreate = async (
    values: z.infer<typeof MinistryCreateProjectValidation>
  ) => {
    const {
      amount,
      category,
      cover_photo: coverPhoto,
      description,
      title,
    } = values;
    try {
      const res = await createProject({
        amount: Number(amount.replace(/[₦,]/g, "")) as number,
        category,
        title,
        cover_photo: convertBase64toFile(
          coverPhoto,
          "cover_photo",
          "image/png"
        ) as File,
        description,
      }).unwrap();

      return { id: res.data.id };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Unable to create project",
        description:
          "A problem occured when creating the project, please try again later.",
      });
      return { id: null };
    }
  };

  const toggleProjectStatus = async (
    id: string,
    status: "active" | "drafted"
  ) => {
    try {
      await publishOrDraftProject({
        id,
        query: status,
      });
      toast({
        variant: "default",
        title: `Project successfully set to ${status}`,
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: `Unable to set project to ${status}`,
        description:
          "A problem occured when saving the project, please try again later.",
      });
    }
  };

  const saveDraft = async (
    values: z.infer<typeof MinistryCreateProjectValidation>
  ) => {
    if (!id) {
      const result = await handleProjectCreate(values);
      if (result?.id) {
        await toggleProjectStatus(result.id, "drafted");
      }
    } else {
      await toggleProjectStatus(id, "drafted");
    }
  };

  const publishProject = async (
    values: z.infer<typeof MinistryCreateProjectValidation>
  ) => {
    if (!id) {
      const result = await handleProjectCreate(values);
      if (result?.id) {
        await toggleProjectStatus(result.id, "active");
      }
    } else {
      await toggleProjectStatus(id, "active");
    }
  };

  return (
    <Form {...form}>
      <TabWrapper>
        <TabSectionWrapper
          contentClassname="w-[50%]"
          title="Main Details"
          desc="Choose a title, goal and category for your project.
"
        >
          <MinistryProjectCreateForm form={form} />
        </TabSectionWrapper>

        <TabSectionWrapper
          contentClassname="w-[50%]"
          title="Cover Photo"
          desc="Add a cover photo to your project."
          spaceTop
        >
          <UploadCoverPhoto form={form} />
        </TabSectionWrapper>

        <TabSectionWrapper
          spaceTop
          orientation="vertical"
          title={
            <div className="flex flex-row items-center space-x-1">
              <span>Story</span> <QuestionRounded />
            </div>
          }
          desc="Describe and talk about your project."
        >
          <div className="">
            <ProjectDescription form={form} />
          </div>
        </TabSectionWrapper>

        <div className="ml-auto flex w-fit space-x-4">
          <Button
            onClick={form.handleSubmit(saveDraft)}
            variant="outline"
            className="w-fit border-accent text-accent"
            loading={togglingProject || isLoading}
          >
            Save as draft
          </Button>
          <Button
            onClick={form.handleSubmit(publishProject)}
            variant="secondary"
            loading={togglingProject || isLoading}
          >
            Publish
          </Button>
        </div>
      </TabWrapper>
    </Form>
  );
};

const Overview = ({ id }: Props) => {
  return (
    <NoSSRWrapper>
      <OverviewComp id={id} />
    </NoSSRWrapper>
  );
};

export default Overview;
