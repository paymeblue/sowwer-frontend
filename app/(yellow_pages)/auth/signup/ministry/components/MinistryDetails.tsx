import { Christian, ChurchIcon, FileUpload } from "@components/assets/icons";
import states from "@lib/NigeriaStates";
import { Form, Input, Select, Space, Typography, Upload, message } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, Fragment, ReactNode, useState } from "react";

type Item = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  icon: ReactNode;
};
const items: Array<Item> = [
  {
    id: "1",
    title: "Church",
    tag: "church",
    desc: "A church registered with the Christian Association of Nigeria (CAN).",
    icon: <ChurchIcon />,
  },
  {
    id: "2",
    title: "Christian Organization",
    tag: "organisation",
    desc: "A registered Christian institution or organization in Nigeria.",
    icon: <Christian />,
  },
];
const { Dragger } = Upload;

const MinistryDetails: FC<any> = ({ form }: { form: any }) => {
  const { Title, Paragraph } = Typography;
  const { Item } = Form;
  const { TextArea } = Input;
  const [title, setTitle] = useState(items[0].tag);
  const nextScreen = useSearchParams();
  const router = useRouter();
  const changeDisplay = (item: Item) => {
    router.push("/auth/signup/ministry?step=details");
    setTitle((prev) => (prev = item.tag));
  };

  const props: UploadProps = {
    name: "file",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    multiple: false,
    listType: "picture",
    beforeUpload: (file: RcFile) => {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg" || file.type === "image/jpg";
      const isPDF = file.type === "application/pdf";
      if (!(isPNG || isJPG || isPDF)) {
        message.error(`${file.name} is not a png, jpeg, jpg or pdf file`);
      }
      return false;
      // return isPNG || isJPG || isPDF || Upload.LIST_IGNORE;
    },
    async onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      size: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    maxCount: 1,
    accept: ".png,.jpeg,.jpg,application/pdf",
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const options = [
    { value: "", label: "-- Select --", disabled: true },
    ...states.map((state) => ({ value: state, label: state })),
  ];
  form.setFieldValue("ministryType", title);
  return (
    <Fragment>
      {nextScreen.toString() === "step=details" ? (
        <section className="mx-auto laptop:max-w-lg">
          <Form
            form={form}
            name="ministry_info__register_form"
            layout="vertical"
            autoComplete="off"
          >
            <Title
              level={2}
              className="my-8 font-title text-[26px] leading-[29.75px] tablet:leading-[40.04px] laptop:text-[35px]"
            >
              What type of ministry are you?
            </Title>
            <Item name="ministryType">
              {title === "church" ? (
                <Space className="mb-8 w-full justify-between rounded border p-2">
                  <Typography className="flex items-center gap-2 ">
                    <ChurchIcon />
                    <span className="font-body font-bold">Church</span>
                  </Typography>
                  <Link
                    className="rounded-md px-2 py-1 font-body text-body-2 hover:bg-slate-100"
                    href="/auth/signup/ministry"
                  >
                    Edit
                  </Link>
                </Space>
              ) : (
                <Space className="mb-8 w-full justify-between rounded border p-2 ">
                  <Typography className="flex items-center gap-2 ">
                    <Christian />
                    <span className="font-body font-bold">
                      Christian Organization
                    </span>
                  </Typography>
                  <Link
                    href="/auth/signup/ministry"
                    className="rounded-md px-2 py-1 font-body text-body-2 hover:bg-slate-100"
                    type="text"
                  >
                    Edit
                  </Link>
                </Space>
              )}
            </Item>
            <Item
              name="ministryName"
              label="Name"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-left [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={
                  title === "Church"
                    ? "Enter the name of your church"
                    : "Enter the name of your organization"
                }
                type="text"
                className="rounded border-none bg-[#F9F9F9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
              />
            </Item>
            <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
              <Item
                name="ministryEmail"
                label="Email Address"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-left [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                rules={[
                  {
                    required: true,
                    message: "Please input the email address of the ministry!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Email Address"
                  type="text"
                  className="rounded border-none bg-[#F9F9F9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
              <Item
                name="ministryPhoneNumber"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-left [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
                  placeholder="Phone Number"
                  className="rounded border-none bg-[#F9F9F9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
            </Space>
            <Item
              name="ministryAddressLine"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-left [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              label="Address Line"
              rules={[
                {
                  required: true,
                  message: "Please input your church address!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={
                  title === "Church"
                    ? "Enter your church address"
                    : "Enter your organization's address"
                }
                type="text"
                className="rounded border-none bg-[#F9F9F9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
              />
            </Item>
            <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
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
                  className="[&>.ant-select-selector]:block [&>.ant-select-selector]:h-auto [&>.ant-select-selector]:border-none  [&>.ant-select-selector]:bg-[#f9f9f9] [&>.ant-select-selector]:py-2  [&>.ant-select-selector]:text-start [&>.ant-select-selector]:outline-none"
                />
              </Item>
              <Item
                name="ministryWebsite"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-left [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                label="Website or social link"
              >
                <Input
                  type="text"
                  placeholder="Website or social link"
                  className="rounded border-none bg-[#f9f9f9] py-2 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px]"
                />
              </Item>
            </Space>
            <Item
              label="Upload CAC Document"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-left [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              required
            >
              <Item
                name="cacDocument"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: "Please upload a cover photo",
                  },
                ]}
              >
                <Dragger {...props}>
                  <div className="px-1">
                    <FileUpload />
                    <p className="mb-0 text-primary">Upload CAC Document</p>
                    <small className="text-body-2">
                      (.jpg, .png or .pdf file format supported)
                    </small>
                  </div>
                </Dragger>
              </Item>
            </Item>
            <Item
              name="ministryMsg"
              label="What projects would you be receiving donations for on Soower?"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-left [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  required: true,
                  message:
                    "Please write the name of the project you'd be receiving a donation for",
                },
              ]}
            >
              <TextArea
                style={{ height: 120, resize: "none" }}
                placeholder="Enter some text...."
                className="rounded border-none bg-[#f9f9f9] py-2 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px]"
              />
            </Item>
          </Form>
        </section>
      ) : (
        <section>
          <Title
            level={2}
            className="my-8 font-title text-[26px] leading-[29.75px] tablet:leading-[40.04px] laptop:text-[35px]"
          >
            What type of ministry are you?
          </Title>
          {items.map((item) => (
            <div
              key={item.id}
              className=" mx-auto mt-4 flex h-auto w-full cursor-pointer items-center gap-4 rounded border p-2 hover:bg-slate-100 laptop:max-w-lg"
              onClick={() => changeDisplay(item)}
            >
              {item.icon}
              <div className="flex-col items-center gap-2 text-start">
                <Title level={5} className="mb-0 font-body text-sm font-bold">
                  {item.title}
                </Title>
                <Paragraph className="mb-0 font-body text-body-2">
                  {item.desc}
                </Paragraph>
              </div>
            </div>
          ))}
        </section>
      )}
    </Fragment>
  );
};

export default MinistryDetails;
