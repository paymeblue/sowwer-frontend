"use client";
import * as z from "zod";
import { UseFormReturn } from "react-hook-form";
import { MinistryCreateProjectValidation } from "lib/validations/ministry";
import {
  useGetProjectQuery,
  useEditProjectMutation,
  usePublishOrDraftProjectMutation,
  useCreateProjectMutation,
} from "services/projects";

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
import { convertBase64toFile, formatCurrency } from "@lib/functions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id?: string | null;
  form: UseFormReturn<z.infer<typeof MinistryCreateProjectValidation>>;
}

const OverviewComp = ({ id, form }: Props) => {
  const { data: project } = useGetProjectQuery(id);
  const router = useRouter();
  // const form = useForm<z.infer<typeof MinistryCreateProjectValidation>>({
  //   resolver: zodResolver(MinistryCreateProjectValidation),
  // });
  const { toast } = useToast();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [editProject, { isLoading: updatingProject }] =
    useEditProjectMutation();
  const [publishOrDraftProject, { isLoading: togglingProject }] =
    usePublishOrDraftProjectMutation();

  useEffect(() => {
    if (!project?.data) return;
    const {
      category,
      cover_photo: coverPhoto,
      description,
      targetAmount,
      title,
    } = project.data;
    form.setValue("title", title);
    form.setValue("cover_photo", coverPhoto || "");
    form.setValue("category", category);
    form.setValue("description", description || "");
    form.setValue("amount", `₦ ${formatCurrency(targetAmount)}`);
  }, [project, form]);

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
    status: "active" | "drafted",
    options?:
      | {
          redirect?: boolean;
        }
      | undefined
  ) => {
    try {
      await publishOrDraftProject({
        id,
        query: status,
      }).unwrap();
      toast({
        variant: "default",
        title: `Project successfully set to ${status}`,
      });
      if (options && options.redirect) {
        router.push("/ministry/projects");
      }
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
        router.push("/ministry/projects");
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
        router.push("/ministry/projects");
      }
    } else {
      await toggleProjectStatus(id, "active");
    }
  };

  const updateProject = async (
    values: z.infer<typeof MinistryCreateProjectValidation>
  ) => {
    if (!id) return;
    const {
      amount,
      category,
      description,
      title,
      cover_photo: coverPhoto,
    } = values;
    try {
      const payload: {
        [key: string]: any;
      } = {
        id,
        amount: Number(amount.replace(/[₦,]/g, "")) as number,
        description,
        category,
      };

      if (title !== project?.data?.title) {
        payload["title"] = title;
      }

      if (coverPhoto !== project?.data?.cover_photo && coverPhoto.length > 10) {
        payload["cover_photo"] = convertBase64toFile(coverPhoto, "cover_photo");
      }
      await editProject(payload).unwrap();
      toast({
        title: "Project updated successfully",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Unable to update project",
        description:
          "A problem occured when updating the project, please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <TabWrapper>
        <TabSectionWrapper
          contentClassname=""
          title="Main Details"
          desc="Choose a title, goal and category for your project.
"
        >
          <MinistryProjectCreateForm
            form={form}
            id={id || undefined}
            status={project?.data.status || undefined}
          />
        </TabSectionWrapper>

        <TabSectionWrapper
          contentClassname=""
          title="Cover Photo"
          desc="Add a cover photo to your project."
          spaceTop
        >
          <UploadCoverPhoto
            form={form}
            id={id || undefined}
            fileUrl={project?.data?.cover_photo || undefined}
          />
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

        {!id ? (
          <div className="ml-auto flex w-fit space-x-4">
            <Button
              onClick={form.handleSubmit(saveDraft)}
              variant="outline"
              className="w-fit whitespace-nowrap border-accent text-accent"
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
        ) : (
          <div className="ml-auto flex w-fit space-x-4">
            {project?.data.status === "drafted" && (
              <Button
                onClick={() =>
                  toggleProjectStatus(id, "active", {
                    redirect: true,
                  })
                }
                variant="outline"
                className="w-fit border-accent text-accent"
                loading={togglingProject || isLoading}
              >
                Publish project
              </Button>
            )}
            <Button
              onClick={form.handleSubmit(updateProject)}
              variant="secondary"
              loading={updatingProject}
            >
              Update changes
            </Button>
          </div>
        )}
      </TabWrapper>
    </Form>
  );
};

const Overview = ({ id, form }: Props) => {
  return (
    <NoSSRWrapper>
      <OverviewComp id={id} form={form} />
    </NoSSRWrapper>
  );
};

export default Overview;
