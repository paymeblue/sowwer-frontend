import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import MastercardSvg from "@components/assets/svg/mastercard";

const MastercardIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MastercardSvg} {...props} />
);

export default MastercardIcon;
