"use client";
import { DonateIcon } from "@components/assets/icons";
import ResultComponent from "@shared/ResultComponent";
import { Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;
const RegistrationSuccess = () => {
  return (
    <ResultComponent
      className="mt-14"
      title={
        <Title
          className="font-title text-[35px] leading-[40px] text-body-1"
          level={3}
        >
          Thanks for joining our registry!
        </Title>
      }
      subTitle={
        <Paragraph className="text-[14px] leading-[26px] text-body-1">
          Lorem ipsum dolor sit amet consectetur. Iaculis a ut faucibus nibh
          tempor felis. Vitae eget semper vel porttitor diam.
        </Paragraph>
      }
      icon={<DonateIcon />}
      btnLink=""
      btnText="Back to Homepage"
      btnBg="accent"
      btnTextColor="white"
      showBtn
    />
  );
};

export default RegistrationSuccess;
