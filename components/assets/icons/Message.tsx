import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import MessageSvg from "components/assets/svg/Message";

const MessageIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MessageSvg} {...props} />
);

export default MessageIcon;
