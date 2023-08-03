import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import CallingSvg from "@components/assets/svg/Calling";

const CallingIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CallingSvg} {...props} />
);

export default CallingIcon;
