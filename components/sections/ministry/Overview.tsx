"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinistryCreateProjectValidation } from "lib/validations/ministry";
import { useCreateProjectMutation } from "services/projects";

import MinistryProjectCreateForm, {
  ProjectDescription,
  UploadCoverPhoto,
} from "@components/forms/ministry/MinistryProjectCreateForm";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";
import QuestionRounded from "@components/assets/svg/QuestionRounded";
import { Button } from "@components/ui/button";
import { ArrowRight } from "react-iconly";
import { Form } from "@components/ui/form";
import { useToast } from "@components/ui/use-toast";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

const OverviewComp = () => {
  const form = useForm<z.infer<typeof MinistryCreateProjectValidation>>({
    resolver: zodResolver(MinistryCreateProjectValidation),
  });
  const { toast } = useToast();
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const onSubmit = async (
    values: z.infer<typeof MinistryCreateProjectValidation>
  ) => {
    const {
      amount,
      category,
      cover_photo: coverPhoto,
      description,
      title,
    } = values;
    console.log({ amount });
    try {
      await createProject({
        amount: Number(amount.replace(/[₦,]/g, "")),
        category,
        title,
        cover_photo: coverPhoto,
        description,
      }).unwrap();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Unable to create project",
        description:
          error?.message ||
          "A problem occured when creating the project, please try again later.",
      });
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

        <div className="flex self-end">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            loading={isLoading}
            className="ml-auto space-x-2"
            variant="secondary"
          >
            <span>Continue</span>
            <ArrowRight />
          </Button>
        </div>
      </TabWrapper>
    </Form>
  );
};

const Overview = () => {
  return (
    <NoSSRWrapper>
      <OverviewComp />
    </NoSSRWrapper>
  );
};

export default Overview;
