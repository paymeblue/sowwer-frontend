"use client";
import { CheckCircleIcon } from "@components/assets/icons";
import FrameIcon from "@components/assets/icons/Frame";
import { useWidowMutation } from "@store/services/join-soower";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { ArrowRight } from "react-iconly";

type State1 = {
  name: string;
  email: string;
  phone: string;
  address: string;
  christianity: boolean;
  declaration: boolean;
  duration: string;
  timestamp: "month" | "year";
  age: string;
  kids: boolean;
};
type RegistrerInfo = {
  registrerName: string;
  registrerEmail: string;
  registrerPhone: string;
};
type State2 = State1 & RegistrerInfo;

const { Item, useForm } = Form;
const { Title, Text } = Typography;
const { Option } = Select;

const suffixSelector = (
  <Item name="timestamp" noStyle>
    <Select style={{ width: 100 }}>
      <Option value="month">Months</Option>
      <Option value="year">Years</Option>
    </Select>
  </Item>
);

const WidowForm = ({ prev }: { prev: () => void }) => {
  const [form] = useForm();
  const [regStatus, setRegStatus] = useState("Yes");
  const [submittable, setSubmittable] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  // Watch all values
  const values = Form.useWatch([], form);

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

  const changeHandler = (e: RadioChangeEvent) => {
    if (e.target.value === "No") {
      setRegStatus("No");
    } else {
      setRegStatus("Yes");
    }
  };

  const beginingPart = () => (
    <Fragment>
      <Item
        name="name"
        label="Name"
        className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
        rules={[
          { required: true, message: "Please enter your name!" },
          {
            min: 3,
            message: "Atleast 3 characters",
          },
        ]}
        hasFeedback
      >
        <Input
          placeholder="name"
          type="text"
          className="rounded border-none bg-[#f9f9f9] py-2 outline-none  [&>input]:bg-inherit"
        />
      </Item>
      <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
        <Item
          name="age"
          label="How old are you? "
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          rules={[
            {
              type: "number",
              message: "Age is not valid!",
            },
            {
              required: true,
              message: "Please enter your age!",
            },
          ]}
          hasFeedback
        >
          <InputNumber
            placeholder="Age"
            type="number"
            className="w-full rounded border-none bg-[#f9f9f9] py-[4px] outline-none [&>input]:bg-inherit"
          />
        </Item>
        <Item
          name="duration"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          label="How long have you been a widow?"
          rules={[
            {
              required: true,
              message: "Please enter how long you have been a widow!",
            },
          ]}
          hasFeedback
        >
          <InputNumber
            type="number"
            placeholder="No of months/years"
            className=" w-full border-none bg-[#f9f9f9] py-[4px] outline-none [&>div>div.ant-input-number]:bg-[#f9f9f9] [&>div>div]:border-none [&>div>div]:bg-[#f9f9f9] [&>input]:bg-inherit"
            addonAfter={suffixSelector}
          />
        </Item>
      </Space>
      <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
        <Item
          name="email"
          label="Email address"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          rules={[
            {
              type: "email",
              message: "Email is not valid!",
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="johnsmith@gmail.com"
            type="email"
            className="rounded border-none bg-[#f9f9f9] py-2 outline-none  [&>input]:bg-inherit"
          />
        </Item>
        <Item
          name="phone"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          label="Phone Number"
          rules={[
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
            className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit"
          />
        </Item>
      </Space>
      <Item
        name="address"
        label="Address Line"
        className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
        rules={[
          {
            required: true,
            message: "Please enter the address",
          },
        ]}
      >
        <Input
          placeholder="Address line"
          type="text"
          required
          className="rounded border-none bg-[#f9f9f9] py-2 outline-none"
        />
      </Item>
      <Item
        label={
          <Text
            className="text-[12.75px] font-semibold leading-[14.81px] text-body-1
            laptop:text-[14px] laptop:leading-[18px]"
          >
            Are you a Christian?
          </Text>
        }
        name="christianity"
        className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
        rules={[
          {
            required: true,
            message: "Please select",
          },
        ]}
      >
        <Radio.Group
          name="radiogroup"
          className="[&>label>.ant-radio-checked>.ant-radio-inner]:border-primary [&>label>.ant-radio-checked>.ant-radio-inner]:bg-primary"
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Item>
      <Item
        label={
          <Text
            className="text-[12.75px] font-semibold leading-[14.81px] text-body-1
            laptop:text-[14px] laptop:leading-[18px]"
          >
            Do you have kids?
          </Text>
        }
        name="kids"
        className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
        rules={[
          {
            required: true,
            message: "Please select",
          },
        ]}
      >
        <Radio.Group
          name="radiogroup"
          className="[&>label>.ant-radio-checked>.ant-radio-inner]:border-primary [&>label>.ant-radio-checked>.ant-radio-inner]:bg-primary"
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Item>
      <Item name="declaration" valuePropName="checked">
        <Checkbox className="text-[12px] tablet:text-[15px]">
          I declare that all information by me is true, and I can be held liable
          legally if it is found that I declared false information, and also
          that registration doesn't guarantee that I would benefit from Soower.
        </Checkbox>
      </Item>
    </Fragment>
  );

  const [widow, { isLoading }] = useWidowMutation();
  const onFinish1 = async (values: State1): Promise<void> => {
    const {
      name,
      email,
      phone,
      address,
      christianity,
      declaration,
      duration,
      timestamp,
      age,
      kids,
    } = values;
    const credentials = {
      name,
      email,
      phone,
      address,
      christianity,
      declaration,
      duration: +duration,
      timestamp,
      age: +age,
      kids,
    };
    try {
      const res = await widow(credentials).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
      // form.resetFields();
      router.push("/join-registry?status=registration-success");
    } catch (error) {
      messageApi.open({
        content: `${error}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };
  const onFinish2 = async (values: State2): Promise<void> => {
    const {
      name,
      email,
      phone,
      address,
      christianity,
      declaration,
      duration,
      timestamp,
      age,
      kids,
      registrerName,
      registrerEmail,
      registrerPhone,
    } = values;
    const credentials = {
      name,
      email,
      phone,
      address,
      christianity,
      declaration,
      duration: +duration,
      timestamp,
      age: +age,
      kids,
      registrar_name: registrerName,
      registrar_email: registrerEmail,
      registrar_phone: registrerPhone,
    };
    try {
      const res = await widow(credentials).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
      // form.resetFields();
      router.push("/join-registry?status=registration-success");
    } catch (error) {
      messageApi.open({
        content: `${error}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };
  const onFinish = regStatus === "Yes" ? onFinish2 : onFinish1;
  return (
    <Fragment>
      <section className="mx-auto laptop:max-w-lg">
        {contextHolder}
        <Space className="mb-8 w-full justify-between rounded border p-2">
          <Typography className="flex items-center gap-2 ">
            <FrameIcon />
            <span className="font-body font-bold">Widow</span>
          </Typography>
          <Link
            className="rounded-md px-2 py-1 font-body text-body-2 hover:bg-slate-100"
            href="/join-registry"
            onClick={prev}
          >
            Edit
          </Link>
        </Space>
        <Form
          form={form}
          layout="vertical"
          name="widow_registry_form"
          onFinish={onFinish}
          initialValues={{ register_on_behalf: "Yes", timestamp: "year" }}
          autoComplete="off"
        >
          <Item
            label={
              <Text
                className="text-[12.75px] font-semibold leading-[14.81px] text-body-1
            laptop:text-[14px] laptop:leading-[17.64px]"
              >
                Are you registering on behalf of somebody?
              </Text>
            }
            name="register_on_behalf"
          >
            <Radio.Group
              name="radiogroup"
              onChange={changeHandler}
              className="[&>label>.ant-radio-checked>.ant-radio-inner]:border-primary [&>label>.ant-radio-checked>.ant-radio-inner]:bg-primary"
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Item>
          {regStatus === "Yes" ? (
            <Fragment>
              <Title
                level={5}
                className="my-6 text-[12.75px] font-semibold laptop:text-[14px] laptop:leading-[17.64px]"
              >
                Your Personal Details
              </Title>
              <Item
                name="registrerName"
                label="Name"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                rules={[
                  { required: true, message: "Please enter your name!" },
                  {
                    min: 3,
                    message: "Atleast 3 characters",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="name"
                  type="text"
                  className="rounded border-none bg-[#f9f9f9] py-2 outline-none  [&>input]:bg-inherit"
                />
              </Item>
              <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
                <Item
                  name="registrerEmail"
                  label="Email address"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                    className="rounded border-none bg-[#f9f9f9] py-2 outline-none  [&>input]:bg-inherit"
                  />
                </Item>
                <Item
                  name="registrerPhone"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                    className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit"
                  />
                </Item>
              </Space>
              <Title
                level={5}
                className="my-6 text-[12.75px] font-semibold laptop:text-[14px] laptop:leading-[17.64px]"
              >
                Widow's Personal Details
              </Title>
              {beginingPart()}
            </Fragment>
          ) : (
            beginingPart()
          )}

          <Space className="flex justify-end">
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="mx-auto mt-3 flex items-center justify-center gap-2 bg-accent text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                size="large"
                loading={isLoading}
                disabled={!submittable}
              >
                {isLoading ? "Submitting" : "Submit"}
                <ArrowRight set="light" />
              </Button>
            </Item>
          </Space>
        </Form>
      </section>
    </Fragment>
  );
};

export default WidowForm;
