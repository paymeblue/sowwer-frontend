"use client";
import { CheckCircleIcon } from "@components/assets/icons";
import { useMinistrySignupMutation } from "@store/services/auth";
import { MinistrySignupRequest } from "@store/types";
import { Button, Form, Space, Steps, Typography, message, theme } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "react-iconly";
import MinistryDetails from "./MinistryDetails";
import PersonalInfo from "./PersonalInfo";
import Terms from "./Terms";

type FormDataFields = {
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  adminPassword: string;
  adminPhoneNumber: string;
  adminRole: string;
  ministryAddressLine: string;
  ministryEmail: string;
  ministryMsg: string;
  ministryName: string;
  ministryPhoneNumber: string;
  ministryType: string;
  ministryWebsite: string;
  state: string;
  cacDocument: any;
};
const { useForm } = Form;
const SignupStep = () => {
  const { token } = theme.useToken();
  const { Text } = Typography;
  const [current, setCurrent] = useState(0);
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const path = `${pathname}?${searchParam.toString()}`;
  const router = useRouter();
  const [form] = useForm();
  const steps = [
    {
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Ministry Details
        </Text>
      ),
      content: <MinistryDetails form={form} />,
    },
    {
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Personal Information
        </Text>
      ),
      content: <PersonalInfo form={form} />,
    },
    {
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Terms and Conditions
        </Text>
      ),
      content: <Terms form={form} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const prevHandler = () => {
    prev();
    router.back();
  };
  function nextHandler() {
    if (current === 0) {
      router.push(`/auth/signup/ministry?step=personal-information`);
    } else if (current === 1) {
      router.push(`/auth/signup/ministry?step=terms`);
    }
    next();
  }
  const [messageApi, contextHolder] = message.useMessage();
  const [ministrySignup, { isLoading }] = useMinistrySignupMutation();

  const onFormFinish = async (): Promise<void> => {
    const values: FormDataFields = form.getFieldsValue(true);
    const {
      adminEmail,
      adminFirstName,
      adminLastName,
      adminPassword,
      adminPhoneNumber,
      adminRole,
      ministryAddressLine,
      ministryEmail,
      ministryMsg,
      ministryName,
      ministryPhoneNumber,
      ministryType,
      ministryWebsite,
      state,
      cacDocument,
    } = values;
    console.log(values.cacDocument[0].thumbUrl);
    try {
      const credentials: MinistrySignupRequest = {
        ministryType,
        ministryPhone: ministryPhoneNumber,
        ministryEmail,
        ministryName,
        projectDescription: ministryMsg,
        ministryState: state,
        ministrySocialLink: ministryWebsite,
        ministryAddress: ministryAddressLine,
        cacDocument: cacDocument[0].thumbUrl,
        phone: adminPhoneNumber,
        email: adminEmail,
        firstName: adminFirstName,
        lastName: adminLastName,
        role: adminRole,
        password: adminPassword,
      };
      const res = await ministrySignup(credentials).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });

      form.resetFields();
      router.push("/auth/signup/ministry?step=registration-complete");
    } catch (error: any) {
      console.log(error);
      messageApi.open({
        content: `${error.message}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };
  return (
    <section className="mt-8">
      {contextHolder}
      <Steps
        current={current}
        items={items}
        progressDot
        className="my-4 laptop:my-auto"
      />
      <Form.Provider onFormFinish={onFormFinish}>
        <div style={contentStyle}>{steps[current].content}</div>
        <Space className="my-6 flex w-full items-center justify-between">
          {current > 0 && (
            <Button
              onClick={prevHandler}
              size="large"
              className={`flex items-center justify-center bg-accent text-[13px] font-semibold leading-[16.38px] text-white
                ${
                  path === "/auth/signup/ministry?step=registration-complete"
                    ? "hidden"
                    : ""
                }
                `}
              icon={<ArrowLeft set="light" />}
            >
              Back
            </Button>
          )}
          {path === "/auth/signup/ministry?"
            ? null
            : current < steps.length - 1 && (
                <Button
                  onClick={nextHandler}
                  type="primary"
                  size="large"
                  className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
                >
                  <Space className="w-full ">
                    Continue
                    <ArrowRight set="light" />
                  </Space>
                </Button>
              )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
              onClick={() => {
                form.submit();
              }}
              className={`bg-accent text-[13px] font-semibold leading-[16.38px] text-white
                    ${
                      path ===
                      "/auth/signup/ministry?step=registration-complete"
                        ? "hidden"
                        : ""
                    }
                  `}
            >
              {isLoading ? "Sending..." : "Done"}
            </Button>
          )}
        </Space>
      </Form.Provider>
    </section>
  );
};

export default SignupStep;
