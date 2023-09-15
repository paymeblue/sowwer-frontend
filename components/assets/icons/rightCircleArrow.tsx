import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import RightCirlceArrowSvg from "components/assets/svg/rightCircleArrow";

const RightCirlceArrowIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={RightCirlceArrowSvg} {...props} />
);

export default RightCirlceArrowIcon;
