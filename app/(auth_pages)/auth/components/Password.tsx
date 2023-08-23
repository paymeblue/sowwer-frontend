"use client";
import { CheckCircleIcon } from "@components/assets/icons";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@store/services/auth";
import { Button, Card, Form, Input, Typography, message } from "antd";
// import { useRouter } from "next/navigation";
import { Fragment } from "react";

type Reset = {
  password: string;
  cPassword: string;
};

type Forgot = {
  email: string;
};

const { Item, useForm } = Form;
const { Password } = Input;
const { Title, Text } = Typography;

const PasswordPage = ({
  forgotPassword,
  resetPassword,
  token,
}: {
  forgotPassword?: boolean;
  resetPassword?: boolean;
  token?: string | null;
}) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  // const router = useRouter();
  const [forgotPasswordData, { isLoading }] = useForgotPasswordMutation();
  const [resetPasswordData, { isLoading: resetLoading }] =
    useResetPasswordMutation();
  const onFinish1 = async (values: Forgot): Promise<void> => {
    try {
      const res = await forgotPasswordData(values).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
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
  const onFinish2 = async (values: Reset): Promise<void> => {
    try {
      const body = {
        token,
        password: values.password,
        password_confirm: values.cPassword,
      };
      const res = await resetPasswordData(body).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
      form.resetFields();
      // router.push("/");
    } catch (error) {
      messageApi.open({
        content: `${error}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };
  const onFinish: any = forgotPassword ? onFinish1 : onFinish2;
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
                  name="cPassword"
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
                    loading={resetLoading}
                  >
                    {resetLoading ? "Resetting" : "Reset Password"}
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
