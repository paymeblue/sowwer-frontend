"use client";
import { CheckCircleIcon } from "@components/assets/icons";
import FrameIcon from "@components/assets/icons/Frame";
import { useMissionaryMutation } from "@store/services/join-soower";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { ArrowRight } from "react-iconly";
import { useStep } from "../context/registry-context";
type State1 = {
  name: string;
  email: string;
  phone: string;
  address: string;
  christianity: boolean;
  declaration: boolean;
  bornAgain: boolean;
  church: string;
  occupation: string;
  reasonAbout: string;
};
type Request = {
  duration: string;
  timestamp: "month" | "year";
  serviceArea: string;
  affiliatedToChurch: boolean;
};
type State2 = State1 & Request;

const { Item, useForm } = Form;
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const suffixSelector = (
  <Item name="timestamp" noStyle>
    <Select style={{ width: 100 }}>
      <Option value="month">Months</Option>
      <Option value="year">Years</Option>
    </Select>
  </Item>
);

const MissionaryForm = () => {
  const [form] = useForm();
  const [value, setValue] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { prev } = useStep();
  const router = useRouter();
  const handleChange = (value: string) => {
    setValue(value);
  };

  const declaration = Form.useWatch("declaration", form);

  const [missionary, { isLoading }] = useMissionaryMutation();
  const onFinish1 = async (values: State1): Promise<void> => {
    const {
      name,
      email,
      phone,
      address,
      christianity,
      declaration,
      bornAgain,
      church,
      occupation,
      reasonAbout,
    } = values;
    const credentials = {
      status: "new" as "new",
      name,
      email,
      phone,
      address,
      christianity,
      declaration,
      born_again: bornAgain,
      church,
      occupation,
      reason_about: reasonAbout,
    };
    try {
      const res = await missionary(credentials).unwrap();
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
        icon: <CheckCircleIcon />,
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
      bornAgain,
      church,
      occupation,
      reasonAbout,
      duration,
      timestamp,
      serviceArea,
      affiliatedToChurch,
    } = values;
    const credentials = {
      status: "existing" as "existing",
      name,
      email,
      phone,
      address,
      christianity,
      declaration,
      born_again: bornAgain,
      church,
      occupation,
      reason_about: reasonAbout,
      duration,
      timestamp,
      service_area: serviceArea,
      affiliated_to_church: affiliatedToChurch,
    };
    try {
      const res = await missionary(credentials).unwrap();
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
        icon: <CheckCircleIcon />,
      });
    }
  };
  const onFinish =
    value === "yes-want-to-be-a-missionary" ? onFinish1 : onFinish2;
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
          name="email"
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
          name="phone"
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
    </Fragment>
  );
  const concludingPart = () => (
    <Fragment>
      <Item name="declaration" valuePropName="checked">
        <Checkbox className="text-[12px] tablet:text-[15px]">
          I declare that all information by me is true, and I can be held liable
          legally if it is found that I declared false information, and also
          that registration doesn't guarantee that I would benefit from Soower.
        </Checkbox>
      </Item>
      <Space className="flex justify-end">
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="mx-auto mt-3 flex items-center justify-center gap-2 bg-accent text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            size="large"
            disabled={!declaration}
            loading={isLoading}
          >
            {isLoading ? "Saving" : "Submit"}
            <ArrowRight set="light" />
          </Button>
        </Item>
      </Space>
    </Fragment>
  );

  return (
    <section className="mx-auto laptop:max-w-lg">
      {contextHolder}
      <Space className="mb-8 w-full justify-between rounded border p-2">
        <Typography className="flex items-center gap-2 ">
          <FrameIcon />
          <span className="font-body font-bold">Missionary</span>
        </Typography>
        <Link
          className="rounded-md px-2 py-1 font-body text-body-2 hover:bg-slate-100"
          href="/join-registry"
          onClick={() => prev()}
        >
          Edit
        </Link>
      </Space>
      <Form
        form={form}
        layout="vertical"
        name="missionary_registry_form"
        onFinish={onFinish}
        initialValues={{ register_on_behalf: "Yes", timestamp: "year" }}
        autoComplete="off"
      >
        <Item
          name="select"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          label="Do you want to be a missionary or are you already serving as a missionary?"
          rules={[
            {
              required: true,
              message: "Please select an option!",
            },
          ]}
        >
          <Select
            placeholder="-- Select --"
            options={[
              { value: "", label: "-- Select --", disabled: true },
              {
                value: "yes-want-to-be-a-missionary",
                label: "Yes, I want to be a missionary",
              },
              {
                value: "already-a-missionary",
                label: "Already serving as a missionary",
              },
            ]}
            onChange={handleChange}
            className="[&>.ant-select-selector]:h-auto  [&>.ant-select-selector]:border-none [&>.ant-select-selector]:bg-[#f9f9f9]  [&>.ant-select-selector]:py-2 [&>.ant-select-selector]:outline-none"
          />
        </Item>
        {value === "yes-want-to-be-a-missionary" ? (
          <Fragment>
            {beginingPart()}
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
                  Are you born again?
                </Text>
              }
              name="bornAgain"
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
              name="church"
              label="What church do you attend?"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  required: true,
                  message: "Please enter the name of your church",
                },
              ]}
            >
              <Input
                placeholder="Name of church"
                type="text"
                required
                className="rounded border-none bg-[#f9f9f9] py-2 outline-none"
              />
            </Item>
            <Item
              name="occupation"
              label="What are you doing presently?"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  required: true,
                  message: "Please write what you do",
                },
              ]}
            >
              <Input
                placeholder="Occupation"
                type="text"
                required
                className="rounded border-none bg-[#f9f9f9] py-2 outline-none"
              />
            </Item>
            <Item
              name="reasonAbout"
              label="Why do you want to be a missionary?"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  message: "Please state your reason",
                },
              ]}
            >
              <TextArea
                style={{ height: 120, resize: "none" }}
                placeholder="Enter some text...."
                className="rounded border-none bg-[#f9f9f9] outline-none"
              />
            </Item>
            {concludingPart()}
          </Fragment>
        ) : null}
        {value === "already-a-missionary" && (
          <Fragment>
            {beginingPart()}
            <Item
              name="duration"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              label="How long have you been a missionary?"
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
            <Item
              name="serviceArea"
              label="Where are you serving as a missionary?"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  required: true,
                  message: "Please enter the address",
                },
              ]}
            >
              <Input
                placeholder="Service Area"
                type="text"
                required
                className="rounded border-none bg-[#f9f9f9] py-2 outline-none"
              />
            </Item>
            <Item
              name="reasonAbout"
              label="Tell us about some of your previous missionary work?"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  message:
                    "Please write the name of the project you'd be receiving a donation for",
                },
              ]}
            >
              <TextArea
                style={{ height: 120, resize: "none" }}
                placeholder="Enter some text...."
                className="rounded border-none bg-[#f9f9f9] outline-none"
              />
            </Item>
            <Item
              label={
                <Text
                  className="text-[12.75px] font-semibold leading-[14.81px] text-body-1
            laptop:text-[14px] laptop:leading-[18px]"
                >
                  Are you affiliated to any church?
                </Text>
              }
              name="affiliatedToChurch"
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
            {concludingPart()}
          </Fragment>
        )}
      </Form>
    </section>
  );
};

export default MissionaryForm;
