import { CheckCircleIcon } from "@components/assets/icons";
import { useAuth } from "@hooks/useAuth";
import {
  useGetMinistryDetailsQuery,
  useUpdateMinistryProfileMutation,
} from "@store/services/ministries";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { Fragment } from "react";
import SocialLinksForm from "./social-links-form";

const { Title, Paragraph } = Typography;
const { Item, useForm } = Form;
type State = { email: string; phone: string };
const ContactSocial = () => {
  let id: string | undefined;
  const [updateMinistryProfile, { isLoading }] =
    useUpdateMinistryProfileMutation();
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuth();
  if (user && "ministry" in user) {
    id = user.ministry.id;
  }
  const { data: ministryDetails } = useGetMinistryDetailsQuery(id);
  // const initialValues = ministryDetails?.data
  //   ? {
  // email: ministryDetails.data.email,
  // phone: ministryDetails.data.phone,
  //     }
  //   : {
  //       email: "",
  //       phone: "",
  //     };
  const onFinish = async (values: State): Promise<void> => {
    const { email, phone } = values;
    const credentials = {
      id,
      email,
      phone,
    };
    try {
      const res = await updateMinistryProfile(credentials).unwrap();
      messageApi.open({
        content: `${res.message}`,
        className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
        icon: <CheckCircleIcon />,
      });
      // form.resetFields();
    } catch (error: any) {
      messageApi.open({
        content: `${error}`,
        className: `[&>div]:bg-red-800 [&>div]:text-white`,
        icon: <CheckCircleIcon />,
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
      <Card bordered={false} className="w-full">
        <Row className="mx-auto mb-6 grid w-full grid-cols-1 items-start gap-0 laptop:grid-cols-2 laptop:justify-start desktop:justify-center">
          {/* <Row gutter={[12, 24]}> */}
          <Col flex={1}>
            <Typography>
              <Title
                level={4}
                className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
              >
                Contact Details
              </Title>
              <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
                Your ministry&apos;s email address and phone number
              </Paragraph>
            </Typography>
          </Col>
          <Col flex={1}>
            <Form
              form={form}
              name="admin_contact_and_social_form"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{
                email: ministryDetails && ministryDetails.data.email,
                phone: ministryDetails && ministryDetails.data.phone,
              }}
            >
              <Space
                className="flex w-full flex-col items-start tablet:flex-row [&>div.ant-space-item]:w-full"
                // size="large"
              >
                <Item
                  name="email"
                  label="Email Address"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please enter ministry's email address",
                    },
                  ]}
                >
                  <Input
                    placeholder="info@fwcabuja.org"
                    type="text"
                    required
                    className="rounded border-none bg-[#f9f9f9] py-3 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px] [&>input]:bg-inherit"
                  />
                </Item>
                <Item
                  name="phone"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                >
                  <Input
                    type="tel"
                    placeholder="+234 123 456 7890"
                    pattern="^\+\d{13}|\d{11}$"
                    className="rounded border-none bg-[#f9f9f9] py-3 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px] [&>input]:bg-inherit"
                  />
                </Item>
              </Space>

              <Space className="w-full justify-end">
                <Button
                  htmlType="submit"
                  size="large"
                  className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
                  loading={isLoading}
                >
                  {isLoading ? "Saving" : "Save"}
                </Button>
              </Space>
            </Form>
          </Col>
        </Row>
        <Divider type="horizontal" />
        {/* <Row className="mx-auto my-6 grid w-full grid-cols-1 items-start gap-0 laptop:grid-cols-[1fr,_2fr] laptop:justify-start desktop:justify-center"> */}
        <Row gutter={[24, 32]}>
          <Col flex={1}>
            <Typography>
              <Title
                level={4}
                className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
              >
                Social Accounts
              </Title>
              <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
                Add your social links for visibilty.
              </Paragraph>
            </Typography>
          </Col>
          <Col flex={1}>
            <SocialLinksForm id={id} />
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default ContactSocial;
