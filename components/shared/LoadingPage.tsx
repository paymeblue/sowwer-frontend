"use client";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const LoadingPage = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 64,
        display: "flex",
        alignItems: "center",
        minHeight: "10rem",
        color: "#FFC629",
      }}
      spin
    />
  );
  return (
    <div className="flex h-full min-h-[80vh] w-[100vw] items-center justify-center">
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};

export default LoadingPage;
