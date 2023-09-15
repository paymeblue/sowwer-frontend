import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import ChurchSvg from "components/assets/svg/Church";

const ChurchIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ChurchSvg} {...props} />
);

export default ChurchIcon;
