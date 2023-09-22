import { Button } from "@components/ui/button";
import TabSectionWrapper, { TabWrapper } from "./TabContentWrapper";
import { Download } from "lucide-react";

const SharingDetails = () => {
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
          <div className="flex flex-col space-y-3">
            <div className="relative aspect-square w-[10rem] bg-gray-200" />
            <Button
              variant="outline"
              className="w-fit space-x-2 border-accent text-accent"
            >
              <Download />
              <span>Download</span>
            </Button>
          </div>
        </TabSectionWrapper>
      </TabWrapper>

      <div className="ml-auto flex w-fit space-x-4">
        <Button variant="outline" className="w-fit border-accent text-accent">
          Save as draft
        </Button>
        <Button variant="secondary">Publish</Button>
      </div>
    </div>
  );
};

export default SharingDetails;
