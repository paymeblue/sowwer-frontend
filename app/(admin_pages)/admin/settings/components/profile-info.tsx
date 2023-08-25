import { CheckCircleIcon } from "@components/assets/icons";
import { useAuth } from "@hooks/useAuth";
import states from "@lib/NigeriaStates";
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
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { Fragment } from "react";
import UploadLogo from "./upload-logo";

const { Title, Paragraph } = Typography;
const { Item, useForm } = Form;
const { TextArea } = Input;

type State = {
  addressLine: string;
  ministryMsg: string;
  name: string;
  postalCode: string;
  state: string;
};

const ProfileInfo = () => {
  const [form] = useForm();
  const [updateMinistryProfile, { isLoading }] =
    useUpdateMinistryProfileMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuth();
  let id: string;
  if (user?.ministry) {
    id = user.ministry.id;
  }
  const { data: ministryDetails } = useGetMinistryDetailsQuery(
    user?.ministry.id
  );
  const initialValues = ministryDetails?.data
    ? {
        name: ministryDetails.data.name,
        addressLine: ministryDetails.data.address,
        postalCode: ministryDetails.data.postal_code,
        state: ministryDetails.data.state,
        ministryMsg: ministryDetails.data.about,
      }
    : {
        name: "",
        addressLine: "",
        postalCode: "",
        state: "",
        ministryMsg: "",
      };
  const options = [
    { value: "", label: "-- Select --", disabled: true },
    ...states.map((state) => ({ value: state, label: state })),
  ];
  const onFinish = async (values: State): Promise<void> => {
    const { addressLine, ministryMsg, name, postalCode, state } = values;
    const credentials = {
      id,
      name,
      address: addressLine,
      postalCode: postalCode,
      state,
      about: ministryMsg,
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
          <Col flex={1}>
            <Typography>
              <Title
                level={4}
                className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
              >
                General Details
              </Title>
              <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
                Name, address and more information about your ministry.
              </Paragraph>
            </Typography>
          </Col>
          <Col flex={1}>
            <Form
              form={form}
              name="admin_profile_info_form"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={initialValues}
            >
              <Item
                name="name"
                label="Name"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                rules={[
                  {
                    required: true,
                    message: "Please enter your ministry's name!",
                  },
                  {
                    min: 3,
                    message: "Atleast 3 characters",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Enter name of your ministry"
                  type="text"
                  required
                  className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
              <Item
                name="addressLine"
                label="Address Line"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please enter the address",
                  },
                ]}
              >
                <Input
                  placeholder="648 Idris Gidado St, Wuye"
                  type="text"
                  required
                  className="rounded border-none bg-[#f9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
              <Space
                className="flex w-full flex-col items-start tablet:flex-row [&>div.ant-space-item]:w-full"
                size="large"
              >
                <Item
                  name="state"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  hasFeedback
                  label="State"
                  rules={[
                    {
                      required: true,
                      message: "Please select a state!",
                    },
                  ]}
                >
                  <Select
                    placeholder="-- Select --"
                    options={options}
                    className="[&>.ant-select-selector]:h-auto  [&>.ant-select-selector]:border-none [&>.ant-select-selector]:bg-[#f9f9f9]  [&>.ant-select-selector]:py-3 [&>.ant-select-selector]:outline-none"
                  />
                </Item>
                <Item
                  name="postalCode"
                  label="Postal Code"
                  className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                >
                  <Input
                    placeholder="Enter postal code"
                    type="text"
                    required
                    className="rounded border-none bg-[#f9f9f9] py-2 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px] [&>input]:bg-inherit"
                  />
                </Item>
              </Space>
              <Item
                name="ministryMsg"
                label="About your ministry"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                rules={[
                  {
                    required: true,
                    message:
                      "Please write the name of the project you'd be receiving a donation for",
                  },
                ]}
              >
                <TextArea
                  name="ministryMsg"
                  placeholder="Tell your story...."
                  rows={5}
                  className="rounded border-none bg-[#f9f9f9] py-2 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px]"
                />
              </Item>
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
        <Row className="mx-auto my-6 grid w-full grid-cols-1 items-start gap-0 laptop:grid-cols-2 laptop:justify-start desktop:justify-center">
          <Col flex={1}>
            <Typography>
              <Title
                level={4}
                className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
              >
                Logo
              </Title>
              <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
                Add your logo for easy identification.
              </Paragraph>
            </Typography>
          </Col>
          <Col flex={1}>
            <UploadLogo />
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default ProfileInfo;
