import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import EmptyWalletSvg from "components/assets/svg/emptyWallet";

const EmptyWalletIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={EmptyWalletSvg} {...props} />
);

export default EmptyWalletIcon;
