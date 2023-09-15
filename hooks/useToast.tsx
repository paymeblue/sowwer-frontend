import { CheckCircleIcon } from "components/assets/icons";
import { message } from "antd";
type IProps = { content: string; type: "success" | "error" };

const useToast = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = ({ type, content }: IProps) => {
    if (type === "success") {
      messageApi.open({
        content,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
    } else if (type === "error") {
      messageApi.open({
        content,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };

  return { contextHolder, showMessage };
};
export default useToast;
