import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import BankSvg from "@components/assets/svg/Bank";

const BankIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={BankSvg} {...props} />
);

export default BankIcon;
