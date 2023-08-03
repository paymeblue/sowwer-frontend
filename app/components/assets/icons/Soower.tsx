import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import SoowerSvg from "@components/assets/svg/Soower";

const SoowerIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SoowerSvg} {...props} />
);

export default SoowerIcon;
