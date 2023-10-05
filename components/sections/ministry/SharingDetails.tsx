"use client";
import { Button } from "@components/ui/button";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

interface Props {
  projectId: string;
}

const SharingDetails = ({ projectId }: Props) => {
  const downloadQRCode = () => {
    const canvas = document
      .getElementById("QrCode")
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
  return (
    <div className="flex w-full flex-col space-y-6">
      <TabWrapper>
        <TabSectionWrapper
          contentClassname="w-[50%]"
          title="Scan-to-Donate"
          desc={
            <span>
              Showcase project details anywhere with your <br /> unique QR Code.
            </span>
          }
        >
          <div className="flex w-fit flex-col items-center justify-start space-y-3">
            <div
              id="QrCode"
              className="relative aspect-square w-fit bg-gray-200"
            >
              <QRCodeCanvas
                value={`${window.location.origin}/projects/${projectId}`}
                size={150}
              />
            </div>
            <Button
              variant="outline"
              onClick={downloadQRCode}
              className="w-fit space-x-2 border-accent text-accent"
            >
              <Download />
              <span>Download</span>
            </Button>
          </div>
        </TabSectionWrapper>
      </TabWrapper>
    </div>
  );
};

export default SharingDetails;
