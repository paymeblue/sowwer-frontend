import { CheckCircleIcon, FileUpload } from "@components/assets/icons";
import {
  Button,
  Divider,
  Form,
  Space,
  Typography,
  Upload,
  UploadProps,
  message,
} from "antd";
import { RcFile } from "antd/es/upload";
import { Fragment, useState } from "react";

const { Title, Paragraph } = Typography;
const { Item, useForm } = Form;

const { Dragger } = Upload;

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
    console.log({ file });
    return false;
    // return isPNG || isJPG || isPDF || Upload.LIST_IGNORE;
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
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

const CoverPhoto = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any): Promise<void> => {
    setIsLoading(true);
    console.log("Form data: ", values);
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulating an asynchronous operation
    form.resetFields();
    setIsLoading(false);
    messageApi.open({
      content: "Cover photo submitted successfully!",
      className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
      icon: <CheckCircleIcon />,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      content: "Form submission failed!",
      className: "[&>div]:bg-red-800 [&>div]:text-white",
    });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Fragment>
      {contextHolder}
      <Form
        form={form}
        name="create_new_project_form_cover_photo"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="rounded bg-white p-4"
      >
        <Space
          className="my-0 flex w-full flex-col items-start laptop:flex-row [&>div.ant-space-item]:w-full"
          size="large"
        >
          <Typography>
            <Title
              level={5}
              className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
            >
              Cover Photo
            </Title>
            <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
              Add a cover photo to your project.
            </Paragraph>
          </Typography>
          <Item
            label="Upload cover photo"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            required
          >
            <Item
              name="cover_photo"
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
                  <p className="mb-0 text-primary">Upload cover photo</p>
                  <small className="text-body-2">
                    (.jpg, .png or .pdf file format supported)
                  </small>
                </div>
              </Dragger>
            </Item>
          </Item>
        </Space>
        <Space className="w-full justify-end">
          <Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
              loading={isLoading}
            >
              {isLoading ? "Saving" : "Save"}
            </Button>
          </Item>
        </Space>
        <Divider type="horizontal" className="my-0" />
      </Form>
    </Fragment>
  );
};

export default CoverPhoto;
