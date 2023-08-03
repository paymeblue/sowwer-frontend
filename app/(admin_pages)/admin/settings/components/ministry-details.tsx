import { Tabs } from "antd";
import { Fragment, useState } from "react";
import ContactSocials from "./contact-social";
import ProfileInfo from "./profile-info";
const items = [
  { label: "Profile Information", key: "1", children: <ProfileInfo /> },
  { label: "Contacts and Social", key: "2", children: <ContactSocials /> },
];
const MinistryDetails = () => {
  const [activeKey, setActiveKey] = useState("1");

  const onChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <Fragment>
      <Tabs
        className="my-8 flex-col gap-4 laptop:flex-row [&>div.ant-tabs-nav]:h-max [&>div>div>.ant-tabs-tabpane]:pl-0 [&>div>div>div.ant-tabs-nav-list]:gap-1 [&>div>div>div.ant-tabs-nav-list]:rounded-md [&>div>div>div.ant-tabs-nav-list]:bg-white [&>div>div>div.ant-tabs-nav-list]:p-1 [&>div>div>div>div.ant-tabs-tab]:rounded-full [&>div>div>div>div>.ant-tabs-tab-btn]:text-[11.83px] [&>div>div>div>div>.ant-tabs-tab-btn]:leading-[14.9px] [&>div>div>div>div>.ant-tabs-tab-btn]:laptop:text-[15px] [&>div>div>div>div>.ant-tabs-tab-btn]:laptop:leading-[18.9px]"
        type="card"
        tabPosition="left"
        items={items}
        onChange={onChange}
        activeKey={activeKey}
      />
    </Fragment>
  );
};

export default MinistryDetails;
