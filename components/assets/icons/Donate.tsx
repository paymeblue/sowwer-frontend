import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import DonateSvg from "components/assets/svg/Donate";

const DonateIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DonateSvg} {...props} />
);

export default DonateIcon;
