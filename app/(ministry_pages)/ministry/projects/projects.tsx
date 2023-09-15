"use client";
import { PlusOutlined } from "@ant-design/icons";
import Container from "@shared/Container";
import { Button, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import ProjectsTable from "./components/projects-table";

const { Title } = Typography;

const ProjectsPage = () => {
  const router = useRouter();

  const newProjectHandler = () => {
    router.push("/ministry/projects/new-project");
  };

  return (
    <Container className="bg-[#F7F8FA] tablet:px-3">
      <Space
        className="mb-6 w-full flex-col justify-between mobile-md:flex-row"
        align="center"
      >
        <Title level={3} className="leading-30.24px] text-[24px] font-bold">
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
      <ProjectsTable />
    </Container>
  );
};

export default ProjectsPage;
