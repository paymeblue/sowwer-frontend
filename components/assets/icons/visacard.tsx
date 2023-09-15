import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import VisacardSvg from "components/assets/svg/visacard";

const VisacardIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={VisacardSvg} {...props} />
);

export default VisacardIcon;
