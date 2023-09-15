import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import LinkedInColorSvg from "components/assets/svg/linkedInColor";

const LinkedInColorIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LinkedInColorSvg} {...props} />
);

export default LinkedInColorIcon;
