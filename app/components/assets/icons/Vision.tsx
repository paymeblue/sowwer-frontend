import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import VisionSvg from "@components/assets/svg/Vision";

const VisionIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={VisionSvg} {...props} />
);

export default VisionIcon;
