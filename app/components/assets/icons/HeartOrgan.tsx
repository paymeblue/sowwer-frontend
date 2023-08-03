import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import HeartOrganSvg from "@components/assets/svg/HeartOrgan";

const HeartOrganIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HeartOrganSvg} {...props} />
);

export default HeartOrganIcon;
