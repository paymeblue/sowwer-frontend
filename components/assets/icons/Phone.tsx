import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import PhoneSvg from "components/assets/svg/Phone";

const PhoneIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PhoneSvg} {...props} />
);

export default PhoneIcon;
