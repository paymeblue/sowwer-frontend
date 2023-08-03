"use client";
import { PlusOutlined } from "@ant-design/icons";
import { EmptySpeakerIcon } from "@components/assets/icons";
import Container from "@shared/Container";
import ResultComponent from "@shared/ResultComponent";
import { Button, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProjectsTable from "./components/projects-table";
const { Title } = Typography;

const ProjectsPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<boolean>(false);
  const loadContent = () => {
    setContent(true);
  };
  const newProjectHandler = () => {
    router.push("/admin/projects/new-project");
  };
  return (
    <Container className="bg-[#F7F8FA] tablet:px-3">
      <Space className="mb-6 w-full justify-between" align="center">
        <Title
          level={3}
          className="leading-30.24px] text-[24px] font-bold"
          onClick={loadContent}
        >
          Projects
        </Title>
        <Button
          size="large"
          type="primary"
          onClick={newProjectHandler}
          className="flex items-center justify-center bg-accent text-[13px] font-semibold leading-[16.38px] text-white hover:bg-blue-500"
          icon={<PlusOutlined />}
        >
          New Project
        </Button>
      </Space>
      {content ? (
        <ProjectsTable />
      ) : (
        <ResultComponent
          icon={<EmptySpeakerIcon />}
          title={
            <Title
              level={4}
              className="text-[18px] font-bold leading-[22.68px]"
            >
              No Projects yet
            </Title>
          }
          subTitle="Create a new project and manage all your projects from here."
        />
      )}
    </Container>
  );
};

export default ProjectsPage;
