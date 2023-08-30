"use client";
import PlaceholderImage from "@components/PlaceholderImage";
import { CheckCircleIcon } from "@components/assets/icons";
import { useAuth } from "@hooks/useAuth";
import useFlutterConfig from "@hooks/useFlutterConfig";
import capitalizeFirstLetters from "@lib/capitalize";
import {
  useInitiatePaymentToProjectAuthMutation,
  useInitiatePaymentToProjectUnauthMutation,
} from "@store/services/auth";
import { useVerifyMinistryPaymentMutation } from "@store/services/payouts";
import { useGetProjectDetailsQuery } from "@store/services/projects";
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
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import { Heart2 } from "react-iconly";

type State = {
  currency: string;
  amount: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
  createAccount: boolean;
  phone: string;
  anonymous: boolean;
};
type ProjectData = {
  title: string;
  targetAmount: string;
  category: string;
  image: string | null;
  description: string | null;
  link: string;
  organisedById: string;
  organisedBy: string;
  amountRaised: string;
  donors: string;
  donationPercent: string;
};
const { Title, Text } = Typography;
const { Password } = Input;
const { Item, useForm } = Form;
const { Option } = Select;

const DonateToProjectPage = ({ id }: { id: string }) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { user } = useAuth();
  const { data: projectData } = useGetProjectDetailsQuery(id);
  const [
    initiatePaymentToProjectAuth,
    { data: authData, isLoading: paymentAuthLoading },
  ] = useInitiatePaymentToProjectAuthMutation();
  const [
    initiatePaymentToProjectUnauth,
    { data: unauthData, isLoading: paymentUnauthLoading },
  ] = useInitiatePaymentToProjectUnauthMutation();
  let rtkHook: any;
  if (user) {
    rtkHook = initiatePaymentToProjectAuth;
  } else {
    rtkHook = initiatePaymentToProjectUnauth;
  }
  const data = user ? authData?.data : unauthData?.data.donation;
  let project: ProjectData | undefined;
  if (projectData) {
    project = projectData.data;
  }
  // const [txnRef, setTxnRef] = useState<string>("");
  const [formData, setFormData] = useState({
    currency: "NGN",
    amount: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const createAccount = Form.useWatch("createAccount", form);

  const { currency, amount, firstName, lastName, email, phone } = formData;

  const customer = user
    ? {
        email: user.email,
        phone_number: user.phone,
        name: `${user.firstName} ${user.lastName}`,
      }
    : {
        email,
        phone_number: phone,
        name: `${firstName} ${lastName}`,
      };

  const [verifyMinistryPayment] = useVerifyMinistryPaymentMutation();
  const txnRefHandler = () => {
    let tnxRef;
    if (data?.txn_reference) {
      tnxRef = data.txn_reference;
    }
    return tnxRef;
  };
  const ref = txnRefHandler();
  console.log(ref);

  const obj = {
    currency,
    amount: Number(amount),
    customer,
    desc: project ? project.title : "Project Donation",
    txnRef: ref!,
  };

  const config = useFlutterConfig(obj);
  console.log(config);
  const handleFlutterPayment = useFlutterwave(config);

  const selectBefore = useMemo(
    () => (
      <Item name="currency" noStyle>
        <Select style={{ width: 100 }}>
          <Option value="NGN">NGN</Option>
          <Option value="USD">USD</Option>
        </Select>
      </Item>
    ),
    []
  );
  const callback = async (values: State) => {
    let data;
    const { amount, ...rest } = values;
    if (!user && createAccount) {
      data = {
        id,
        amount: +amount,
        ...rest,
      };
    } else if (user) {
      data = {
        id,
        amount: +amount,
        ...rest,
      };
    } else if (!user && !createAccount) {
      data = {
        id,
        amount: +amount,
        ...rest,
      };
    }
    await rtkHook(data).unwrap();
    // console.log(res);
    // setTxnRef(res.data.donation.txn_reference);
  };

  const onFinish = async (values: State) => {
    const { currency, amount, firstName, lastName, email, phone } = values;
    setFormData((prev) => ({
      ...prev,
      currency,
      amount,
      firstName,
      lastName,
      email,
      phone,
    }));
    try {
      await callback(values);
      handleFlutterPayment({
        callback: async (response) => {
          try {
            const res = await verifyMinistryPayment({
              txn_id: response.transaction_id.toString(),
              txn_reference: response.tx_ref,
            }).unwrap();
            messageApi.open({
              content: `${res.message}`,
              className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
              icon: <CheckCircleIcon />,
            });
            router.push("/projects/donation-successful");
          } catch (error) {
            messageApi.open({
              content: `${error}`,
              className: `[&>div]:bg-red-800 [&>div]:text-white`,
            });
          }
          closePaymentModal();
        },
        onClose: () => {},
      });
    } catch (error: any) {
      messageApi.open({
        content: `${error.message}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
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
          {project ? (
            <Space
              size="large"
              align="center"
              className="w-full flex-col items-start tablet:flex-row tablet:items-center [&>.ant-space-item]:w-full"
            >
              {project.image ? (
                <Image
                  src={project.image ?? ""}
                  alt={project.title}
                  width={200}
                  priority
                  height={100}
                  className="h-[100px] w-[200px]  rounded bg-[#fff8e2] align-middle font-semibold text-body-1"
                />
              ) : (
                <PlaceholderImage />
              )}
              <Typography>
                <Title
                  level={3}
                  className=" mb-0 font-title text-[21.18px] leading-[24.23px] laptop:text-[30px] laptop:leading-[34px]"
                >
                  {capitalizeFirstLetters(project.title)}
                </Title>
                <Text className=" text-[10.07px] uppercase leading-[12.69px] text-body-2 laptop:text-[12px] laptop:leading-[15px]">
                  {project.organisedBy}
                </Text>
              </Typography>
            </Space>
          ) : null}
          <Form
            name="project_donation_form"
            layout="vertical"
            initialValues={{
              currency: "NGN",
              anonymous: false,
              createAccount: false,
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
                placeholder="0.00"
                className="[&>span>input]:rounded-r [&>span>input]:border-none [&>span>input]:bg-[#f9f9f9] [&>span>input]:py-2 [&>span>input]:outline-none placeholder:[&>span>input]:text-[17px] placeholder:[&>span>input]:leading-[21px] placeholder:[&>span>input]:text-[#555] laptop:placeholder:[&>span>input]:text-[17px]  laptop:placeholder:[&>span>input]:leading-[21.42px] [&>span>span>div>div.ant-select-selector]:border-none [&>span>span]:rounded-l [&>span>span]:border-none [&>span>span]:bg-[#f2f2f2]"
              />
            </Item>
            {user ? null : (
              <Fragment>
                <Title
                  level={2}
                  className="my-4 mb-0 text-[11.75px] leading-[14.81px] text-body-1 laptop:text-[14px] laptop:leading-[18px]"
                >
                  Personal Information
                </Title>
                <Item name="createAccount" valuePropName="checked">
                  <Checkbox className="text-[13px] tablet:text-[15px]">
                    I would like to sign up on Soower.
                  </Checkbox>
                </Item>
                <Space className="w-full flex-col items-start laptop:flex-row [&>div.ant-space-item]:w-full">
                  <Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your firstname!",
                      },
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
                      className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                    />
                  </Item>
                  <Item
                    label="Last name"
                    name="lastName"
                    className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your lastname!",
                      },
                      {
                        min: 3,
                        message: "Atleast 3 characters",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Last name"
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
                      className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
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
                      type="tel"
                      placeholder="Phone Number"
                      pattern="^\+\d{13}|\d{11}$"
                      className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                    />
                  </Item>
                </Space>
                {createAccount && (
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
                        pattern="^.{8,16}$"
                        className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                      />
                    </Item>

                    <Item
                      label="Confirm Password"
                      name="confirm_password"
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
                        className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                      />
                    </Item>
                  </Space>
                )}
              </Fragment>
            )}
            <Item name="anonymous" valuePropName="checked">
              <Checkbox className="text-[13px] tablet:text-[15px]">
                Don&apos;t display my name publicly on the donor list.
              </Checkbox>
            </Item>
            <Space className="w-full justify-end">
              <Item>
                <Button
                  icon={<Heart2 set="bold" size={19} />}
                  type="primary"
                  htmlType="submit"
                  loading={paymentAuthLoading || paymentUnauthLoading}
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
