import React from "react";
import { Typography, Card, Tag, Progress, Space, Button, Row, Col } from "antd";
import Image from "next/image";
import { CardType } from "@lib/data";
import { Heart2 } from "react-iconly";
import { useRouter } from "next/navigation";

const ExploreCards = ({ cardData }: { cardData: CardType[] }) => {
  const { Title, Text, Paragraph } = Typography;
  const router = useRouter();

  const onClick = (id?: string) => {
    router.prefetch(`/projects/${id}`);
    router.push(`/projects/${id}`);
  };
  return (
    <Row
      gutter={[16, 24]}
      className="my-12  grid  grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3"
    >
      {cardData.map((data) => (
        <Col className="gutter-row" key={data?.id}>
          <Card
            bordered={false}
            className="w-full text-left shadow-sm"
            cover={
              <Image
                alt="example"
                src={data!.image}
                width={385}
                height={209}
                className="h-auto"
                priority
              />
            }
          >
            <Tag
              bordered={false}
              color={data?.tagColor}
              className="rounded-full text-[7.43px] uppercase leading-[9.37px] laptop:p-[10px] laptop:text-[9px] laptop:leading-[11.34px]"
            >
              {data?.category}
            </Tag>
            <Title
              level={5}
              className="mb-0 mt-3 font-title text-[24px] leading-[27px] laptop:leading-[27.46px]"
            >
              {data?.title}
            </Title>
            <Paragraph className="text-[12px] leading-[15px] text-body-2 laptop:leading-[15.12px]">
              {data?.subTitle}
            </Paragraph>
            <Text className="text-[13px] leading-[23px] text-body-2">
              {data?.desc}
            </Text>
            <div className="my-4">
              <Space className="w-full justify-between">
                <Typography>
                  <Text className="font-body text-body-2">
                    <strong className="font-sub-title text-[12.39px] font-bold leading-[15.36px] text-black laptop:text-[15px] laptop:leading-[19px]">
                      ₦{data?.currentDonation}
                    </strong>
                    &nbsp;
                    <small className="text-[9.91px] leading-[12.49px] laptop:text-[12px] laptop:leading-[15px]">
                      raised
                    </small>
                  </Text>
                </Typography>
                <Text className="font-sub-title text-[12.39px]  leading-[15.36px] text-body-1 laptop:text-[15px] laptop:leading-[19px]">
                  ₦{data?.target}
                </Text>
              </Space>
              <Progress
                percent={50}
                showInfo={false}
                strokeColor="#3466ff"
                status="active"
              />
            </div>
            <Button
              type="primary"
              icon={<Heart2 set="bold" size={19} />}
              size="large"
              onClick={() => onClick(data?.id)}
              className="mx-auto mt-6 flex items-center justify-center text-[14px] font-medium leading-[17.64] text-black laptop:p-6 laptop:leading-[18px] "
              block
            >
              Make a donation
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ExploreCards;
