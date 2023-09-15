"use client";
import Container from "@components/shared/Container";
import TabList from "@components/shared/TabList";
import { TabsProps, Typography } from "antd";
import MinistryDetails from "./components/ministry-details";
import Notifications from "./components/notifications";
import PersonalDetails from "./components/personal-details";

const { Title } = Typography;
const items: TabsProps["items"] = [
  {
    key: "ministry-details",
    label: "Ministry Details",
    children: <MinistryDetails />,
  },
  {
    key: "personal-details",
    label: "Personal Details",
    children: <PersonalDetails />,
  },
  {
    key: "notifictions",
    label: "Notifications",
    children: <Notifications />,
  },
];
const SettingsPage = () => {
  return (
    <Container className="bg-[#F7F8FA] tablet:px-4">
      <Title level={2} className="leading-30.24px] text-[24px] font-bold">
        Settings
      </Title>
      <TabList items={items} />
    </Container>
  );
};

export default SettingsPage;
