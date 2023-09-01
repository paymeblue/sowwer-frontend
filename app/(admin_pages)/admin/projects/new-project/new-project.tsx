"use client";
import { CheckOutlined, CopyOutlined, EyeFilled } from "@ant-design/icons";
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import { useUtil } from "@hooks/useUtil";
import { truncateTextWithEllipsis } from "@lib/capitalize";
import Container from "@shared/Container";
import TabList from "@shared/TabList";
import { useGetProjectQuery } from "@store/services/projects";
import { Button, Divider, Space, TabsProps, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "react-iconly";
import Details from "./components/details";
import Overview from "./components/overview";

const { Title, Text } = Typography;

const NewProjectPage = () => {
  const defaultValue = "https://soower.com/title-of-project";

  const [link, setLink] = useState<string>(defaultValue);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { projectId } = useUtil();
  useEffect(() => {
    if (!projectId) {
      setLink(defaultValue);
    }
  }, [projectId]);
  const { data } = useGetProjectQuery(projectId, {
    skip: projectId ? false : true,
  });
  console.log(data);
  const updateLink = useCallback(() => {
    if (data?.data?.link) setLink(data.data.link);
  }, [data?.data?.link]);

  useEffect(() => {
    updateLink();
  }, [updateLink]);

  const items: TabsProps["items"] = [
    {
      key: "overview",
      label: "Overview",
      children: <Overview />,
    },
    {
      key: "details",
      label: "Sharing Details",
      children: <Details link={link} />,
    },
  ];
  const { copied, copyToClipboard } = useCopyToClipboard(`${link}`);

  return (
    <Container className="bg-[#F7F8FA] tablet:px-4">
      <Button
        type="text"
        size="large"
        className="mt-4 flex items-center justify-center text-[13px] leading-[16.38px] text-accent"
        icon={<ArrowLeft set="light" />}
        onClick={() => router.back()}
      >
        Back
      </Button>
      <Space className="my-4 w-full flex-col items-center justify-between laptop:flex-row">
        <Title level={3} className="leading-30.24px] text-[24px] font-bold">
          {query ? "Edit Project" : "New Project Name"}
        </Title>
        <Typography className="flex flex-col items-center justify-center gap-2 rounded-full bg-[#EBEFFF] p-1 text-[13px] font-semibold leading-[16.38px] text-accent tablet:flex-row">
          <div className="mx-2 text-[11px] laptop:text-[13px]">
            {truncateTextWithEllipsis(35, link)}
          </div>
          <Space className="gap-0 rounded-full bg-white p-1 tablet:flex-row">
            {copied ? (
              <Text className="m-0 cursor-pointer rounded-full rounded-r-none px-2 py-1 text-[12px] leading-[15.12px] text-accent hover:bg-slate-100">
                Copied &nbsp; <CheckOutlined />
              </Text>
            ) : (
              <Text
                onClick={copyToClipboard}
                className="m-0 cursor-pointer rounded-full rounded-r-none px-2 py-1 text-[12px] leading-[15.12px] text-accent hover:bg-slate-100"
              >
                Copy link &nbsp; <CopyOutlined />
              </Text>
            )}
            <Divider type="vertical" className="mx-0 h-6 border-gray-300" />
            <Text className="m-0 cursor-pointer rounded-full rounded-l-none px-2 py-1 text-[12px] leading-[15.12px] text-accent hover:bg-slate-100">
              Preview &nbsp; <EyeFilled />
            </Text>
          </Space>
        </Typography>
      </Space>
      <TabList items={items} />
    </Container>
  );
};

export default NewProjectPage;
