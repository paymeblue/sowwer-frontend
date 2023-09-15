import { Spin } from "antd";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    loading: () => <Spin />,
    ssr: false,
  }
) as typeof ReactQuill;
export default QuillWrapper;
