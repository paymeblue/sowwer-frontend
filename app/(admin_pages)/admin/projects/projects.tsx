"use client";
import { PlusOutlined } from "@ant-design/icons";
import { EmptySpeakerIcon } from "@components/assets/icons";
import { useAuth } from "@hooks/useAuth";
import Container from "@shared/Container";
import ResultComponent from "@shared/ResultComponent";
import { useGetMinistryProjectsQuery } from "@store/services/ministries";
import { Button, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import ProjectsTable from "./components/projects-table";

const { Title } = Typography;

const ProjectsPage = () => {
  const router = useRouter();
  const user = useAuth();
  const id = user?.ministry.id;

  const {
    data: result,
    isError,
    error,
    isSuccess,
  } = useGetMinistryProjectsQuery({
    id,
    page: 1,
  });

  const newProjectHandler = () => {
    router.push("/admin/projects/new-project");
  };
  console.log(result, result?.data, "hi");
  const content =
    isSuccess && Array.isArray(result.data) ? (
      <ProjectsTable id={id} />
    ) : isError ? (
      <ResultComponent
        icon={<EmptySpeakerIcon />}
        title={
          <Title level={4} className="text-18px leading-22.68px font-bold">
            Oppsss... Something went wrong :&#40;
          </Title>
        }
        subTitle={`${error}`}
      />
    ) : isSuccess && result.data.length === 0 ? (
      <ResultComponent
        icon={<EmptySpeakerIcon />}
        title={
          <Title level={4} className="text-18px leading-22.68px font-bold">
            No Projects yet
          </Title>
        }
        subTitle="Create a new project and manage all your projects from here."
      />
    ) : null;

  return (
    <Container className="bg-[#F7F8FA] tablet:px-3">
      <Space className="mb-6 w-full justify-between" align="center">
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
      {content}
    </Container>
  );
};

export default ProjectsPage;
