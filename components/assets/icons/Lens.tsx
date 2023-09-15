import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import LensSvg from "components/assets/svg/Lens";

const LensIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LensSvg} {...props} />
);

export default LensIcon;
