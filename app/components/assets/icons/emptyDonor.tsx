import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import EmptyDonorSvg from "@components/assets/svg/emptyDonor";

const EmptyDonorIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={EmptyDonorSvg} {...props} />
);

export default EmptyDonorIcon;
