import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import MailSvg from "components/assets/svg/Mail";

const MailIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MailSvg} {...props} />
);

export default MailIcon;
