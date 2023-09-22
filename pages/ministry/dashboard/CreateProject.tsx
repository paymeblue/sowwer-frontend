"use client";

import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import { Button } from "@components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Copy, Eye } from "lucide-react";
import { ArrowLeft } from "react-iconly";
import { useRouter } from "next/navigation";

const RightContent = () => {
  return (
    <div className="flex w-fit items-center space-x-3 rounded-full bg-[#EBEFFF] p-1">
      <span className="text_small_body_sb ml-4 text-[.8rem] text-accent">
        https://soower.com/title-of-project
      </span>
      <div className="flex items-center">
        <Button
          size="sm"
          className="space-x-2 rounded-br-none rounded-tr-none border-r-[.3px] border-[#C4C4C4] bg-white px-3 text-accent hover:bg-white/80"
        >
          <span className="font-body text-[.75rem] font-[600]">Copy Link</span>{" "}
          <Copy size={16} />{" "}
        </Button>
        <Button
          size="sm"
          className="space-x-2 rounded-bl-none rounded-tl-none bg-white px-3 text-accent hover:bg-white/80"
        >
          <span className="font-body text-[.75rem] font-[600]">Preview</span>{" "}
          <Eye fill="#3466FF" size={23} className="text-white" />{" "}
        </Button>
      </div>
    </div>
  );
};

const CreateProject = () => {
  const router = useRouter();
  return (
    <MainContentWrapper
      title="New Project Name"
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
      right={<RightContent />}
    >
      <Tabs defaultValue="overview">
        <TabsList className="mt-4 flex items-center space-x-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sharing-details">Sharing Details</TabsTrigger>
        </TabsList>
      </Tabs>
    </MainContentWrapper>
  );
};

export default CreateProject;
