import { CheckCircleIcon } from "@components/assets/icons";
import { useUpdateUserProfileMutation } from "@store/services/user";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { Fragment } from "react";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

const { Title, Paragraph } = Typography;
const { Item, useForm } = Form;
const { Password } = Input;

const PersonalDetails = (): JSX.Element => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const onFinish = async (values: State): Promise<void> => {
    try {
      const res = await updateUserProfile(values).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472]-800 [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
      form.resetFields();
    } catch (error) {
      messageApi.open({
        content: `${error}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
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
      <Card className="mx-auto my-8 border-none bg-white">
        <Row gutter={[24, 32]}>
          <Col flex={2}>
            <Typography>
              <Title
                level={4}
                className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
              >
                Personal Details
              </Title>
              <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
                Administrator&apos;s personal/account information.
              </Paragraph>
            </Typography>
          </Col>
          <Col flex={1}>
            <Form
              form={form}
              name="personal_details_form"
              layout="vertical"
              className=""
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
                <Item
                  name="firstName"
                  label="First Name"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  rules={[
                    { required: true, message: "Please enter your firstname!" },
                    {
                      min: 3,
                      message: "Atleast 3 characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="John"
                    type="text"
                    className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
                <Item
                  name="lastName"
                  label="Last Name"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  rules={[
                    { required: true, message: "Please enter your lastname!" },
                    {
                      min: 3,
                      message: "Atleast 3 characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Smith"
                    type="text"
                    className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
              </Space>
              <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
                <Item
                  name="email"
                  label="Email address"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                    placeholder="johnsmith@gmail.com"
                    type="email"
                    className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
                <Item
                  name="phone"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                >
                  <Input
                    type="tel"
                    placeholder="+234 123 456 7890"
                    pattern="^\+\d{13}|\d{11}$"
                    className="rounded border-none bg-[#f9f9f9] py-3 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px] [&>input]:bg-inherit"
                  />
                </Item>
              </Space>
              <Item
                name="password"
                label="Password"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                extra="Password must be at least 8 characters"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 8,
                    message: "Password too short!",
                  },
                  {
                    max: 16,
                    message: "Password should not exceed 16 characters",
                  },
                ]}
                hasFeedback
              >
                <Password
                  placeholder="••••••••••••••"
                  pattern="^.{8,16}$"
                  className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
              <Space className="flex w-full justify-end">
                <Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
                    loading={isLoading}
                  >
                    {isLoading ? "Saving" : "Save"}
                  </Button>
                </Item>
              </Space>
            </Form>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default PersonalDetails;
