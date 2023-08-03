import React, { createContext, useState, useContext, ReactNode } from "react";
import { Typography } from "antd";
import PersonalInfo from "../components/PersonalInfo";
import SelectCategory from "../components/SelectCategory";
const StepContext = createContext<{
  current: number;
  steps: Array<{
    title: ReactNode;
    content: ReactNode;
  }>;
  next: () => void;
  prev: () => void;
}>({
  current: 0,
  next: () => {},
  prev: () => {},
  steps: [
    {
      title: "Select Category",
      content: <SelectCategory />,
    },
    {
      title: "Personal Information",
      content: <PersonalInfo />,
    },
  ],
});

const StepProvider = ({ children }: { children: ReactNode }) => {
  const [current, setCurrent] = useState(0);
  const { Text } = Typography;
  const steps = [
    {
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Select Category
        </Text>
      ),
      content: <SelectCategory />,
    },
    {
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Personal Information
        </Text>
      ),
      content: <PersonalInfo />,
    },
  ];

  const next = () => {
    setCurrent((prevStep) => prevStep + 1);
  };

  const prev = () => {
    setCurrent((prevStep) => prevStep - 1);
  };

  return (
    <StepContext.Provider value={{ current, steps, next, prev }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => {
  const { current, steps, next, prev } = useContext(StepContext);

  return { current, steps, next, prev };
};

export default StepProvider;
