import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import LeftCirlceArrowSvg from "components/assets/svg/leftCirlceArrow";

const LeftCirlceArrowIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LeftCirlceArrowSvg} {...props} />
);

export default LeftCirlceArrowIcon;
