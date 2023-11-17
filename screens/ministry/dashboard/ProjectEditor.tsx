"use client";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import { useGetProjectQuery } from "services/projects";
import { Button } from "@components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Copy, Eye } from "lucide-react";
import { ArrowLeft } from "react-iconly";
import { useRouter } from "next/navigation";
import Overview from "@components/sections/ministry/Overview";
import SharingDetails from "@components/sections/ministry/SharingDetails";
import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import Loader from "@components/shared/Loader";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useCopyToClipboard from "@hooks/general/useCopyToClipboard";
import { useToast } from "@components/ui/use-toast";

const RightContent = ({
  id,
  status,
}: {
  id?: string;
  status: "drafted" | "active" | string;
}) => {
  const { toast } = useToast();
  const { copyToClipboard } = useCopyToClipboard({
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Project link copied successfully",
        description: "You can now share this link with the public.",
      });
    },
    onFailure: () => {
      toast({
        variant: "destructive",
        title: "Error occured copying link",
        description:
          "There seems to be an error copying project link, please try again later",
      });
    },
  });
  const openLinkInNewTab = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="flex w-fit items-center rounded-full bg-[#EBEFFF] p-1 lg:max-w-[50%] lg:space-x-3">
      <span className="text_small_body_sb ml-4 truncate text-[.8rem] text-accent max-lg:hidden">
        {id && status === "active"
          ? `${window.location.origin}/projects/${id}`
          : "Publish to get shareable link"}
      </span>
      <div className="flex items-center">
        <Button
          size="sm"
          disabled={!id || status !== "active"}
          onClick={() =>
            copyToClipboard(`${window.location.origin}/projects/${id}`)
          }
          className="space-x-2 rounded-br-none rounded-tr-none border-r-[.3px] border-[#C4C4C4] bg-white px-3 text-accent hover:bg-white/80"
        >
          <span className="whitespace-nowrap font-body text-[.75rem] font-[600]">
            Copy Link
          </span>{" "}
          <Copy size={16} />{" "}
        </Button>
        <Button
          size="sm"
          disabled={!id || status !== "active"}
          onClick={() => openLinkInNewTab(`/projects/${id}`)}
          className="space-x-2 rounded-bl-none rounded-tl-none bg-white px-3 text-accent hover:bg-white/80"
        >
          <span className="font-body text-[.75rem] font-[600]">Preview</span>{" "}
          <Eye fill="#3466FF" size={23} className="text-white" />{" "}
        </Button>
      </div>
    </div>
  );
};

interface Props {
  id?: string;
}

const ProjectEditorComp = ({ id }: Props) => {
  const router = useRouter();
  const { data: project, isLoading } = useGetProjectQuery(id);

  if (isLoading) {
    return <Loader className="h-[80vh]" />;
  }

  if (!project?.data?.id && !isLoading && id) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <EmptyState
          image={<EmptySpeaker />}
          title="Project does not exist"
          desc="We were unable to find a project with that id"
        />
      </div>
    );
  }

  return (
    <MainContentWrapper
      responsive={true}
      title={project?.data ? project?.data?.title : "New Project Name"}
      top={
        <Button
          variant="link"
          onClick={() => router.push("/ministry/projects")}
          className="w-fit space-x-2 px-0 text-[.8rem] font-[400] text-accent"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </Button>
      }
      right={
        <RightContent
          id={project?.data?.id}
          status={project?.data?.status || ""}
        />
      }
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mt-4 flex items-center space-x-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sharing-details">Sharing Details</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview id={project?.data?.id || null} />
        </TabsContent>
        <TabsContent value="sharing-details">
          {!id || project?.data.status !== "active" ? (
            <EmptyState
              image={<EmptySpeaker />}
              title="Publish a project"
              desc="Once you publish you project, you'll see your sharing details and can download the QR code."
            />
          ) : (
            <SharingDetails projectId={id} />
          )}
        </TabsContent>
      </Tabs>
    </MainContentWrapper>
  );
};

const ProjectEditor = ({ id }: Props) => {
  return (
    <NoSSRWrapper>
      <ProjectEditorComp id={id} />
    </NoSSRWrapper>
  );
};

export default ProjectEditor;
