"use client";
import { Steps, Typography } from "antd";
import { Fragment, useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import SelectCategory from "./components/SelectCategory";

const { Text } = Typography;

const RegistryStep = () => {
  const [current, setCurrent] = useState<number>(0);
  const steps = [
    {
      key: "1",
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Select Category
        </Text>
      ),
      content: <SelectCategory setCurrent={setCurrent} current={current} />,
    },
    {
      key: "2",
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Personal Information
        </Text>
      ),
      content: <PersonalInfo setCurrent={setCurrent} current={current} />,
    },
  ];
  const items = steps.map((item) => ({ key: item.key, title: item.title }));

  return (
    <Fragment>
      <Steps current={current} items={items} className="my-8" progressDot />
      {steps[current].content}
    </Fragment>
  );
};

export default RegistryStep;
