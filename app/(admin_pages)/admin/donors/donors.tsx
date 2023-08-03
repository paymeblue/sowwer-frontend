"use client";
import { EmptyDonorIcon } from "@components/assets/icons";
import Container from "@shared/Container";
import ResultComponent from "@shared/ResultComponent";
import TabList from "@shared/TabList";
import { TabsProps, Typography } from "antd";
import { useState } from "react";
import GeneralDonorsTable from "./components/general-donor-table";
import ProjectsDonorTable from "./components/projects-donor-table";

const { Title, Text } = Typography;
const items: TabsProps["items"] = [
  {
    key: "general",
    label: "General Donors",
    children: <GeneralDonorsTable />,
  },
  {
    key: "project",
    label: "Project Donors",
    children: <ProjectsDonorTable />,
  },
];
const DonorsPage = () => {
  const [donorPage, setDonorPage] = useState<boolean>(false);
  return (
    <Container className="bg-[#F7F8FA] tablet:px-4">
      <Title
        onClick={() => setDonorPage(true)}
        className="leading-30.24px] text-[24px] font-bold"
      >
        Donors
      </Title>
      {donorPage ? (
        <>
          <TabList items={items} />
        </>
      ) : (
        <ResultComponent
          title={
            <Title className="text-[18px] font-bold leading-[22.68px]">
              No donors yet
            </Title>
          }
          subTitle={
            <Text className="text-[13px] leading-[19px] text-gray-500">
              Once you start receiving donations your list of donors will appear
              here.
            </Text>
          }
          icon={<EmptyDonorIcon />}
        />
      )}
    </Container>
  );
};

export default DonorsPage;
