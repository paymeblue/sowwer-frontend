import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import ChristianSvg from "components/assets/svg/Christian";

const ChristianIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ChristianSvg} {...props} />
);

export default ChristianIcon;
