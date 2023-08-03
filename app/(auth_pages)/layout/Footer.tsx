"use client";
import { Divider, Layout, Space, Typography } from "antd";
import Link from "next/link";
import React from "react";

const { Footer } = Layout;
const { Paragraph } = Typography;

const AuthFooter = () => {
  const year = new Date().getFullYear();

  return (
    <Footer className="m-0 w-full bg-transparent px-8">
      <Divider type="horizontal" className="bg-[#555]" />
      <Space className=" w-full flex-col justify-between tablet:flex-row tablet:px-10">
        <Paragraph className="mb-0 text-center text-[12px] font-semibold leading-[15.12px] text-body-1 laptop:text-[13px] laptop:leading-[16.38px]">
          &copy; {year} Soower. All rights reserved.
        </Paragraph>
        <Space className="flex w-full flex-col justify-around gap-2 tablet:flex-row tablet:gap-8">
          <Link
            href="#"
            target="_blank"
            className="text-[12px] leading-[15.12px]  text-body-1 laptop:text-[13px] laptop:leading-[16.38px]"
          >
            Terms of Use
          </Link>
          <Link
            href="#"
            target="_blank"
            className="text-[12px] leading-[15.12px]  text-body-1 laptop:text-[13px] laptop:leading-[16.38px]"
          >
            Privacy Policy
          </Link>
        </Space>
      </Space>
    </Footer>
  );
};

export default AuthFooter;
