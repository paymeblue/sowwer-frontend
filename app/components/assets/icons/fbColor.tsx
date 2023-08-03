import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import fbColorSvg from "@components/assets/svg/fbColor";

const FbColorIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={fbColorSvg} {...props} />
);

export default FbColorIcon;
