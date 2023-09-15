import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import EmptySpeakerSvg from "components/assets/svg/emptySpeaker";

const EmptySpeakerIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={EmptySpeakerSvg} {...props} />
);

export default EmptySpeakerIcon;
