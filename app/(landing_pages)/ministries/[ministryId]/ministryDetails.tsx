"use client";
import { HeartOrganIcon } from "@components/assets/icons";
import capitalizeFirstLetters from "@lib/capitalize";
import Container from "@shared/Container";
import TabList from "@shared/TabList";
import { useGetMinistryDetailsQuery } from "@store/services/ministries";
import { Space, Typography } from "antd";
import MinistryProjects from "./components/ministry-projects";
import Profile from "./components/profile";

const MinistryDetailsPage = ({ ministryId }: { ministryId: string }) => {
  const { Title } = Typography;
  const { data: ministryDetails } = useGetMinistryDetailsQuery(ministryId);
  const data = ministryDetails?.data;
  const items = [
    {
      label: "Ministry Profile",
      key: "1",
      children: <Profile ministryId={ministryId} />,
    },
    {
      label: "Projects",
      key: "2",
      children: <MinistryProjects id={ministryId} createdBy={data?.name} />,
    },
  ];
  return (
    <Container className="mt-15">
      <Space align="center" className="my-4">
        <HeartOrganIcon />
        <Title
          level={2}
          className="mb-0 font-title text-[30px] leading-[34px] laptop:text-[35px] laptop:leading-[40px]"
        >
          {capitalizeFirstLetters(data?.name)}
        </Title>
      </Space>
      <TabList items={items} className="items-center tablet:items-start" />
    </Container>
  );
};

export default MinistryDetailsPage;
