import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import ReceiptSvg from "components/assets/svg/Receipt";

const ReceiptIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ReceiptSvg} {...props} />
);

export default ReceiptIcon;
