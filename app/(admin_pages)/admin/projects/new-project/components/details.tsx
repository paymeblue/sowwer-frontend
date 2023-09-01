import { DownloadOutlined } from "@ant-design/icons";
import { CheckCircleIcon } from "@components/assets/icons";
import { useAppDispatch } from "@hooks/useStore";
import { useUtil } from "@hooks/useUtil";
import { setProjectId } from "@store/reducers/utilSlice";
import { usePublishOrDraftProjectMutation } from "@store/services/projects";
import { Button, QRCode, Space, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const { Title, Paragraph } = Typography;
type IProps = {
  link: string;
};

type SubmitHandlerProps = {
  prop: "draft" | "publish";
  q: "active" | "drafted";
};

const Details = ({ link }: IProps) => {
  const { projectId } = useUtil();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({ draft: false, publish: false });
  const [publishOrDraftProject, { data }] = usePublishOrDraftProjectMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    if (data) {
      dispatch(setProjectId({ projectId: undefined }));
    }
  }, [data, dispatch]);

  const submitHandler = async ({ prop, q }: SubmitHandlerProps) => {
    setIsLoading((prev) => ({ ...prev, [prop]: true }));
    try {
      const res = await publishOrDraftProject({
        id: projectId!,
        query: q,
      }).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error: any) {
      messageApi.open({
        content: `${error}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, [prop]: false }));
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <section className=" rounded bg-white p-4">
        <Space
          className="flex w-full flex-col items-start tablet:flex-row [&>div.ant-space-item]:w-full"
          size="large"
        >
          <Typography>
            <Title level={5} className="text-[15px] font-bold leading-[18.9px]">
              Scan-to-Donate
            </Title>
            <Paragraph className="text-[14px] leading-[17.64px] text-body-2">
              Showcase project details anywhere with your unique QR Code.
            </Paragraph>
          </Typography>
          <div>
            <Space id="myqrcode" className="flex-col">
              <QRCode
                errorLevel="Q"
                value={link}
                style={{ marginBottom: 16 }}
              />
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
          </div>
        </Space>
        <Space className="my-8 w-full justify-end">
          <Button
            htmlType="button"
            type="default"
            size="large"
            className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
            loading={isLoading.draft}
            onClick={() => submitHandler({ prop: "draft", q: "drafted" })}
          >
            {isLoading.draft ? "Saving" : "Save as Draft"}
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
            loading={isLoading.publish}
            onClick={() => submitHandler({ prop: "publish", q: "active" })}
          >
            {isLoading.publish ? "Publishing" : "Publish"}
          </Button>
        </Space>
      </section>
    </Fragment>
  );
};

export default Details;
