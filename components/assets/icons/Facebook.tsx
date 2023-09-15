import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import FacebookSvg from "components/assets/svg/Facebook";

const FacebookIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={FacebookSvg} {...props} />
);

export default FacebookIcon;
