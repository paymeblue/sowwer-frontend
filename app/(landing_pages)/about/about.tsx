"use client";
import { Button, Card, Carousel, Col, Row, Space, Typography } from "antd";
import { FC, Fragment, useId } from "react";

import {
  HeartHandIcon,
  LeftCirlceArrowIcon,
  LensIcon,
  ReceiptIcon,
  RightCirlceArrowIcon,
  TargetIcon,
  VisionIcon,
} from "@components/assets/icons";
import Container from "@shared/Container";
import Image from "next/image";
import jar from "public/assets/images/coin_tree_jar.png";
import partner from "public/assets/images/partner.png";
import { Hero } from "../components";
import CarouselImages from "../components/Carousel";

const { Title, Paragraph } = Typography;

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <Button
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      <RightCirlceArrowIcon />
    </Button>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <Button
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <LeftCirlceArrowIcon />
    </Button>
  );
};

const AboutPage: FC = () => {
  const cardData = [
    {
      id: useId(),
      icon: <TargetIcon />,
      title: "Our Mission",
      desc: " Lorem ipsum dolor sit amet consectetur. Hendrerit diam tempus ac sit tellus. Pellentesque odio lorem ut metus viverra sem. Rhoncus vulputate sapien ut egestas porttitor egestas urna tempus libero. Est suspendisse in dictum tellus faucibus. A diamnulla cras non erat elementum. Tincidunt convallis eu ac aliquameu.",
    },
    {
      id: useId(),
      icon: <VisionIcon />,
      title: "Our Vision",
      desc: " Lorem ipsum dolor sit amet consectetur. Hendrerit diam tempus ac sit tellus. Pellentesque odio lorem ut metus viverra sem. Rhoncus vulputate sapien ut egestas porttitor egestas urna tempus libero. Est suspendisse in dictum tellus faucibus. A diamnulla cras non erat elementum. Tincidunt convallis eu ac aliquameu.",
    },
  ];
  const content = [
    {
      id: useId(),
      icon: <LensIcon />,
      title: "Explore projects and ministries",
      desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    },
    {
      id: useId(),
      icon: <HeartHandIcon />,
      title: "Make a donation",
      desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    },
    {
      id: useId(),
      icon: <ReceiptIcon />,
      title: "Get audit reports",
      desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    },
  ];
  const gridSection = [
    {
      id: useId(),
      image: partner,
      title: "John Doe",
      subTitle: "CEO, NAME OF COMPANY",
      desc: "Lorem ipsum dolor sit amet consectetur. Ante gravida pellentesque vulputate risus pellentesque dui natoque tellus. In tellus ultricies consectetur cursus in. Odio nisi imperdiet in faucibus sit morbi consequat quam id. Eget aliquam dignissim auctor placerat arcu. Tellus arcu consectetur quis risus.",
    },
    {
      id: useId(),
      image: partner,
      title: "John Doe",
      subTitle: "CEO, NAME OF COMPANY",
      desc: "Lorem ipsum dolor sit amet consectetur. Ante gravida pellentesque vulputate risus pellentesque dui natoque tellus. In tellus ultricies consectetur cursus in. Odio nisi imperdiet in faucibus sit morbi consequat quam id. Eget aliquam dignissim auctor placerat arcu. Tellus arcu consectetur quis risus.",
    },
    {
      id: useId(),
      image: partner,
      title: "John Doe",
      subTitle: "CEO, NAME OF COMPANY",
      desc: "Lorem ipsum dolor sit amet consectetur. Ante gravida pellentesque vulputate risus pellentesque dui natoque tellus. In tellus ultricies consectetur cursus in. Odio nisi imperdiet in faucibus sit morbi consequat quam id. Eget aliquam dignissim auctor placerat arcu. Tellus arcu consectetur quis risus.",
    },
    {
      id: useId(),
      image: partner,
      title: "John Doe",
      subTitle: "CEO, NAME OF COMPANY",
      desc: "Lorem ipsum dolor sit amet consectetur. Ante gravida pellentesque vulputate risus pellentesque dui natoque tellus. In tellus ultricies consectetur cursus in. Odio nisi imperdiet in faucibus sit morbi consequat quam id. Eget aliquam dignissim auctor placerat arcu. Tellus arcu consectetur quis risus.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Fragment>
      <Container>
        <Hero
          title1="The Kingdom Investment Platform."
          title2="Perfectly positioned to lend a helping hand."
          para1="Lorem ipsum dolor sit amet consectetur. Sed ut venenatis id lectus. Pretium quam sit eu senectus ullamcorper dui nullam. Fermentum massa semper facilisis elementum amet aenean. Facilisis scelerisque nulla non volutpat mi dolor. Facilisis massa nunc cursus porta porta arcu in. Nec consectetur nunc etiam nulla leo sit magna. Ultrices tristique est nunc."
          isType2={true}
        />
      </Container>
      <section className="m-auto max-w-[1440px]">
        <CarouselImages />
      </section>
      <Container>
        <Row
          gutter={[32, 32]}
          wrap
          className="my-12 grid grid-cols-1 items-center laptop:grid-cols-2"
        >
          {cardData.map((data) => (
            <Col key={data.id}>
              <Card className="rounded-md shadow-none" bordered={false}>
                <Space size={30} align="start" direction="vertical">
                  {data.icon}
                  <Typography>
                    <Title
                      level={5}
                      className="font-title text-[18px] font-normal leading-[20.59px] laptop:text-[24px] laptop:leading-[27.46px]"
                    >
                      {data.title}
                    </Title>
                    <Paragraph className="leading:text-[14px] text-[12px]  leading-[26px]">
                      {data.desc}
                    </Paragraph>
                  </Typography>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        <Row
          gutter={[16, 24]}
          align="middle"
          justify="space-between"
          className="my-12 grid grid-cols-1 items-center justify-items-end laptop:grid-cols-2"
        >
          <Col>
            <Title className="font-title text-[28.32px] leading-[32.4px] laptop:text-[50px] laptop:leading-[57.2px]">
              Make kingdom investments in just a few minutes.
            </Title>
            <Typography>
              {content.map((item) => (
                <Space
                  size="large"
                  align="start"
                  key={item.id}
                  className="my-4"
                >
                  {item!.icon}
                  <Typography>
                    <Title
                      level={4}
                      className="font-title text-[19.13px] font-normal leading-[21.88px] laptop:text-[24px] laptop:leading-[27.46px]"
                    >
                      {item.title}
                    </Title>
                    <Paragraph className=" text-[10.36px] leading-[18.33px] laptop:text-[13px] laptop:leading-[23px]">
                      {item.desc}
                    </Paragraph>
                  </Typography>
                </Space>
              ))}
            </Typography>
          </Col>
          <Col>
            <Image
              src={jar}
              alt="jar of tree growing in coins"
              priority
              className="mx-auto"
            />
          </Col>
        </Row>
      </Container>
      <Container className="my-0 bg-white py-7 laptop:py-16">
        <Typography className="mx-auto max-w-3xl text-center">
          <Title
            level={4}
            className="m-0 font-title text-[30px] leading-[34.32px] laptop:text-[40px] laptop:leading-[45.76px]"
          >
            Some of our partners
          </Title>
          <Paragraph className="m-0 mt-2 font-body text-sm leading-[26px] text-body-1 laptop:text-[13px] laptop:leading-[23px]">
            Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitid dignissim
            ipsum arcu imperdiet pellentesque.
          </Paragraph>
        </Typography>
        <Carousel
          {...settings}
          className="mx-auto my-6 w-full laptop:my-12 [&>div>div>div>slick-track]:mx-auto [&>div>div>div>slick-track]:flex [&>div>div>div>slick-track]:flex-col [&>div>div>div>slick-track]:items-center [&>div>div>div>slick-track]:justify-between [&>div>div>div>slick-track]:gap-4 laptop:[&>div>div>div>slick-track]:flex-row"
        >
          {gridSection.map((data) => (
            <div key={data.id}>
              <Space
                direction="vertical"
                size="large"
                align="center"
                className="mx-auto w-full text-center [&>.ant-space-item]:w-full"
              >
                <Image
                  src={data.image}
                  alt={data.title}
                  className="m-auto object-contain"
                />
                <Typography className="mt-1">
                  <Title
                    level={4}
                    className="m-0 font-title text-[24px] font-normal leading-[27px] laptop:text-[30px] laptop:leading-[34.32px]"
                  >
                    {data.title}
                  </Title>
                  <span className="text-[13px] leading-[23px] text-body-2">
                    {data.subTitle}
                  </span>
                  <Paragraph className="m-0 mt-2 font-body text-[13px] font-normal leading-[23px] text-body-1 tablet:max-w-md laptop:max-w-max">
                    {data.desc}
                  </Paragraph>
                </Typography>
              </Space>
            </div>
          ))}
        </Carousel>
      </Container>
    </Fragment>
  );
};

export default AboutPage;
