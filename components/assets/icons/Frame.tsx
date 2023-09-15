import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import FrameSvg from "components/assets/svg/Frame";

const FrameIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={FrameSvg} {...props} />
);

export default FrameIcon;
