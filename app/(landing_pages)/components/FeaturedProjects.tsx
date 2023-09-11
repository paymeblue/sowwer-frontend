import { SoowerIcon } from "@components/assets/icons";
import Container from "@shared/Container";
import { Card, Col, Row, Space, Tag, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import logo from "public/assets/icons/logo.svg";
import { useId } from "react";
import { ArrowRight, Heart2 } from "react-iconly";

type CardType =
  | {
      image: string;
      category: string;
      tagColor: string;
      title: string;
      subTitle: string;
      desc: string;
      raised: string;
      livesImpacted: string;
      id: string;
    }
  | undefined;

const FeaturedProjects = () => {
  const { Title, Text, Paragraph } = Typography;
  const cardData: Array<CardType> = [
    {
      image: "/assets/images/happy_wom.png",
      category: "widows",
      tagColor: "purple",
      title: "Name of project",
      subTitle: "BY FAMILY WORSHIP CENTER",
      desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
      raised: "2 million",
      livesImpacted: "52,000",
      id: useId(),
    },
    {
      image: "/assets/images/children_running.png",
      category: "orphans",
      tagColor: "orange",
      title: "Name of project",
      subTitle: "BY FAMILY WORSHIP CENTER",
      desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
      raised: "2 million",
      livesImpacted: "52,000",
      id: useId(),
    },
    ,
    {
      image: "/assets/images/wom_busy.png",
      category: "missions",
      tagColor: "blue",
      title: "Name of project",
      subTitle: "BY FAMILY WORSHIP CENTER",
      desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
      raised: "2 million",
      livesImpacted: "52,000",
      id: useId(),
    },
  ];
  return (
    <Container className=" bg-white">
      <Card className="my-6 border-none py-10 [&>div.ant-card-body]:px-0">
        <Typography className="mx-auto max-w-3xl text-center">
          <Title
            level={4}
            className="font-title text-[30px] leading-[34.32px] laptop:text-[50px] laptop:leading-[57.2px]"
          >
            Some of our featured projects
          </Title>
          <Paragraph className="font-body text-sm leading-[26px] text-body-1 laptop:text-[15px] laptop:leading-[28px]">
            Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitudin
            dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
            dolor sit amet consectetur.
          </Paragraph>
          <Link
            href="/projects"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold leading-[17.64px] text-accent laptop:text-base laptop:leading-[18px]"
          >
            Explore ongoing projects
            <ArrowRight set="light" size={18} />
          </Link>
        </Typography>
        <Row
          gutter={[16, 24]}
          className="my-12  grid  grid-cols-1 justify-items-center laptop:grid-cols-3"
        >
          {cardData.map((data) => (
            <Col className="gutter-row" key={data?.id}>
              <Card
                className=" max-w-[400px] text-left shadow-[0px_1px_10px_0px_rgba(0,_0,_0,_0.07)] laptop:w-full"
                bordered={false}
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
                  className="rounded-full p-[10px] font-body text-[7.43px] uppercase leading-[9.37px] laptop:text-[9px] laptop:leading-[11.34px]"
                >
                  {data?.category}
                </Tag>
                <Title
                  level={5}
                  className="mb-0 mt-3 font-title text-[24.78px] leading-[28.35px] text-black laptop:text-[30px] laptop:leading-[34.32px]"
                >
                  {data?.title}
                </Title>
                <Text className="font-body text-[10.74px] leading-[19px] text-body-2 laptop:text-[13px] laptop:leading-[23px] ">
                  {data?.desc}
                </Text>
                <Space className="mt-8 w-full justify-between">
                  <Space size="small" className="items-start justify-center">
                    <Heart2 set="light" primaryColor="#FFC629" />
                    <Paragraph className="font-body  text-xs text-body-2">
                      <strong className="font-sub-title text-[12.39px] font-bold leading-[15.36px] text-black laptop:text-[15px]">
                        ₦{data?.raised}
                      </strong>
                      <br />
                      <small className="font-body text-[9.91px] leading-[12.49px] text-body-2 laptop:text-xs laptop:leading-[15.12px]">
                        money raised
                      </small>
                    </Paragraph>
                  </Space>
                  <Space size="small" className="items-start">
                    <SoowerIcon />
                    <Paragraph className="font-body  text-xs text-body-2">
                      <strong className="font-sub-title text-[12.39px] font-bold leading-[15.36px] text-black laptop:text-[15px]">
                        {data?.livesImpacted}
                      </strong>
                      <br />
                      <small className="font-body text-[9.91px] leading-[12.49px] text-body-2 laptop:text-xs laptop:leading-[15.12px]">
                        {data?.category} impacted
                      </small>
                    </Paragraph>
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        <Space className="my-6 w-full flex-col items-center justify-center [&>.ant-space-item]:w-full">
          <Paragraph className="mb-0 text-center text-accent laptop:text-[14px] laptop:leading-[17.61px]">
            SOME OF OUR TRUSTEES & PARTNERS
          </Paragraph>
          <Space className="flex w-full items-center justify-around">
            <Image src={logo} alt="soower patners" />
            <Image src={logo} alt="soower patners" />
            <Image src={logo} alt="soower patners" />
            <Image src={logo} alt="soower patners" />
            <Image src={logo} alt="soower patners" />
          </Space>
        </Space>
      </Card>
    </Container>
  );
};

export default FeaturedProjects;
