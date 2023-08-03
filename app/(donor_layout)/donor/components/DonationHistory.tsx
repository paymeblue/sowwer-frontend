import { Tabs } from "antd";
import { useState } from "react";
import GeneralDonationTable from "./GeneralDonationTable";
import ProjectDonationTable from "./ProjectDonationTable";
const items = [
  { label: "Project Donation", key: "1", children: <ProjectDonationTable /> },
  { label: "General Donation", key: "2", children: <GeneralDonationTable /> },
];
const DonationHistory = () => {
  const [activeKey, setActiveKey] = useState("1");

  const onChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <Tabs
      className="my-8 flex-col gap-4 tablet:flex-row [&>div.ant-tabs-nav]:h-max [&>div>div>.ant-tabs-tabpane]:pl-0 [&>div>div>div.ant-tabs-nav-list]:gap-1 [&>div>div>div.ant-tabs-nav-list]:rounded-md [&>div>div>div.ant-tabs-nav-list]:bg-white [&>div>div>div.ant-tabs-nav-list]:p-1 [&>div>div>div>div.ant-tabs-tab]:rounded-full [&>div>div>div>div>.ant-tabs-tab-btn]:text-[11.83px] [&>div>div>div>div>.ant-tabs-tab-btn]:leading-[14.9px] [&>div>div>div>div>.ant-tabs-tab-btn]:laptop:text-[15px] [&>div>div>div>div>.ant-tabs-tab-btn]:laptop:leading-[18.9px]"
      type="card"
      tabPosition="left"
      items={items}
      onChange={onChange}
      activeKey={activeKey}
    />
  );
};

export default DonationHistory;
