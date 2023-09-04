import { CheckCircleIcon, FileUpload } from "@components/assets/icons";
import { useAuth } from "@hooks/useAuth";
import { useUpdateMinistryProfileMutation } from "@store/services/ministries";
import { Button, Form, Space, Upload, message } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import { Fragment } from "react";

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

const UploadLogo = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [updateMinistryProfile, { isLoading, isSuccess }] =
    useUpdateMinistryProfileMutation();
  let formIsValid = false;
  const minisrtyLogo = Form.useWatch("minisrtyLogo", form);

  if (minisrtyLogo) {
    formIsValid = true;
  }
  const { user } = useAuth();
  let id: string;
  if (user && "ministry" in user) {
    id = user.ministry.id;
  }
  const onFinish = async (values: any): Promise<void> => {
    console.log("Form data: ", values);
    try {
      const res = await updateMinistryProfile({
        id,
        logo: values.minisrtyLogo[0].thumbUrl,
      }).unwrap(); // Simulating an asynchronous operation
      messageApi.open({
        content: `${res.message}`,
        className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
        icon: <CheckCircleIcon />,
      });
      // form.resetFields();
    } catch (error) {
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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log(e?.fileList);
    return e?.fileList;
  };
  return (
    <Fragment>
      {contextHolder}
      <Form
        form={form}
        name="admin_profile_info_logo_upload"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Item
          label="Upload logo"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          required
        >
          <Item
            name="minisrtyLogo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Please upload the logo for your ministry",
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
        <Space className="w-full justify-end">
          <Button
            htmlType="submit"
            size="large"
            className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            loading={isLoading}
            disabled={!formIsValid}
          >
            {isLoading ? "Saving" : isSuccess ? "Saved" : "Save"}
          </Button>
        </Space>
      </Form>
    </Fragment>
  );
};

export default UploadLogo;
