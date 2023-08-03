"use client";
import { Steps, theme } from "antd";
import React, { Fragment } from "react";
import { useStep } from "./context/registry-context";

const RegistryStep = () => {
  const { token } = theme.useToken();

  const { current, steps } = useStep();

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  return (
    <Fragment>
      <Steps current={current} items={items} className="my-8" progressDot />
      <div style={contentStyle}>{steps[current].content}</div>
    </Fragment>
  );
};

export default RegistryStep;
