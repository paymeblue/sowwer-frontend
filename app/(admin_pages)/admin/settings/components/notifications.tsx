import React, { Fragment, ReactNode, useId } from "react";
import ToggleSwitch from "./toggle-switch";
import { Card, Space, Typography } from "antd";

const { Title, Text } = Typography;

type Data = {
  id: string;
  title: string;
  subTitle: string;
  switch: ReactNode;
};

const Notifications = () => {
  const data: Data[] = [
    {
      id: useId(),
      title: "New Project Donation",
      subTitle: "Sent when a new donation is made to a project.",
      switch: <ToggleSwitch toggle={true} />,
    },
    {
      id: useId(),
      title: "Project Goal Achieved",
      subTitle: "Sent when a project's funding goal is achieved.",
      switch: <ToggleSwitch toggle={true} />,
    },
    {
      id: useId(),
      title: "General Donation",
      subTitle:
        "Sent when new general donations are made (one-time or recurring).",
      switch: <ToggleSwitch toggle={true} />,
    },
    {
      id: useId(),
      title: "Ongoing Recurring Donation",
      subTitle:
        "Sent when a recurring donation is automatically processed after the initial charge.",
      switch: <ToggleSwitch toggle={false} />,
    },
    {
      id: useId(),
      title: "Recurring Donation Events",
      subTitle:
        "Sent when a recurring donation is canceled, paused, resumed, updated, or fails to process.",
      switch: <ToggleSwitch toggle={false} />,
    },
    {
      id: useId(),
      title: "New Payout Transaction",
      subTitle:
        "Sent when a payout request is approved and payment is processed.",
      switch: <ToggleSwitch toggle={true} />,
    },
  ];
  return (
    <Fragment>
      <Card bordered={false}>
        {data.map((item) => (
          <Space
            key={item.id}
            className="mb-4 flex w-full items-center justify-between"
          >
            <Typography>
              <Title
                level={5}
                className="m-0 text-[15px] font-bold leading-[18.9px]"
              >
                {item.title}
              </Title>
              <Text className="text-[14px] leading-[17.64px] text-body-2">
                {item.subTitle}
              </Text>
            </Typography>
            {item.switch}
          </Space>
        ))}
      </Card>
    </Fragment>
  );
};

export default Notifications;
