import { CheckCircleIcon } from "@components/assets/icons";
import { useUtil } from "@hooks/useUtil";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  useEditProjectMutation,
  useGetProjectQuery,
} from "@store/services/projects";
import { Button, Space, Typography, message } from "antd";
import Parser from "html-react-parser";
import { useSearchParams } from "next/navigation";
import React, { FormEvent, Fragment, useEffect, useState } from "react";
import QuillWrapper from "./QuillEditor";

const { Title, Paragraph } = Typography;

const Editor: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const projectIdOld = searchParams.get("q");
  const { projectId } = useUtil();
  let id: string | undefined;
  if (projectIdOld) {
    id = projectIdOld;
  }
  const { data } = useGetProjectQuery(id ?? skipToken);
  const [editProject, { isLoading, isSuccess }] = useEditProjectMutation();
  useEffect(() => {
    const description = data?.data?.description ?? "";
    setValue(description);
  }, [data?.data?.description]);

  const getTextFromParsedHTML = (parsedHTML: any): string => {
    if (Array.isArray(parsedHTML)) {
      return parsedHTML.map((item) => getTextFromParsedHTML(item)).join("");
    } else if (typeof parsedHTML === "object" && parsedHTML.props) {
      return getTextFromParsedHTML(parsedHTML.props.children);
    } else if (typeof parsedHTML === "string") {
      return parsedHTML;
    } else {
      return "";
    }
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const parsedText = Parser(value ? value : "");
    const extractedText = getTextFromParsedHTML(parsedText);

    try {
      const res = await editProject({
        id: projectId || id,
        description: extractedText,
      }).unwrap();
      // setValue("");
      messageApi.open({
        content: `${res.message}`,
        className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
        icon: <CheckCircleIcon />,
      });
    } catch {
      (error: any) => {
        messageApi.open({
          content: `${error}`,
          className: `[&>div]:bg-red-800 [&>div]:text-white`,
        });
      };
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <Space className="flex w-full flex-col items-start bg-white p-4 [&>div.ant-space-item]:w-full">
        <Typography>
          <Title
            level={5}
            className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
          >
            Story
          </Title>
          <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
            Describe and talk about your project.
          </Paragraph>
        </Typography>
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="mb-1">
            <label
              htmlFor="editor"
              className="m-0 mr-1 text-[10.91px] leading-[13.75px] laptop:text-[13px] laptop:leading-[16.38px]"
            >
              What is this project about?
            </label>
            <span className="mr-2 font-bold text-red-300">*</span>
          </div>
          <div id="editor">
            <QuillWrapper
              theme="snow"
              value={value}
              onChange={setValue}
              bounds={".editor"}
              className="h-[150px]"
            />
          </div>
          <Space className="mt-6 flex h-[100px] w-full justify-end">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white disabled:cursor-not-allowed disabled:bg-gray-300"
              loading={isLoading}
              disabled={!value}
            >
              {isLoading ? "Saving" : isSuccess ? "Saved" : "Save"}
            </Button>
          </Space>
        </form>
      </Space>
    </Fragment>
  );
};

export default Editor;
