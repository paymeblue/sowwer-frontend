import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import QrCodeSvg from "@components/assets/svg/rightCircleArrow";

const QrCodeIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={QrCodeSvg} {...props} />
);

export default QrCodeIcon;
