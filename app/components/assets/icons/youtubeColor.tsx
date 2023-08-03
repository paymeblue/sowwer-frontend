import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import youtubeColorSvg from "@components/assets/svg/youtubeColor";

const YoutubeColorIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={youtubeColorSvg} {...props} />
);

export default YoutubeColorIcon;
