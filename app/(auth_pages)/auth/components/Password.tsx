"use client";
import { CheckCircleIcon } from "@components/assets/icons";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

type Reset = {
  password: string;
  cPassword: string;
};

type Forgot = {
  email: string;
};

type State = Forgot | Reset;

const { Item, useForm } = Form;
const { Password } = Input;
const { Title, Text } = Typography;

const PasswordPage = ({
  forgotPassword,
  resetPassword,
}: {
  forgotPassword?: boolean;
  resetPassword?: boolean;
}) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onFinish = async (values: State): Promise<void> => {
    setIsLoading(true);
    console.log("Form data: ", values);
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulating an asynchronous operation
    form.resetFields();
    setIsLoading(false);
    messageApi.open({
      content: forgotPassword
        ? `A password reset link has been sent to your mail!`
        : resetPassword
        ? `Passord reset successful!`
        : null,
      className: "[&>div]:bg-[#17B472] [&>div]:text-white",
      icon: <CheckCircleIcon />,
    });
    forgotPassword
      ? router.push("/auth/reset-password")
      : resetPassword
      ? router.push("/")
      : null;
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
      <Fragment>
        <Card className="my-10 max-w-xl border-none bg-white px-4 tablet:mx-auto">
          <Typography className="mb-12 text-center">
            <Title
              level={4}
              className="mb-0 mt-12 text-center font-title text-[26px] leading-[29.75px] laptop:text-[30px] laptop:leading-[34.32px]"
            >
              {forgotPassword
                ? "Forgot Password?"
                : resetPassword
                ? "Reset Password"
                : null}
            </Title>
            <Text className="font-body-1 text-[12px] leading-[15.75px] laptop:text-[13px] laptop:leading-[16.38px]">
              {forgotPassword
                ? "Enter your email address below and a rest link will be sent to you"
                : resetPassword
                ? "Please enter your new password below"
                : null}
            </Text>
          </Typography>
          <Form
            form={form}
            name={
              forgotPassword ? "forgot_password_form" : "reset_password_form"
            }
            layout="vertical"
            className=""
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {forgotPassword ? (
              <Fragment>
                <Item
                  name="email"
                  label="Email Address"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                    placeholder="john@gmail.com"
                    type="email"
                    className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
                <Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    className="mx-auto mt-3 flex items-center justify-center text-sm font-medium text-black laptop:p-6"
                    loading={isLoading}
                  >
                    {isLoading ? "Sending" : "Send Email"}
                  </Button>
                </Item>
              </Fragment>
            ) : resetPassword ? (
              <Fragment>
                <Item
                  name="password"
                  label="Password"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                    placeholder="Password"
                    pattern="^.{8,16}$"
                    className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
                <Item
                  name="c_password"
                  label="Confirm Password"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Password
                    placeholder="Confirm Password"
                    className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
                <Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    className="mx-auto mt-3 flex items-center justify-center text-sm font-medium text-black laptop:p-6"
                    loading={isLoading}
                  >
                    {isLoading ? "Resetting" : "Reset Password"}
                  </Button>
                </Item>
              </Fragment>
            ) : null}
          </Form>
        </Card>
      </Fragment>
    </Fragment>
  );
};

export default PasswordPage;
