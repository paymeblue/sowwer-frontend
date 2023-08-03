import React, { Fragment } from "react";
import { Button, Space, Typography } from "antd";
import { Heart2 } from "react-iconly";
import Link from "next/link";

type Props = {
  title1: string;
  title2?: string;
  para1: string;
  para2?: string;
  isType1?: boolean;
  isType2?: boolean;
  hasIcon?: boolean;
  btn?: string;
  link?: string;
  btn2?: string;
  link2?: string;
  hideBtn?: boolean;
  doubleBtn?: boolean;
  page1?: boolean;
};

const Hero = ({
  title1,
  title2,
  para1,
  para2,
  isType1,
  isType2,
  btn,
  link,
  btn2,
  link2,
  hideBtn,
  page1,
  hasIcon,
  doubleBtn,
}: Props) => {
  const { Title, Text } = Typography;

  const landingPage = () => (
    <section
      className={`mt-8 flex items-center text-center tablet:mt-0 tablet:h-screen ${
        hasIcon && "max-w-4xl"
      }  m-auto`}
    >
      <Space direction="vertical" size={35} className="block">
        <div>
          <Title
            className={`font-title text-[45px] leading-[51.48px] text-black tablet:text-[70px] tablet:leading-[65px]`}
          >
            {title1}
            <br />
            {title2}
          </Title>
          <Typography className="tablet:px-8">
            <Text className="text-start font-body text-[14px] leading-[26px] text-body-1 tablet:text-center tablet:text-base tablet:leading-[28px]">
              {para1}
            </Text>
            <div className="mt-3">
              <Text className="font-body text-[13px] leading-[16.38px] text-body-1 tablet:text-base tablet:leading-[28px]">
                {para2}
              </Text>
            </div>
          </Typography>
        </div>

        <Button
          type="primary"
          icon={hasIcon && <Heart2 set="bold" size={18} />}
          size="large"
          className="mx-auto mb-24 mt-6 flex items-center justify-center font-body text-[14px] font-medium text-black tablet:mb-auto laptop:px-[46px] laptop:py-[22px]"
        >
          <Link href={`/${link}`}>&nbsp;{btn}</Link>
        </Button>
      </Space>
    </section>
  );
  const render1 = () => (
    <section
      className={`h-full text-center ${
        hideBtn ? "max-w-3xl" : "max-w-4xl"
      }  mt-[3rem] ${hideBtn ? "mb-7" : "mb-[12%]"} m-auto mx-auto`}
    >
      <Space direction="vertical" size={35} className="block">
        <div>
          <Title
            className={`font-title text-[30px] leading-[34.32px] ${
              doubleBtn && "text-[45px] leading-[51.48px]"
            } text-black  laptop:text-[50px] laptop:leading-[57.2px]`}
          >
            {title1}
          </Title>
          <Text
            className={`text-[14px] leading-[26px] text-body-1 ${
              hideBtn && "laptop:text-[16px]"
            } laptop:text-[14px] laptop:leading-[28px]`}
          >
            {para1} <br />
            {para2}
          </Text>
        </div>
        {doubleBtn ? (
          <Space
            size="small"
            className="mt-6 flex w-full flex-col justify-center gap-0 tablet:mt-auto tablet:flex-row tablet:gap-2"
          >
            <Button
              type="primary"
              icon={hasIcon && <Heart2 set="bold" size={19} />}
              size="large"
              className="mx-auto mt-6 flex items-center justify-center gap-2 text-[13px] font-medium leading-[16.38px] text-black laptop:p-6 "
            >
              <Link href={`/${link}`}>&nbsp;{btn}</Link>
            </Button>
            <Button
              type="default"
              icon={hasIcon && <Heart2 set="bold" size={19} />}
              size="large"
              className="mx-auto mt-6 flex items-center justify-center gap-2 border-black text-[13px] font-medium leading-[16.38px] text-black laptop:p-6 "
            >
              <Link href={`/${link2}`}>&nbsp;{btn2}</Link>
            </Button>
          </Space>
        ) : null}
      </Space>
    </section>
  );
  const render2 = () => (
    <section className="mt-[3rem] text-left">
      <Space direction="vertical" size="small">
        <Title className="laptop:leading-[57px]] font-title text-[45px] leading-[51.48px] laptop:text-[50px]">
          {title1}
          <br />
          {title2}
        </Title>
        <Text className="laptop:lading-[28px] text-[14px] leading-[26px] text-body-1 laptop:text-[15px]">
          {para1}
          <br />
        </Text>
      </Space>
    </section>
  );

  return (
    <Fragment>
      {page1 && landingPage()}
      {isType1 && render1()}
      {isType2 && render2()}
    </Fragment>
  );
};

export default Hero;
