import React from "react";
import { QRCode, Button, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const downloadQRCode = () => {
  const canvas = document
    .getElementById("myqrcode")
    ?.querySelector<HTMLCanvasElement>("canvas");
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "Soower-Project-QRCode.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const QrCode = ({ text }: { text: string }) => {
  console.log(text);
  return (
    <Space id="myqrcode" className="flex-col">
      <QRCode errorLevel="Q" value={text} style={{ marginBottom: 16 }} />
      <Button
        type="default"
        icon={<DownloadOutlined style={{ fontSize: "18px" }} />}
        className="flex items-center justify-center border-accent bg-white text-[13px] font-semibold leading-[16.38px] text-accent"
        size="large"
        onClick={downloadQRCode}
      >
        Download
      </Button>
    </Space>
  );
};

export default QrCode;
