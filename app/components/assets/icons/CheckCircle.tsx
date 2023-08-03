import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import CheckCircleSvg from "@components/assets/svg/CheckCircle";

const CheckCircleIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CheckCircleSvg} {...props} />
);

export default CheckCircleIcon;
