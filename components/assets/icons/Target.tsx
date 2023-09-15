import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import TargetSvg from "components/assets/svg/Target";

const TargetIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={TargetSvg} {...props} />
);

export default TargetIcon;
