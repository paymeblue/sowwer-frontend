import { CheckCircleIcon } from "@components/assets/icons";
import { Button, Divider, Form, Input, Space, Typography, message } from "antd";
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useState,
} from "react";
import QrCode from "./qrCode";

const { Title, Paragraph } = Typography;
const { Item, useForm } = Form;
type IProps = {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
};
const Details = ({ link, setLink }: IProps) => {
  const [form] = useForm();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  console.log(link);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any): Promise<void> => {
    setIsLoading(true);
    console.log("Form data: ", values);
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulating an asynchronous operation
    form.resetFields();
    setIsLoading(false);
    messageApi.open({
      content: `Successful!`,
      className: "[&>div]:bg-[#17B472] [&>div]:text-white",
      icon: <CheckCircleIcon />,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      content: "Form submission failed!",
      className: "[&>div]:bg-red-800 [&>div]:text-white",
    });
  };

  return (
    <Fragment>
      {contextHolder}
      <Form
        form={form}
        name="create_new_project_form_main_details"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className=" rounded bg-white p-4"
      >
        <Space
          className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full"
          size="large"
        >
          <Typography>
            <Title level={5} className="text-[15px] font-bold leading-[18.9px]">
              Project Link
            </Title>
            <Paragraph className="text-[14px] leading-[17.64px] text-body-2">
              Choose a custom link for your project, to share with people.
            </Paragraph>
          </Typography>
          <div>
            <Item
              name="link"
              label="Project link"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  required: true,
                  message: "Please customize your project link",
                },
              ]}
            >
              <Input
                addonBefore="https://soower.com/"
                placeholder="title-of-project"
                onChange={onChange}
                value={link}
                className="[&>span>.ant-input-group-addon]:leding-[16.38px] rounded border-none bg-[#EBEFFF] text-[12px] font-light leading-[15.12px] [&>span>.ant-input-group-addon]:border-none [&>span>.ant-input-group-addon]:bg-inherit [&>span>.ant-input-group-addon]:text-[13px] [&>span>.ant-input-group-addon]:font-medium [&>span>.ant-input-group-addon]:text-accent [&>span>.ant-input-group-addon]:outline-none [&>span>input]:border-none  [&>span>input]:bg-gray-50  [&>span>input]:py-2 [&>span>input]:outline-none"
              />
            </Item>
          </div>
        </Space>
        <Space className="w-full justify-end">
          <Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
              loading={isLoading}
            >
              {isLoading ? "Saving" : "Save"}
            </Button>
          </Item>
        </Space>
        <Divider type="horizontal" className="my-0" />
      </Form>
      <Form
        form={form}
        name="create_new_project_form_main_details"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className=" rounded bg-white p-4"
      >
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
            <QrCode text={`https://soower.com/${link}`} />
          </div>
        </Space>
        <Space className="my-8 w-full justify-end">
          <Button
            htmlType="submit"
            type="default"
            size="large"
            className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
            loading={isLoading}
          >
            {isLoading ? "Saving" : "Save as Draft"}
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
            loading={isLoading}
          >
            {isLoading ? "Publishing" : "Publish"}
          </Button>
        </Space>
      </Form>
    </Fragment>
  );
};

export default Details;
