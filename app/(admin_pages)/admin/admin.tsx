"use client";
import { BankIcon, SpeakerIcon, UserIcon } from "components/assets/icons";
import { useAuth } from "hooks/useAuth";
import capitalizeFirstLetters from "lib/capitalize";
import Container from "@components/shared/Container";
import { Button, Card, List, Typography } from "antd";
import { useRouter } from "next/navigation";
import { ChevronRight } from "react-iconly";

const { Title, Paragraph, Text } = Typography;

const AdminPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  const header = (
    <Typography>
      <Title level={3} className="mb-0 text-[24px] font-bold leading-[30.24px]">
        {user
          ? `Welcome,${capitalizeFirstLetters(user.firstName)}!`
          : "Welcome!"}
      </Title>
      <Paragraph className="text-[14px] leading-[17.64px] text-body-2">
        Let&apos;s get you set up to start using Soower!
      </Paragraph>
    </Typography>
  );

  const data = [
    {
      icon: <UserIcon />,
      desc: (
        <Paragraph className="text-[14px] leading-[17.64px] text-body-1">
          Set up your ministry's profile
        </Paragraph>
      ),
      action: (
        <Button
          type="text"
          shape="circle"
          className="flex items-center justify-center"
          icon={<ChevronRight set="light" size="small" />}
        />
      ),
      page: "settings",
    },
    {
      icon: <BankIcon />,
      desc: (
        <Paragraph className="text-[14px] leading-[17.64px] text-body-1">
          Connect your payout method
        </Paragraph>
      ),
      action: (
        <Button
          type="text"
          shape="circle"
          className="flex items-center justify-center"
          icon={<ChevronRight set="light" size="small" />}
        />
      ),
      page: "payouts",
    },
    {
      icon: <SpeakerIcon />,
      desc: (
        <Paragraph className="text-[14px] leading-[17.64px] text-body-1">
          Create your first project
        </Paragraph>
      ),
      action: user?.verificationStatus ? (
        <Button
          type="text"
          shape="circle"
          className="flex items-center justify-center"
          icon={<ChevronRight set="light" size="small" />}
        />
      ) : (
        <Text
          type="danger"
          className="text-[12px] font-medium leading-[15.12px]"
        >
          Awaiting verification
        </Text>
      ),
      page: "projects",
    },
  ];
  return (
    <Container className="flex min-h-screen w-full items-center justify-center bg-[#F7F8FA]">
      <Card
        bordered={false}
        className="mx-auto my-16 w-[600px] max-w-3xl shadow-sm"
      >
        <List
          size="default"
          className="[&>div.ant-list-header]:border-b-accent"
          header={header}
          dataSource={data}
          renderItem={(item) => (
            <List.Item onClick={() => router.push(`/admin/${item.page}`)}>
              <List.Item.Meta
                className="items-center [&>div.ant-list-item-meta-avatar]:flex [&>div>div>div.ant-typography]:mb-0"
                avatar={item.icon}
                description={item.desc}
              />
              <div>{item.action}</div>
            </List.Item>
          )}
        />
      </Card>
    </Container>
  );
};

export default AdminPage;
