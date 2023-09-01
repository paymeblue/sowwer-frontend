"use client";
import {
  InstagramFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import {
  CheckCircleIcon,
  FacebookIcon,
  MailIcon,
  PhoneIcon,
} from "@components/assets/icons";
import countrycodes from "@lib/CountryCode";
import Container from "@shared/Container";
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import Link from "next/link";
import { FC, Fragment, useId, useRef, useState } from "react";

type State = {
  name: string;
  email: string;
  code: any;
  phoneNum: string;
  msg: string;
};

const ContactPage: FC = () => {
  const { Title, Text, Paragraph } = Typography;
  const { Item, useForm } = Form;
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = useForm();
  const formRef = useRef<FormInstance>(null);

  const onCodeChange = (value: string) => {
    formRef.current?.setFieldsValue({ phone: value });
  };
  const selectBefore = () => {
    return (
      <Item name="code" noStyle>
        <Select style={{ width: 60 }} onChange={onCodeChange}>
          {countrycodes.map((country) => (
            <Option value={country.code} key={country.flag}>
              {country.flag}
            </Option>
          ))}
        </Select>
      </Item>
    );
  };

  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: State): Promise<void> => {
    setIsLoading(true);
    console.log("Form data: ", values);
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulating an asynchronous operation
    // form.resetFields();
    setIsLoading(false);
    messageApi.open({
      content: `Subimssion successful!`,
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
  const socialIcons = [
    {
      id: useId(),
      icon: <TwitterOutlined style={{ color: "#333", fontSize: "20px" }} />,
      link: "#",
    },
    {
      id: useId(),
      icon: <InstagramFilled style={{ color: "#333", fontSize: "20px" }} />,
      link: "#",
    },
    ,
    {
      id: useId(),
      icon: <FacebookIcon style={{ color: "#333", fontSize: "20px" }} />,
      link: "#",
    },
    {
      id: useId(),
      icon: <YoutubeFilled style={{ color: "#333", fontSize: "20px" }} />,
      link: "#",
    },
  ];
  return (
    <Fragment>
      {contextHolder}
      <Container>
        <Row className="mx-4 my-12 grid grid-cols-1 items-start justify-between gap-8 tablet:mx-auto tablet:grid-cols-2">
          <Col className=" max-w-md">
            <Title className="font-title text-[45px] leading-[51.48px] laptop:text-[50px] laptop:leading-[57px]">
              Contact us
            </Title>
            <Paragraph className="text-[12px] leading-[26px] text-body-1 laptop:text-[15px] laptop:leading-[26px]">
              Want to make an inquiry or give us some feedback? Fill out the
              form and we&apos;ll be in touch within 24hours.
            </Paragraph>
            <Space size="large" className="my-3">
              {socialIcons.map((social) => (
                <Link href={`${social?.link}`} key={social!.id} target="_blank">
                  {social!.icon}
                </Link>
              ))}
            </Space>
            <div>
              <Space size="middle" className="my-2">
                <PhoneIcon style={{ color: "#333333", fontSize: "20px" }} />
                <Text className="text-[13.26px] text-sm leading-[16.71px] text-body-1 laptop:text-[17.0127px] laptop:leading-[21px]">
                  (+234) 123 456 7890
                </Text>
              </Space>
            </div>
            <div>
              <Space size="middle" className="my-2">
                <MailIcon style={{ color: "#333333", fontSize: "20px" }} />
                <Text className="text-[13.26px] text-sm leading-[16.71px] text-body-1 laptop:text-[17.0127px] laptop:leading-[21px]">
                  info@soower.com
                </Text>
              </Space>
            </div>
          </Col>
          <Col className="max-w-md px-0 shadow-[10px_11px_0px_0px_#2c556a]">
            <Card className="rounded-none shadow-[5px_0px_20px_rgba(0,_0,_0,_0.05),_-3px_0px_15px_-15px_rgba(0,_0,_0,_0.15),_-18px_10px_30px_-4px_rgba(0,_0,_0,_0.05)]">
              <Form
                form={form}
                ref={formRef}
                name="contact_form"
                layout="vertical"
                className="max-w-lg"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  code: "+234",
                  phone: "+234",
                }}
              >
                <Item
                  name="name"
                  label="Full Name"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  rules={[
                    { required: true, message: "Please enter your name!" },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Enter your full name"
                    type="text"
                    required
                    className="rounded border-none bg-[#F7F8FA] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
                <Item
                  name="email"
                  label="Email"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  rules={[
                    {
                      type: "email",
                      message: "Email is not valid!",
                    },
                    {
                      required: true,
                      message: "Please enter your email!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    required
                    className="rounded border-none bg-[#F7F8FA] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
                <Item
                  name="phone"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number!",
                    },
                    {
                      min: 11,
                      message: "A minimum of 11 digits",
                    },
                    {
                      max: 14,
                      message: "Phone number should not exceed 14 digits",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    addonBefore={selectBefore()}
                    type="tel"
                    required
                    className="[&>span>.ant-input-affix-wrapper]:bg-[#f7f8fa] [&>span>input]:rounded-r [&>span>input]:border-none [&>span>input]:py-2 [&>span>input]:outline-none [&>span>span>div>div.ant-select-selector]:border-none [&>span>span>input]:bg-inherit placeholder:[&>span>span>input]:text-[12px] placeholder:[&>span>span>input]:leading-[15.62px] placeholder:[&>span>span>input]:text-[#555] laptop:placeholder:[&>span>span>input]:text-[14px] laptop:placeholder:[&>span>span>input]:leading-[17.64px] [&>span>span]:border-none [&>span>span]:bg-[#d9d9d9] [&>span>span]:py-2"
                    placeholder="Enter your phone number"
                  />
                </Item>
                <Item
                  name="msg"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  label="Message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your message",
                    },
                  ]}
                >
                  <TextArea
                    style={{ height: 120, resize: "none" }}
                    className="rounded border-none bg-[#F7F8FA] outline-none"
                  />
                </Item>
                <Space className="w-full justify-end">
                  <Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="mx-auto mt-6 flex items-center justify-center bg-accent font-medium text-white laptop:p-6 "
                      loading={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                  </Item>
                </Space>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ContactPage;
