"use client";
import Container from "@shared/Container";
import { Button, Col, Row, Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import spiral from "public/assets/images/circular_dotted_lines.svg";
import gridUnited from "public/assets/images/grid_images.svg";
import gridImages from "public/assets/images/group_images.svg";
import hands from "public/assets/images/hands.svg";
import unitedHands from "public/assets/images/united_hands.svg";
import unitedHandsSm from "public/assets/images/united_sm.svg";
import { FC, Fragment, useId } from "react";
import { ArrowRight } from "react-iconly";
import { Accordion, FeaturedProjects, Hero, HomeCard } from "./index";

const HomePage: FC = () => {
  const { Title, Paragraph } = Typography;
  const gridSection = [
    {
      id: useId(),
      image: gridUnited,
      title: "Ministries",
      desc: " Lorem ipsum dolo consecteur, faucibus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim.",
    },
    {
      id: useId(),
      image: hands,
      title: "Donors",
      desc: " Lorem ipsum dolo consecteur, faucibus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim.",
    },
    {
      id: useId(),
      image: gridImages,
      title: "Impact",
      desc: " Lorem ipsum dolo consecteur, faucibus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim.",
    },
  ];
  return (
    <Fragment>
      <Container className="mt-0">
        <Hero
          title1="Alone we can do so little;"
          title2="together we can do so much."
          para1={`"In all things I have shown you that by working hard in this way we must help the weak and remember the words of the Lord Jesus, how He himself said it is more blessed to give than to receive."`}
          para2="—   Acts 20:35 (ESV)"
          hasIcon={true}
          btn="Make a Donation"
          link="projects"
          page1
        />
        <Row
          gutter={[32, 24]}
          className="mb-12 grid grid-cols-1 items-center laptop:grid-cols-2"
        >
          <Col flex={1}>
            <Typography>
              <Title
                level={5}
                className="font-body text-xs leading-[15px] text-accent"
              >
                ABOUT US
              </Title>
              <Title
                level={3}
                className="mt-0 font-title text-[30px] font-normal leading-[34.32px] text-black tablet:text-[50px] tablet:leading-[57px]"
              >
                Perfectly positioned to lend a helping hand
              </Title>
              <Paragraph className="font-body text-[14px] leading-[26px] text-body-1 tablet:text-[15px] tablet:leading-[28px]">
                Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                arcu imperdiet pellentesque. Urna eros interdum est sollicitudin
                dignissim. Convallis iaculis blandit ultrices posuere. Lorem
                ipsum dolor sit amet consectetur. Faucibus risus risus arcu
                imperdiet pellentesque. Urna eros interdum est sollicitudin
                dignissim. Convallis iaculis blandit ultrices posuere.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                className="mb-12 mt-6 flex items-center px-[35px] py-[18px] text-[14px] font-medium text-black tablet:mb-auto "
              >
                <Link
                  href="/about"
                  className="pr-3 font-body text-[14px] font-medium text-black no-underline "
                >
                  Learn More
                </Link>
                <ArrowRight set="light" size={18} />
              </Button>
            </Typography>
          </Col>
          <Col flex={1} className="mt-8 w-full text-center tablet:mt-auto">
            <Image
              className="hidden w-full rounded-md tablet:block"
              src={unitedHands}
              alt="hands united"
              priority
            />
            <Image
              className="w-full rounded-md tablet:hidden"
              src={unitedHandsSm}
              alt="hands united"
              priority
            />
          </Col>
        </Row>
        <Space direction="vertical" className="relative my-8 tablet:my-12">
          <Typography className="mb-8 w-full laptop:w-2/3">
            <Title
              level={4}
              className="mt-0 font-title text-[30px] leading-[34.32px] laptop:text-[50px]  laptop:leading-[57.2px]"
            >
              The Ripple Effect of Giving
            </Title>
            <Paragraph className="font-body text-[14px] font-normal leading-[26px] text-body-1 laptop:text-[15px] laptop:leading-[28px]">
              Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
              imperdiet pellentesque. Urna eros interdum est sollicitudin
              dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum
              dolor sit amet consectetur.
            </Paragraph>
          </Typography>
          <Row
            gutter={[32, 24]}
            className="relative z-0 my-6 grid grid-cols-1 laptop:my-12 laptop:grid-cols-3 laptop:items-end"
          >
            {gridSection.map((data) => (
              <Col key={data.id}>
                <Space
                  direction="vertical"
                  size="large"
                  align="center"
                  className="w-full text-center"
                >
                  <Image src={data.image} alt="grid images" />
                  <Typography className="mt-8 ">
                    <Title
                      level={4}
                      className="font-title text-[24px] font-normal leading-[27px] laptop:text-[30px] laptop:leading-[34.32px]"
                    >
                      {data.title}
                    </Title>
                    <Paragraph className=" font-body text-[13px] font-normal leading-[23px] text-body-1 tablet:max-w-md laptop:max-w-max laptop:text-[14px] laptop:leading-[26px]">
                      {data.desc}
                    </Paragraph>
                  </Typography>
                </Space>
              </Col>
            ))}
            <Image
              src={spiral}
              alt="spiral background"
              className="absolute inset-0 z-[-1] m-auto"
            />
          </Row>
        </Space>
      </Container>
      <FeaturedProjects />
      <Container>
        <Accordion />
        <HomeCard
          title1="“Therefore, as we have opportunity, let us do good to all people, especially to those who belong to the family of believers.”"
          sub="—   Galatians 6:10 (NIV)"
          showIcon
          link="projects"
          btnText="Make a Donation"
        />
      </Container>
    </Fragment>
  );
};

export default HomePage;
