"use client";
import { HeartHandIcon, LensIcon, ReceiptIcon } from "components/assets/icons";
import Container from "@components/shared/Container";
import { Col, Row, Space, Typography } from "antd";
import Image from "next/image";
import rect from "public/assets/images/rectangle.png";
import { FC, Fragment, useId } from "react";
import { Hero } from "../components";

const MinistriesPage: FC = () => {
  const { Title, Paragraph } = Typography;
  const content = [
    {
      id: useId(),
      icon: <LensIcon />,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    },
    {
      id: useId(),
      icon: <HeartHandIcon />,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    },
    {
      id: useId(),
      icon: <ReceiptIcon />,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    },
  ];
  return (
    <Fragment>
      <Container>
        <Hero
          title1="Are you a ministry with widow, orphan or mission programs? Register with us today!"
          para1="Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim."
          para2=" Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. "
          btn="Register as a ministry"
          link="auth/signup/ministry"
          btn2="Log in to ministry account"
          link2="auth/signin/ministry"
          isType1={true}
          doubleBtn
        />
        <Row
          gutter={[32, 24]}
          className="my-12 grid grid-cols-1 items-center justify-items-end laptop:grid-cols-2"
        >
          <Col>
            <Title className="font-title text-[28.32px] leading-[32.4px] laptop:text-[50px] laptop:leading-[57px]">
              Lorem ipsum dolor sit amet consectetur. Nisi.
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
                      className="font-title text-[19.13px] leading-[21.88px] laptop:text-[24px] laptop:leading-[27px]"
                    >
                      {item.title}
                    </Title>
                    <Paragraph className="text-[10.36px] leading-[18.33px] text-body-1 laptop:text-[13px] laptop:leading-[23px]">
                      {item.desc}
                    </Paragraph>
                  </Typography>
                </Space>
              ))}
            </Typography>
          </Col>
          <Col>
            <Image
              height={629}
              width={595}
              className="rounded-md"
              src={rect}
              alt="rectangle"
              priority
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default MinistriesPage;
