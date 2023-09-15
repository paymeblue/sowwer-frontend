import { FileUpload } from "components/assets/icons";
import { Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";

const { Dragger } = Upload;

export const getBase64 = (file: RcFile, callback: (url: string) => void) => {
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(file);
  } else return;
};

const MyFile: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const fileFormat = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  const props: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    multiple: false,
    listType: "picture",
    beforeUpload: (file: RcFile) => {
      const isAcceptedFileFormat = fileFormat.includes(file.type);

      if (!isAcceptedFileFormat) {
        message.error("You can only upload PDF, JPG or PNG file!");
      }
      const isFileLimit = file.size / 1024 / 1024 < 2;
      if (!isFileLimit) {
        message.error("File must be smaller than 2MB!");
      }
      return isAcceptedFileFormat && isFileLimit ? false : Upload.LIST_IGNORE;
      // return (isAcceptedFileFormat && isFileLimit) || Upload.LIST_IGNORE;
    },
    async onChange(info) {
      getBase64(info.file as RcFile, (url) => {
        setImageUrl(url);
      });
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
  const uploadButton = (
    <div className="px-1">
      <FileUpload />
      <p className="mb-0 text-primary">Upload CAC Document</p>
      <small className="text-body-2">
        (.jpg, .png or .pdf file format supported)
      </small>
    </div>
  );
  console.log(imageUrl);
  return (
    <>
      <Dragger {...props}>{uploadButton}</Dragger>
    </>
  );
};

export default MyFile;
