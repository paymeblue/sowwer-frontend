import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import HeartHandSvg from "@components/assets/svg/HeartHand";

const HeartHandIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HeartHandSvg} {...props} />
);

export default HeartHandIcon;
