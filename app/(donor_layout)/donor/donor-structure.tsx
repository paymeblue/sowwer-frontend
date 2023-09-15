import Container from "@components/shared/Container";
import TabList from "@components/shared/TabList";
import {
  // Button, Space,
  Typography,
} from "antd";
// import { useRouter } from "next/navigation";
import { ReactNode, memo } from "react";
// import { ArrowLeft } from "react-iconly";

type Props = {
  title: string;
  items: Array<{ label: string; key: string; children: ReactNode }>;
};

const DonorStructure = ({ title, items }: Props) => {
  const { Title } = Typography;
  // const router = useRouter();

  return (
    <Container className="pt-20">
      {/* {title === "Account Settings" && (
        <Space className="my-8">
          <Button
            className="flex items-center justify-center border-none bg-[#EBEFFF] text-accent outline-none"
            size="large"
            icon={<ArrowLeft set="light" />}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Space>
      )} */}
      <Title
        level={2}
        className="my-4 mb-0 text-center font-title text-[30px] leading-[34.32px] tablet:text-start"
      >
        {title}
      </Title>
      <TabList
        items={items}
        className="[&>div>.ant-tabs-nav-wrap]:justify-center tablet:[&>div>.ant-tabs-nav-wrap]:justify-start"
      />
    </Container>
  );
};

export default memo(DonorStructure);
