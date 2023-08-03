"use client";
import { HeartOrganIcon } from "@components/assets/icons";
import { cardData } from "@lib/data";
import Container from "@shared/Container";
import ExploreCards from "@shared/ExploreCards";
import TabList from "@shared/TabList";
import { Space, Typography } from "antd";
import Profile from "./components/profile";

const MinistryDetailsPage = ({ ministryId }: { ministryId: string }) => {
  const { Title } = Typography;

  const items = [
    {
      label: "Ministry Profile",
      key: "1",
      children: <Profile ministryId={ministryId} />,
    },
    {
      label: "Projects",
      key: "2",
      children: <ExploreCards cardData={cardData.slice(0, 3)} />,
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
          Family Worship Center
        </Title>
      </Space>
      <TabList items={items} className="items-center tablet:items-start" />
    </Container>
  );
};

export default MinistryDetailsPage;
