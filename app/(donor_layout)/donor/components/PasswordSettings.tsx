import { CheckCircleIcon } from "@components/assets/icons";
import { useUpdateUserPasswordMutation } from "@store/services/user";
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

import { Fragment, useEffect, useState } from "react";

type State = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const { Title, Paragraph } = Typography;
const { Item, useForm } = Form;
const { Password } = Input;

const PasswordSettings = () => {
  const [form] = useForm();
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  const [messageApi, contextHolder] = message.useMessage();
  const [updateUserPassword, { isLoading, isSuccess }] =
    useUpdateUserPasswordMutation();

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values, form]);

  const onFinish = async (values: State): Promise<void> => {
    try {
      const res = await updateUserPassword(values).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472]-800 [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
      // form.resetFields();
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
      <Card className="mx-auto my-8 w-full border-none bg-white">
        <Row gutter={[24, 32]}>
          <Col flex={2}>
            <Title
              level={3}
              className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
            >
              Password Settings
            </Title>
            <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
              Change your current password.
            </Paragraph>
          </Col>
          <Col flex={1}>
            <Form
              form={form}
              name="user_password_form"
              layout="vertical"
              className=""
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
            >
              <Item
                name="currentPassword"
                label="Current Password"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                extra="Password must be at least 8 characters"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
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
                name="newPassword"
                label="New Password"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                extra="Password must be at least 8 characters"
                rules={[
                  {
                    required: true,
                    message: "Please input new password!",
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
                name="confirmPassword"
                label="Confirm new Password"
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
                    className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                    loading={isLoading}
                    disabled={!submittable}
                  >
                    {isLoading ? "Saving" : isSuccess ? "Saved" : "Save"}
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

export default PasswordSettings;
