import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import FileUploadSvg from "components/assets/svg/FileUpload";

const FileUploadIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={FileUploadSvg} {...props} />
);

export default FileUploadIcon;
