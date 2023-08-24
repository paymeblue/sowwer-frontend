"use client";
import { DonateIcon } from "@components/assets/icons";
import ResultComponent from "@shared/ResultComponent";
import { Card, Typography } from "antd";
import { Fragment } from "react";

const DonationSuccess = ({ page }: { page: string }) => {
  const { Title, Text } = Typography;
  return (
    <Fragment>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="mx-4 max-w-2xl tablet:m-auto" bordered={false}>
          <ResultComponent
            icon={<DonateIcon />}
            title={
              <Title
                className="mb-0 font-title text-[21.18px] leading-[24.23px] text-body-1 laptop:text-[35px] laptop:leading-[40px]"
                level={4}
              >
                Donation successful.
              </Title>
            }
            subTitle={
              <Text className="text-[13px] leading-[23px] text-body-1 laptop:text-[14px] laptop:leading-[26px]">
                Your payment has been processed and your donation was
                successful.
              </Text>
            }
            btnText={`Back to ${page} page`}
            btnLink={page}
            showBtn
            btnBg="primary"
            btnTextColor="black"
            className="p-0"
          />
        </Card>
      </div>
    </Fragment>
  );
};

export default DonationSuccess;
