"use client";
import Container from "@shared/Container";
import TabList from "@shared/TabList";
import { TabsProps, Typography } from "antd";
import GeneralDonorsTable from "./components/general-donor-table";
import ProjectsDonorTable from "./components/projects-donor-table";

const { Title } = Typography;
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
  return (
    <Container className="bg-[#F7F8FA] tablet:px-4">
      <Title className="leading-30.24px] text-[24px] font-bold">Donors</Title>
      <TabList items={items} />
    </Container>
  );
};

export default DonorsPage;
