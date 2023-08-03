"use client";
import useFlutterConfig from "@hooks/useFlutterConfig";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useCallback, useMemo, useState } from "react";
import { Heart2 } from "react-iconly";

type FormValues = {
  currency: string;
  amount: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cPassword: string;
  signup: boolean;
  phoneNumber: string;
  displayIdentity: boolean;
};

const { Title, Text } = Typography;
const { Password } = Input;
const { Item, useForm } = Form;
const { Option } = Select;

const DonateToProjectPage = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [{ showPassword, formData }, setState] = useState<{
    showPassword: boolean;
    formData: FormValues;
  }>({
    showPassword: false,
    formData: {
      currency: "NGN",
      amount: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cPassword: "",
      phoneNumber: "",
      signup: false,
      displayIdentity: false,
    },
  });

  const passwordHandler = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  }, []);

  const changeHandler = (
    e: CheckboxChangeEvent | ChangeEvent<HTMLInputElement>
  ) => {
    const { type, name } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setState((prevState) => ({
      ...prevState,
      formData: { ...prevState.formData, [name!.toString()]: value },
    }));
  };

  const selectHandler = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      formData: { ...prevState.formData, currency: value },
    }));
  };

  const { currency, amount, firstname, lastname, email, phoneNumber } =
    formData;

  const customer = useMemo(
    () => ({
      email,
      phone_number: phoneNumber,
      name: `${firstname} ${lastname}`,
    }),
    [email, firstname, lastname, phoneNumber]
  );

  const obj = useMemo(
    () => ({
      currency,
      amount: Number(amount),
      customer,
      desc: "widows project",
    }),
    [currency, amount, customer]
  );

  const config = useFlutterConfig(obj);
  const handleFlutterPayment = useFlutterwave(config);

  const selectBefore = useMemo(
    () => (
      <Item name="currency" noStyle>
        <Select
          style={{ width: 100 }}
          value={formData.currency}
          onChange={selectHandler}
        >
          <Option value="NGN">NGN</Option>
          <Option value="USD">USD</Option>
        </Select>
      </Item>
    ),
    [formData.currency]
  );

  const onFinish = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal(); // this will close the modal programmatically
        router.push("/projects/donation-successful");
      },
      onClose: () => {},
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      content: "Form submission failed!",
      className: "[&>div]:bg-red-500 [&>div]:text-white",
    });
  };
  return (
    <Fragment>
      {contextHolder}
      <div className="min-h-screen pt-[7rem] tablet:pt-[10%]">
        <Card className="mx-4 max-w-xl border-none tablet:mx-auto">
          <Title className="my-4 text-[10.07px] leading-[12.69px] text-body-1 laptop:text-[12px] laptop:leading-[15px]">
            YOU ARE MAKING A DONATION TO
          </Title>
          <Space
            size="large"
            align="center"
            className="w-full flex-col items-start tablet:flex-row tablet:items-center [&>.ant-space-item]:w-full"
          >
            <Image
              src="/assets/images/happy_woman.jpg"
              alt="happy woman"
              width={200}
              height={20}
              className="w-full rounded bg-[#fff8e2] align-middle font-semibold text-body-1"
            />
            <Typography>
              <Title
                level={3}
                className=" mb-0 font-title text-[21.18px] leading-[24.23px] laptop:text-[30px] laptop:leading-[34px]"
              >
                The Widows Project
              </Title>
              <Text className=" text-[10.07px] leading-[12.69px] text-body-2 laptop:text-[12px] laptop:leading-[15px]">
                BY FAMILY WORSHIP CENTER
              </Text>
            </Typography>
          </Space>
          <Form
            name="donate_form"
            layout="vertical"
            initialValues={{
              currency: "NGN",
              displayIdentity: false,
              signup: false,
            }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
            autoComplete="off"
            className="mt-6"
          >
            <Item
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              label="Enter donation amount"
              name="amount"
              rules={[
                { required: true, message: "Please enter donation amount" },
              ]}
            >
              <Input
                addonBefore={selectBefore}
                type="number"
                required
                name="amount"
                value={formData.amount}
                onChange={changeHandler}
                placeholder="0.00"
                className="[&>span>input]:rounded-r [&>span>input]:border-none [&>span>input]:bg-[#f9f9f9] [&>span>input]:py-2 [&>span>input]:outline-none placeholder:[&>span>input]:text-[17px] placeholder:[&>span>input]:leading-[21px] placeholder:[&>span>input]:text-[#555] laptop:placeholder:[&>span>input]:text-[17px]  laptop:placeholder:[&>span>input]:leading-[21.42px] [&>span>span>div>div.ant-select-selector]:border-none [&>span>span]:rounded-l [&>span>span]:border-none [&>span>span]:bg-[#f2f2f2]"
              />
            </Item>
            <Title
              level={2}
              className="my-4 mb-0 text-[11.75px] leading-[14.81px] text-body-1 laptop:text-[14px] laptop:leading-[18px]"
            >
              Personal Information
            </Title>
            <Item name="signup" valuePropName="checked">
              <Checkbox
                onClick={passwordHandler}
                name="signup"
                value={formData.signup}
                onChange={changeHandler}
                className="text-[13px] tablet:text-[15px]"
              >
                I would like to sign up on Soower.
              </Checkbox>
            </Item>
            <Space className="w-full flex-col items-start laptop:flex-row [&>div.ant-space-item]:w-full">
              <Item
                label="First Name"
                name="firstname"
                rules={[
                  { required: true, message: "Please enter your firstname!" },
                  {
                    min: 3,
                    message: "Atleast 3 characters",
                  },
                ]}
                hasFeedback
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              >
                <Input
                  placeholder="First name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={changeHandler}
                  className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
              <Item
                label="Last name"
                name="lastname"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                  placeholder="Last name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={changeHandler}
                  className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
            </Space>
            <Space className="w-full flex-col items-start laptop:flex-row [&>div.ant-space-item]:w-full">
              <Item
                label="Email address"
                name="email"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                  placeholder="Email address"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
              <Item
                name="phoneNumber"
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
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={changeHandler}
                  pattern="^\+\d{13}|\d{11}$"
                  className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
            </Space>
            {showPassword && (
              <Space className="w-full flex-col items-start laptop:flex-row [&>div.ant-space-item]:w-full">
                <Item
                  label="Password"
                  name="password"
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
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                >
                  <Password
                    placeholder="Create a password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    pattern="^.{8,16}$"
                    className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>

                <Item
                  label="Confirm Password"
                  name="confirmPassword"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                    placeholder="Confirm password"
                    name="cPassword"
                    value={formData.cPassword}
                    onChange={changeHandler}
                    className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
              </Space>
            )}
            <Item name="displayIdentity" valuePropName="checked">
              <Checkbox
                className="text-[13px] tablet:text-[15px]"
                name="displayIdentity"
                value={formData.displayIdentity}
                onChange={changeHandler}
              >
                Don&apos;t display my name publicly on the donor list.
              </Checkbox>
            </Item>
            <Space className="w-full justify-end">
              <Item>
                <Button
                  icon={<Heart2 set="bold" size={19} />}
                  type="primary"
                  htmlType="submit"
                  className="mx-auto mt-6 flex items-center justify-center gap-2 text-[14px] font-medium leading-[17.64px] text-black laptop:p-6 "
                >
                  Donate Now
                </Button>
              </Item>
            </Space>
          </Form>
        </Card>
      </div>
    </Fragment>
  );
};

export default DonateToProjectPage;
