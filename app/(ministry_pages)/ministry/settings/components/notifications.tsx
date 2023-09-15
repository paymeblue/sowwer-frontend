import { LoadingOutlined } from "@ant-design/icons";
import ResultComponent from "@shared/ResultComponent";
import { useGetNotificationQuery } from "@store/services/notifications";
import { Card, Space, Spin, Typography } from "antd";
import { Fragment, ReactNode } from "react";
import ToggleSwitch from "./toggle-switch";

const { Title, Text } = Typography;

type Data = {
  id: string;
  title: string;
  subTitle: string;
  switch: ReactNode;
};

const Notifications = () => {
  function handleRefetch() {
    refetch();
  }
  const {
    data: toggle,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetNotificationQuery();
  if (!toggle) {
    return null;
  }

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 64,
        display: "flex",
        alignItems: "center",
        minHeight: "10rem",
        color: "#FFC629",
      }}
      spin
    />
  );
  const {
    projectDonation,
    projectTarget,
    ongoingRecuringDonation,
    recuringDonation,
    payout,
    generalDonation,
  } = toggle.data;
  const data: Data[] = [
    {
      id: "1",
      title: "New Project Donation",
      subTitle: "Sent when a new donation is made to a project.",
      switch: <ToggleSwitch toggle={projectDonation} label="projectDonation" />,
    },
    {
      id: "2",
      title: "Project Goal Achieved",
      subTitle: "Sent when a project's funding goal is achieved.",
      switch: <ToggleSwitch toggle={projectTarget} label="projectTarget" />,
    },
    {
      id: "3",
      title: "General Donation",
      subTitle:
        "Sent when new general donations are made (one-time or recurring).",
      switch: <ToggleSwitch toggle={generalDonation} label="generalDonation" />,
    },
    {
      id: "4",
      title: "Ongoing Recurring Donation",
      subTitle:
        "Sent when a recurring donation is automatically processed after the initial charge.",
      switch: (
        <ToggleSwitch
          toggle={ongoingRecuringDonation}
          label="ongoingRecuringDonation"
        />
      ),
    },
    {
      id: "5",
      title: "Recurring Donation Events",
      subTitle:
        "Sent when a recurring donation is canceled, paused, resumed, updated, or fails to process.",
      switch: (
        <ToggleSwitch toggle={recuringDonation} label="recuringDonation" />
      ),
    },
    {
      id: "6",
      title: "New Payout Transaction",
      subTitle:
        "Sent when a payout request is approved and payment is processed.",
      switch: <ToggleSwitch toggle={payout} label="payout" />,
    },
  ];

  const content = isLoading ? (
    <Spin size="large" indicator={antIcon} />
  ) : isError ? (
    <ResultComponent
      title="Oops... Something went wrong :("
      subTitle={`${error}`}
      btnBg="primary"
      btnText="Retry"
      btnTextColor="black"
      status="error"
      showBtn={true}
      onBtnClick={handleRefetch}
    />
  ) : (
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
  );
  return <Fragment>{content}</Fragment>;
};

export default Notifications;
