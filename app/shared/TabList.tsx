import { Tabs, TabsProps } from "antd";
import { memo, useState } from "react";

type Props = {
  items: TabsProps["items"];
  centered?: boolean;
  className?: string;
};

const TabList = ({ items, centered, className }: Props) => {
  const [activeKey, setActiveKey] = useState(items![0].key ?? "");
  const onChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <Tabs
      className={`my-8 [&>div>div>div.ant-tabs-nav-list]:gap-1 [&>div>div>div.ant-tabs-nav-list]:rounded-full [&>div>div>div.ant-tabs-nav-list]:bg-white [&>div>div>div.ant-tabs-nav-list]:p-1 [&>div>div>div>div.ant-tabs-tab]:rounded-full [&>div>div>div>div>.ant-tabs-tab-btn]:text-[11.83px] [&>div>div>div>div>.ant-tabs-tab-btn]:leading-[14.9px] [&>div>div>div>div>.ant-tabs-tab-btn]:laptop:text-[15px] [&>div>div>div>div>.ant-tabs-tab-btn]:laptop:leading-[18.9px] ${className}`}
      type="card"
      centered={centered}
      items={items}
      onChange={onChange}
      activeKey={activeKey}
    />
  );
};

export default memo(TabList);
