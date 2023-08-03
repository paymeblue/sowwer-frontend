import React from "react";
import { Button, Card, Space, Typography } from "antd";
import { Heart2 } from "react-iconly";
import Link from "next/link";

const { Title, Paragraph } = Typography;

type Props = {
  title1: string;
  title2?: string;
  sub?: string;
  para?: string;
  link?: string;
  showIcon?: boolean;
  btnText: string;
};

const HomeCard = ({
  title1,
  title2,
  sub,
  para,
  showIcon,
  link,
  btnText,
}: Props) => {
  return (
    <Card
      className="m-24 mx-auto bg-[#FDFBF2] p-4 text-center tablet:py-10 laptop:px-[86px] laptop:py-14 [&>div.ant-card-body]:p-0"
      bordered={false}
    >
      <Space direction="vertical">
        <Typography>
          <Title
            level={3}
            className="font-title text-[28px] leading-[32.03px] laptop:text-[50px] laptop:leading-[57px]"
          >
            {title1}
            <br />
            {title2}
          </Title>
          <Paragraph className="text-sm leading-[26px] text-body-1 laptop:text-base laptop:leading-[20.16px]">
            {sub}
          </Paragraph>
          <Paragraph className="m-auto mb-6 max-w-3xl text-[14px] leading-[26px] text-body-1 laptop:text-[15px] laptop:leading-[28px]">
            {para}
          </Paragraph>
        </Typography>
        <Button
          type="primary"
          icon={showIcon && <Heart2 set="bold" size={18} />}
          size="large"
          className="mx-auto mt-2 flex items-center justify-center  px-[27px] py-[15px] text-sm font-medium text-black laptop:px-[50px] laptop:py-[21px]"
        >
          <Link
            href={`/${link}`}
            className="text-sm font-medium leading-[17.6px] text-black"
          >
            {btnText}
          </Link>
        </Button>
      </Space>
    </Card>
  );
};

export default HomeCard;
