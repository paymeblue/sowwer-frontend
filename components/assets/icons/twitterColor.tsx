import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import twitterColorSvg from "components/assets/svg/twitterColor";

const TwitterColorIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={twitterColorSvg} {...props} />
);

export default TwitterColorIcon;
