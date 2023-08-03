"use client";
import { CheckCircleIcon } from "@components/assets/icons";
import FrameIcon from "@components/assets/icons/Frame";
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
import { Fragment, useState } from "react";
import { ArrowRight } from "react-iconly";
import { useStep } from "../context/registry-context";

const { Item, useForm } = Form;
const { Title, Text } = Typography;
const { Option } = Select;

const suffixSelector = (
  <Item name="suffix" noStyle>
    <Select style={{ width: 100 }}>
      <Option value="months">Months</Option>
      <Option value="years">Years</Option>
    </Select>
  </Item>
);

const WidowForm = () => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [regStatus, setRegStatus] = useState("Yes");
  const [messageApi, contextHolder] = message.useMessage();
  const { prev } = useStep();

  const router = useRouter();
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
        name="widows_name"
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
          name="widows_age"
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
          name="widow_duration"
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
          name="widows_email"
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
          name="widows_number"
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
        name="widows_address_line"
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
        name="widows_religion"
      >
        <Radio.Group
          name="radiogroup"
          className="[&>label>.ant-radio-checked>.ant-radio-inner]:border-primary [&>label>.ant-radio-checked>.ant-radio-inner]:bg-primary"
        >
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
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
        name="widow_have_kids"
      >
        <Radio.Group
          name="radiogroup"
          className="[&>label>.ant-radio-checked>.ant-radio-inner]:border-primary [&>label>.ant-radio-checked>.ant-radio-inner]:bg-primary"
        >
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Item>
      <Item name="widows_declaration" valuePropName="checked">
        <Checkbox className="text-[12px] tablet:text-[15px]">
          I declare that all information by me is true, and I can be held liable
          legally if it is found that I declared false information, and also
          that registration doesn't guarantee that I would benefit from Soower.
        </Checkbox>
      </Item>
    </Fragment>
  );

  const onFinish = async (values: any): Promise<void> => {
    setIsLoading(true);
    console.log("Form data: ", values);
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulating an asynchronous operation
    setIsLoading(false);
    messageApi.open({
      content: `Subimssion successful!`,
      className: "[&>div]:bg-[#17B472] [&>div]:text-white",
      icon: <CheckCircleIcon />,
    });
    router.push("/join-registry?status=registration-success");
  };

  return (
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
          onClick={() => prev()}
        >
          Edit
        </Link>
      </Space>
      <Form
        form={form}
        layout="vertical"
        name="widow_registry_form"
        onFinish={onFinish}
        initialValues={{ register_on_behalf: "Yes", suffix: "Years" }}
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
              name="registrer_name"
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
                name="registrer_email"
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
                name="registrer_number"
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
              className="mx-auto mt-3 flex items-center justify-center gap-2 bg-accent text-[14px] font-medium text-white"
              size="large"
              loading={isLoading}
            >
              {isLoading ? "Saving" : "Submit"}
              <ArrowRight set="light" />
            </Button>
          </Item>
        </Space>
      </Form>
    </section>
  );
};

export default WidowForm;
