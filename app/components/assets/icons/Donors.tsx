import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import DonorsSvg from "@components/assets/svg/Donors";

const DonorsIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DonorsSvg} {...props} />
);

export default DonorsIcon;
