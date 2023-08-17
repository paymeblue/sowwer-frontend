"use client";
import { CheckCircleIcon } from "@components/assets/icons";
import { useAppDispatch } from "@hooks/useStore";
import capitalizeFirstLetters from "@lib/capitalize";
import { setCredentials } from "@store/reducers/authSlice";
import {
  useDonorRegisterMutation,
  useLoginMutation,
} from "@store/services/auth";
import { LoginRequest } from "@store/types";
import { Button, Card, Form, Input, Space, Typography, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, memo } from "react";

type LoginState = {
  email: string;
  password: string;
};
type RegisterState = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  cPassword: string;
};

type Props = {
  title: "donor" | "ministry";
  link: string;
  page: string;
  donorSignin?: boolean;
  type: "login" | "signup";
};

const AuthForm = ({ title, link, page, donorSignin, type }: Props) => {
  const { Item, useForm } = Form;
  const { Password } = Input;
  const { Title, Paragraph } = Typography;
  const [form] = useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [login, { isLoading }] = useLoginMutation();
  const [donorRegister, { isLoading: registerLoading }] =
    useDonorRegisterMutation();
  const dispatch = useAppDispatch();
  const LoginSubmit = async (values: LoginState): Promise<void> => {
    const credentials: LoginRequest = {
      identifier: values.email,
      password: values.password,
      type: title,
    };
    try {
      const res = await login(credentials).unwrap();
      const payload = {
        user: res.data.user,
        token: res.data.token.accessToken,
      };
      dispatch(setCredentials(payload));
      form.resetFields();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
      router.push(`/${page}`);
    } catch (error: any) {
      messageApi.open({
        content: `${error.message}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };
  const SignupSubmit = async (values: RegisterState): Promise<void> => {
    const credentials = {
      phone: values.phone,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      confirm_password: values.cPassword,
    };
    try {
      const res = await donorRegister(credentials).unwrap();
      form.resetFields();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
      router.push(`/${page}`);
    } catch (error: any) {
      messageApi.open({
        content: `${error.message}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };
  const onFinish = type === "login" ? LoginSubmit : SignupSubmit;
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
      <Card className="my-10 max-w-xl border-none bg-white px-4 tablet:mx-auto">
        {donorSignin ? (
          <Title
            level={4}
            className="my-12 text-center font-title text-[26px] leading-[29.75px] laptop:text-[30px] laptop:leading-[34.32px]"
          >
            Sign up as a {capitalizeFirstLetters(title)}
          </Title>
        ) : (
          <Title
            level={4}
            className="my-12 text-center font-title text-[26px] leading-[29.75px] laptop:text-[30px] laptop:leading-[34.32px]"
          >
            {capitalizeFirstLetters(title)} Sign In
          </Title>
        )}

        <Form
          form={form}
          name={`${title.toLowerCase()}_${type}_form`}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {donorSignin ? (
            <Fragment>
              <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
                <Item
                  name="firstName"
                  label="Firstname"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                  label="Lastname"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                    placeholder="Doe"
                    type="text"
                    className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
              </Space>
              <Space className="flex w-full flex-col items-start tablet:flex-row [&>div.ant-space-item]:w-full">
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
                <Item
                  name="phone"
                  label="Phone Number"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                    type="tel"
                    placeholder="+234 123 456 7890"
                    pattern="^\+\d{13}|\d{11}$"
                    className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
              </Space>
              <Space className="flex w-full flex-col items-start tablet:flex-row [&>div.ant-space-item]:w-full">
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
                    placeholder="••••••••••••••"
                    className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
              </Space>
            </Fragment>
          ) : (
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
                  pattern="^.{8,16}$"
                  placeholder="Password"
                  className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
              <div className="mb-1 flex w-full justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-semibold text-accent"
                >
                  Forgot Password?
                </Link>
              </div>
            </Fragment>
          )}
          <Item className="">
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="mx-auto mt-6 flex items-center justify-center text-sm font-medium text-black laptop:p-6"
              loading={isLoading}
            >
              {donorSignin
                ? registerLoading
                  ? "Submitting"
                  : "Signup"
                : isLoading
                ? "Submitting"
                : "Sign In"}
            </Button>
          </Item>
          {donorSignin ? (
            <Paragraph className="mt-6 text-center text-xs text-body-1">
              Already have an account?
              <Link
                href={`/${link}`}
                className="text-xs font-semibold text-accent"
              >
                &nbsp; Sign In
              </Link>
            </Paragraph>
          ) : (
            <Paragraph className="mt-6 text-center text-xs text-body-1">
              Don't have an account?
              <Link
                href={`/${link}`}
                className="text-xs font-semibold text-accent"
              >
                &nbsp; Sign Up
              </Link>
            </Paragraph>
          )}
        </Form>
      </Card>
    </Fragment>
  );
};

export default memo(AuthForm);
