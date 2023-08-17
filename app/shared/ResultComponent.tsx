import { Button, Result, Typography } from "antd";
import Link from "next/link";
import React, { ReactNode, memo } from "react";

type Props = {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
  icon?: ReactNode;
  btnText?: string;
  btnLink?: string;
  showBtn?: boolean;
  btnBg?: "primary" | "accent";
  btnTextColor?: "black" | "white";
  className?: string;
  onBtnClick?: React.MouseEventHandler<HTMLElement>;
  status?: "info" | "success" | "warning" | "error";
};
const { Paragraph } = Typography;
const ResultComponent = ({
  title,
  subTitle,
  icon,
  btnText,
  btnLink,
  showBtn,
  btnBg,
  btnTextColor,
  className,
  onBtnClick,
  status,
}: Props) => {
  return (
    <Result
      className={className}
      title={title}
      subTitle={
        <Paragraph className="text-[13px] leading-[23px] text-body-2 laptop:text-[14px] laptop:leading-[26px]">
          {subTitle}
        </Paragraph>
      }
      icon={icon}
      status={status || "info"}
      extra={
        showBtn && (
          <Button
            type="primary"
            key="console"
            className={`bg-${btnBg} mx-auto mt-0 flex items-center justify-center text-white`}
            size="large"
            onClick={onBtnClick}
          >
            {btnLink ? (
              <Link
                href={`/${btnLink}`}
                className={`text-${btnTextColor} px-4 py-2 text-[13px] font-medium leading-[16.38px] laptop:text-[14px] laptop:leading-[17.64px]`}
              >
                {btnText}
              </Link>
            ) : (
              <Paragraph
                className={`text-${btnTextColor} m-0 px-4 py-2 text-[13px] font-medium leading-[16.38px] laptop:text-[14px] laptop:leading-[17.64px]`}
              >
                {btnText}
              </Paragraph>
            )}
          </Button>
        )
      }
    />
  );
};

export default memo(ResultComponent);
