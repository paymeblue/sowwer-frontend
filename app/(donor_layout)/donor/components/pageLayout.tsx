import Container from "@components/shared/Container";
import TabList from "@components/shared/TabList";
import { Typography } from "antd";
import { ReactNode, memo } from "react";

type Props = {
  title: string;
  items: Array<{ label: string; key: string; children: ReactNode }>;
};

const DonorStructure = ({ title, items }: Props) => {
  const { Title } = Typography;

  return (
    <Container>
      <Title
        level={2}
        className="my-4 mb-0 text-center font-title text-[30px] leading-[34.32px] tablet:text-start"
      >
        {title}
      </Title>
      <TabList items={items} />
    </Container>
  );
};

export default memo(DonorStructure);
