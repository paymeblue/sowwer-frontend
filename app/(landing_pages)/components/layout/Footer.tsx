import {
  InstagramFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import {
  CallingIcon,
  FacebookIcon,
  MessageIcon,
} from "@components/assets/icons";
import { Col, Divider, Layout, Row, Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import appleStore from "public/assets/icons/app-store.svg";
import playStore from "public/assets/icons/google-play.svg";
import logo from "public/assets/icons/logo-white.svg";
import { Fragment, useId } from "react";

const Footer = () => {
  const { Footer } = Layout;
  const { Paragraph } = Typography;
  const socialIcons = [
    {
      id: useId(),
      icon: <TwitterOutlined style={{ color: "#fff", fontSize: "20px" }} />,
      link: "#",
    },
    {
      id: useId(),
      icon: <InstagramFilled style={{ color: "#fff", fontSize: "20px" }} />,
      link: "#",
    },
    ,
    {
      id: useId(),
      icon: <FacebookIcon style={{ color: "#fff", fontSize: "20px" }} />,
      link: "#",
    },
    {
      id: useId(),
      icon: <YoutubeFilled style={{ color: "#fff", fontSize: "20px" }} />,
      link: "#",
    },
  ];
  const quickLinks = [
    { id: useId(), link: "about", text: "About us" },
    { id: useId(), link: "projects", text: "Explore projects" },
    { id: useId(), link: "ministries", text: "For ministries" },
  ];
  const contactLinks = [
    {
      id: useId(),
      link: "tel:(+234) 123 456 7890",
      icon: <CallingIcon />,
      text: "(+234) 123 456 7890",
    },
    {
      id: useId(),
      link: "mailto:info@soower.com",
      icon: <MessageIcon />,
      text: "info@soower.com",
    },
  ];
  return (
    <Fragment>
      <Footer className="text-cneter m-0 w-full bg-secondary-black px-8 tablet:text-start">
        <Row
          gutter={[8, 36]}
          className="mt-6 flex-col text-center tablet:flex-row tablet:px-10 tablet:text-start"
        >
          <Col flex={2}>
            <Space
              direction="vertical"
              className="w-full items-center tablet:items-start"
            >
              <Link href="/">
                <Image
                  src={logo}
                  alt="Soower logo"
                  priority
                  className="w-auto"
                />
              </Link>
              <Paragraph className="mb-0 max-w-sm text-center text-[12px] leading-[20px] text-[rgba(255,_255,_255,_0.8)] tablet:text-start laptop:text-[14px] laptop:leading-[23px]">
                The Kingdom Investment Platform. Perfectly positioned to lend a
                helping hand.
              </Paragraph>
              <Space size="large" className="my-3">
                {socialIcons.map((social) => (
                  <Link
                    href={`${social?.link}`}
                    key={social!.id}
                    target="_blank"
                  >
                    {social!.icon}
                  </Link>
                ))}
              </Space>
              <Space
                size="middle"
                className="my-6 w-full flex-col tablet:flex-row"
              >
                <Link href="#" target="_blank">
                  <Image
                    src={appleStore}
                    alt="Download app on iOS devices from Apple Store"
                  />
                </Link>
                <Link href="#" target="_blank">
                  <Image
                    src={playStore}
                    alt=" Download app on android devices from Google Play Store"
                  />
                </Link>
              </Space>
            </Space>
          </Col>
          <Col flex={2}>
            <Row
              gutter={[8, 36]}
              className="mb-0 flex-col tablet:mb-8 tablet:flex-row"
            >
              <Col flex={1}>
                <Space
                  direction="vertical"
                  className="w-full items-center tablet:items-start"
                >
                  <h6 className="font-sub-title text-[15px] leading-[18.6px] text-white laptop:text-[18px] laptop:leading-[22.32px]">
                    Quick Links
                  </h6>
                  <ul>
                    {quickLinks.map((helperLink) => (
                      <li key={helperLink!.id} className="mb-4">
                        <Link
                          href={`/${helperLink?.link}`}
                          className="text-[13px] leading-[16.38px] text-[rgba(255,_255,_255,_0.8)]  hover:text-white laptop:text-[14px] laptop:leading-[17.64px]"
                        >
                          {helperLink!.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Space>
              </Col>
              <Col flex={1}>
                <Space
                  direction="vertical"
                  className="w-full items-center tablet:items-start"
                >
                  <h6 className="font-sub-title text-[15px] leading-[18.6px] text-white laptop:text-[18px] laptop:leading-[22.32px]">
                    Contact us
                  </h6>
                  <ul>
                    {contactLinks.map((contact) => (
                      <li key={contact!.id} className="mb-4">
                        <Link
                          href={`${contact.link}`}
                          target="_blank"
                          className="text-[13px] leading-[16.38px] text-[rgba(255,_255,_255,_0.8)] hover:text-white laptop:text-[14px] laptop:leading-[17.64px]"
                        >
                          {contact.icon} &nbsp; {contact.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider type="horizontal" className="bg-[#555]" />
        <Space
          size={20}
          className=" w-full flex-col tablet:flex-row tablet:px-10"
        >
          <Paragraph className="mb-0 text-center text-[12px] leading-[15.12px]  text-[rgba(255,_255,_255,_0.8)] laptop:text-[13px] laptop:leading-[16.38px]">
            &copy; 2023 Soower. All rights reserved.
          </Paragraph>
          <Link
            href="#"
            target="_blank"
            className="text-[12px] leading-[15.12px]  text-[rgba(255,_255,_255,_0.8)] laptop:text-[13px] laptop:leading-[16.38px]"
          >
            Terms of Use
          </Link>
          <Link
            href="#"
            target="_blank"
            className="text-[12px] leading-[15.12px]  text-[rgba(255,_255,_255,_0.8)] laptop:text-[13px] laptop:leading-[16.38px]"
          >
            Privacy Policy
          </Link>
        </Space>
      </Footer>
    </Fragment>
  );
};
export default Footer;
