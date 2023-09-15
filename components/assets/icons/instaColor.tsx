import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import instaColorSvg from "components/assets/svg/instaColor";

const InstaColorIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={instaColorSvg} {...props} />
);

export default InstaColorIcon;
