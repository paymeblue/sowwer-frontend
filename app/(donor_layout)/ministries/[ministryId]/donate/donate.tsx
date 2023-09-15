"use client";
import PlaceholderImage from "components/PlaceholderImage";
import AmountInput from "@components/ui/amountField";
import { CheckCircleIcon } from "components/assets/icons";
import { useAuth } from "hooks/useAuth";
import useFlutterConfig, {
  useFlutterConfigReccuring,
} from "hooks/useFlutterConfig";
import { useAppDispatch } from "hooks/useStore";
import capitalizeFirstLetters from "lib/capitalize";
import { setCredentials } from "store/reducers/authSlice";
import {
  useInitiatePaymentToMinistryAuthMutation,
  useInitiatePaymentToMinistryUnauthMutation,
} from "store/services/auth";
import { useGetMinistryDetailsQuery } from "store/services/ministries";
import { useVerifyMinistryPaymentMutation } from "store/services/payouts";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Heart2 } from "react-iconly";

type State = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  anonymous: boolean;
  createAccount: boolean;
  amount: { number: number };
  mode: "one-time" | "recurring";
  password: string;
  confirm_password: string;
  currency: "NGN" | "USD";
  interval: "monthly" | "quarterly" | "yearly";
};

type MinistryData = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  website: string;
  postal_code: string | null;
  cac_document: string;
  ministryType: string;
  createdAt: string;
  donation_description: string;
  about: string;
  logo: string;
};

const { Title } = Typography;
const { Password } = Input;
const { Item, useForm } = Form;
const { Option } = Select;

const DonateToMinistryPage = ({ ministryId }: { ministryId: string }) => {
  const [form] = useForm();
  const { user } = useAuth();
  const router = useRouter();
  const [ref, setRef] = useState<string>("");
  const [planId, setPlanId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { data: ministryData } = useGetMinistryDetailsQuery(ministryId);
  let ministry: MinistryData | undefined;
  const [
    initiatePaymentToMinistryAuth,
    { data: authData, isLoading: paymentAuthLoading },
  ] = useInitiatePaymentToMinistryAuthMutation();
  const [
    initiatePaymentToMinistryUnauth,
    { data: unauthData, isLoading: paymentUnauthLoading },
  ] = useInitiatePaymentToMinistryUnauthMutation();
  let rtkHook: any;
  if (user) {
    rtkHook = initiatePaymentToMinistryAuth;
  } else {
    rtkHook = initiatePaymentToMinistryUnauth;
  }
  const data = user ? authData?.data : unauthData?.data.donation;

  if (ministryData) {
    ministry = ministryData.data;
  }
  const [verifyMinistryPayment] = useVerifyMinistryPaymentMutation();

  useEffect(() => {
    if (data) {
      const plan = data.plan_id;
      setRef(data.txn_reference);
      setPlanId(plan);
    }
  }, [data]);
  useEffect(() => {
    if (ref) {
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
            router.push("/ministries/donation-successful");
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
    }
  }, [ref]);

  const createAccount = Form.useWatch("createAccount", form);
  const mode = Form.useWatch("mode", form);

  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    currency: "NGN",
    amount: { number: 0 },
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mode: "one-time",
    interval: "monthly",
  });

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

  const obj = {
    currency,
    amount: amount.number,
    customer,
    desc: ministry ? ministry.name : "Ministry Donation",
    txnRef: ref,
  };
  const objRecurring = {
    currency,
    amount: amount.number,
    customer,
    desc: ministry ? ministry.name : "Ministry Donation",
    txnRef: ref,
    payment_plan: `${planId}`,
  };

  const config = useFlutterConfig(obj);
  const configRecurring = useFlutterConfigReccuring(objRecurring);
  const configType = mode === "recurring" ? configRecurring : config;

  const handleFlutterPayment = useFlutterwave(configType);
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

  const onFinish = async (values: State) => {
    try {
      let data;
      const { amount, mode, ...rest } = values;
      if (!user && createAccount) {
        data = {
          id: ministryId,
          amount: amount.number,
          payment_mode: mode,
          ...rest,
        };
      } else if (user) {
        data = {
          id: ministryId,
          amount: amount.number,
          payment_mode: mode,
          ...rest,
        };
      } else if (!user && !createAccount) {
        data = {
          id: ministryId,
          amount: amount.number,
          payment_mode: mode,
          ...rest,
        };
      }
      const res = await rtkHook(data).unwrap();
      if (mode === "recurring" && "token" in res.data) {
        const payload = {
          user: res.data.user,
          token: res.data.token.accessToken,
          refreshToken: res.data.token.refreshToken,
        };
        dispatch(setCredentials(payload));
      }
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
  const plainOptions = [
    { label: "One Time", value: "one-time" },
    { label: "Recurring", value: "recurring" },
  ];

  const options = [
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Yearly", value: "yearly" },
  ];

  return (
    <Fragment>
      {contextHolder}
      <div className="min-h-screen pt-[7rem] tablet:pt-[10%]">
        <Card className="mx-4 max-w-2xl border-none tablet:mx-auto">
          <Title className="my-4 text-[10.07px] leading-[12.69px] text-body-1 laptop:text-[12px] laptop:leading-[15px]">
            YOU ARE MAKING A DONATION TO
          </Title>
          {ministry ? (
            <Space align="center" className="my-4">
              {ministry.logo ? (
                <Image
                  src={ministry.logo}
                  alt={ministry.name}
                  width={200}
                  height={100}
                  className="h-[100px] w-[200px]  rounded bg-[#fff8e2] align-middle font-semibold text-body-1"
                />
              ) : (
                <PlaceholderImage />
              )}
              <Title
                level={2}
                className=" mb-0 font-title text-[21.18px] leading-[24.23px] laptop:text-[30px] laptop:leading-[34px]"
              >
                {capitalizeFirstLetters(ministry.name)}
              </Title>
            </Space>
          ) : (
            `N/A`
          )}
          <Form
            name="ministry_donation_form"
            layout="vertical"
            initialValues={{
              currency: "NGN",
              anonymous: false,
              createAccount: false,
              mode: "one-time",
            }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
            autoComplete="off"
            className="mt-6"
            onValuesChange={(changedValues, allValues) => {
              setFormData((prev) => ({ ...prev, ...changedValues }));
            }}
          >
            <Title
              level={2}
              className="my-4 mb-0 text-[12px] font-bold leading-[15.18px] text-body-1 laptop:text-[14px] laptop:leading-[17.64px]"
            >
              Donation Type
            </Title>
            <Item name="mode" className="[&>div>div.ant-form-item-label]:p-0">
              <Radio.Group
                options={plainOptions}
                className="[&>label>.ant-radio-checked>.ant-radio-inner]:border-primary [&>label>.ant-radio-checked>.ant-radio-inner]:bg-primary"
              />
            </Item>
            {mode === "recurring" && (
              <Item
                name="interval"
                className="[&>div>div.ant-form-item-label]:p-0"
                rules={[
                  { required: true, message: "Please select a frequency plan" },
                ]}
              >
                <Radio.Group
                  options={options}
                  optionType="button"
                  buttonStyle="solid"
                  size="middle"
                />
              </Item>
            )}
            <Item
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              label="Enter donation amount"
              name="amount"
              rules={[
                { required: true, message: "Please enter donation amount" },
              ]}
            >
              <AmountInput
                props={{
                  addonBefore: selectBefore,
                  required: true,
                  className:
                    "[&>span>input]:rounded-r [&>span>input]:border-none [&>span>input]:bg-[#f9f9f9] [&>span>input]:py-2 [&>span>input]:outline-none placeholder:[&>span>input]:text-[17px] placeholder:[&>span>input]:leading-[21px] placeholder:[&>span>input]:text-[#555] laptop:placeholder:[&>span>input]:text-[17px]  laptop:placeholder:[&>span>input]:leading-[21.42px] [&>span>span>div>div.ant-select-selector]:border-none [&>span>span]:rounded-l [&>span>span]:border-none [&>span>span]:bg-[#f2f2f2]",
                }}
              />
            </Item>
            {user ? null : (
              <Fragment>
                <Title
                  level={2}
                  className="my-4 mb-0 text-[12px] font-bold leading-[15.18px] text-body-1 laptop:text-[14px] laptop:leading-[17.64px]"
                >
                  Personal Information
                </Title>
                <Item name="createAccount" valuePropName="checked">
                  {mode === "one-time" ? (
                    <Checkbox className="text-[13px] tablet:text-[15px]">
                      I would like to sign up on Soower.
                    </Checkbox>
                  ) : (
                    <Alert
                      type="info"
                      message=" You are required to create an account on Soower for recurring
              donations."
                      banner
                      className="mt-4 rounded-lg text-xs text-accent"
                    />
                  )}
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
                      pattern="^\+\d{13}|\d{11}$"
                      className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                    />
                  </Item>
                </Space>
                {(createAccount || mode === "recurring") && (
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
                      extra="Password must be at least 8 characters"
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
                  className="mx-auto mt-6 flex items-center justify-center gap-2 text-sm font-medium text-black laptop:p-6 "
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

export default DonateToMinistryPage;
