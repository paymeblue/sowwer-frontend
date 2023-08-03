import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import SpeakerSvg from "@components/assets/svg/Speaker";

const SpeakerIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SpeakerSvg} {...props} />
);

export default SpeakerIcon;
