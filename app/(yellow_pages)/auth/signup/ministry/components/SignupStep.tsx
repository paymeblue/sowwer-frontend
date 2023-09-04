"use client";
import { CheckCircleIcon } from "@components/assets/icons";
import { useAppDispatch } from "@hooks/useStore";
// import { readAsDataURL } from "@lib/convertPdf";
import { setCredentials } from "@store/reducers/authSlice";
import { useMinistrySignupMutation } from "@store/services/auth";
import { MinistrySignupRequest } from "@store/types";
import { Form, Steps, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const { Text } = Typography;
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent((prev) => prev + 1);
  };
  const prev = () => {
    setCurrent((prev) => prev - 1);
  };
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const steps = [
    {
      key: "1",
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Ministry Details
        </Text>
      ),
      content: <MinistryDetails form={form} next={next} />,
    },
    {
      key: "2",
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Personal Information
        </Text>
      ),
      content: <PersonalInfo form={form} next={next} prev={prev} />,
    },
    {
      key: "3",
      title: (
        <Text className="text-[11.42px] font-semibold leading-[14.39px] laptop:text-[12px] laptop:leading-[15.12px]">
          Terms and Conditions
        </Text>
      ),
      content: <Terms form={form} prev={prev} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.key, title: item.title }));

  const [messageApi, contextHolder] = message.useMessage();
  const [ministrySignup] = useMinistrySignupMutation();

  console.log(base64Data);
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
    try {
      const fileToLoad = cacDocument[0];
      if (fileToLoad.type === "application/pdf") {
        // file = await readAsDataURL(fileToLoad);
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result as string;
          setBase64Data(base64String);
        };
        reader.readAsDataURL(fileToLoad);
      }
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
      const payload = {
        user: res.data.user,
        token: res.data.token.accessToken,
        refreshToken: res.data.token.refreshToken,
      };
      dispatch(setCredentials(payload));
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });

      // form.resetFields();
      router.push("/auth/signup/ministry?step=registration-complete");
    } catch (error: any) {
      console.log(error);
      messageApi.open({
        content: `${error.message}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };

  return (
    <section className="clear-both mt-8">
      {contextHolder}
      <Steps
        current={current}
        items={items}
        progressDot
        className="my-4 laptop:my-auto"
      />
      <Form.Provider onFormFinish={onFormFinish}>
        <section>{steps[current].content}</section>
      </Form.Provider>
    </section>
  );
};

export default SignupStep;
