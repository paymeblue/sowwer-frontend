import React from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import ProjectsSvg from "components/assets/svg/Projects";

const ProjectsIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ProjectsSvg} {...props} />
);

export default ProjectsIcon;
