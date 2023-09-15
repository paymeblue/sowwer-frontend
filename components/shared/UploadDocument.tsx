import React from "react";
import { UploadProps, message, Upload } from "antd";
import { FileUpload } from "components/assets/icons";
import { RcFile } from "antd/es/upload";

type Props = { title: string; subText: string };

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  beforeUpload: (file: RcFile) => {
    const isPNG = file.type === "image/png";
    const isJPG = file.type === "image/jpeg" || file.type === "image/jpg";
    const isPDF = file.type === "application/pdf";
    if (!(isPNG || isJPG || isPDF)) {
      message.error(`${file.name} is not a png, jpeg, jpg or pdf file`);
    }
    return isPNG || isJPG || isPDF || Upload.LIST_IGNORE;
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

const UploadDocument = ({ title, subText }: Props) => (
  <Dragger {...props}>
    <div className="px-1">
      <FileUpload />
      <p className="mb-0 text-primary">{title}</p>
      <small className="text-body-2">{subText}</small>
    </div>
  </Dragger>
);

export default UploadDocument;
