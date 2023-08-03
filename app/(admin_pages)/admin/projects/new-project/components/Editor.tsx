// "use client";
// import { CheckCircleIcon } from "@components/assets/icons";
// import { Button, Space, Typography, message } from "antd";
// import React, { FormEvent, Fragment, useState } from "react";
// import ReactQuill from "react-quill";

// const { Title, Paragraph } = Typography;

// const formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "video",
// ];
// const modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// };

// const Editor: React.FC = () => {
//   const [messageApi, contextHolder] = message.useMessage();
//   const [editorHtml, setEditorHtml] = useState("");

//   const handleChange = (html: any) => {
//     setEditorHtml(html);
//   };

//   const submitHandler = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (editorHtml && editorHtml === "") {
//       console.log(editorHtml);
//     }
//     messageApi.open({
//       content: "Form submission successful",
//       className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
//       icon: <CheckCircleIcon />,
//     });
//   };

//   return (
//     <Fragment>
//       {contextHolder}
//       <Space className="flex w-full flex-col items-start bg-white p-4 [&>div.ant-space-item]:w-full">
//         <Typography>
//           <Title level={5} className="mb-0 font-bold">
//             Story
//           </Title>
//           <Paragraph>Describe and talk about your project.</Paragraph>
//         </Typography>
//         <form onSubmit={submitHandler} autoComplete="off">
//           <div className="mb-2">
//             <span className="mr-2 font-bold text-red-300">*</span>
//             <label htmlFor="editor">What is this project about?</label>
//           </div>
//           <ReactQuill
//             theme="snow"
//             onChange={handleChange}
//             value={editorHtml}
//             modules={modules}
//             formats={formats}
//             // bounds={".app"}
//             placeholder="Write something here..."
//           />
//           <Space className="mt-6 w-full justify-end">
//             <Button
//               htmlType="submit"
//               type="primary"
//               size="large"
//               className="bg-accent text-white "
//             >
//               Save
//             </Button>
//           </Space>
//         </form>
//       </Space>
//     </Fragment>
//   );
// };

// export default Editor;

// const Editor = () => {
//   return <div>Editor</div>;
// };

// export default Editor;
import { CheckCircleIcon } from "@components/assets/icons";
import { Button, Space, Typography, message } from "antd";
import React, { FormEvent, Fragment, useState } from "react";
import QuillWrapper from "./QuillEditor";

const { Title, Paragraph } = Typography;

const Editor: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState("");

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulating an asynchronous operation
      console.log(value);
      messageApi.open({
        content: "Form submission successful",
        className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
        icon: <CheckCircleIcon />,
      });
    } catch {
      (e: any) => {
        console.log("error:", e);
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <Space className="flex w-full flex-col items-start bg-white p-4 [&>div.ant-space-item]:w-full">
        <Typography>
          <Title
            level={5}
            className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
          >
            Story
          </Title>
          <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
            Describe and talk about your project.
          </Paragraph>
        </Typography>
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="mb-1">
            <label
              htmlFor="editor"
              className="m-0 mr-1 text-[10.91px] leading-[13.75px] laptop:text-[13px] laptop:leading-[16.38px]"
            >
              What is this project about?
            </label>
            <span className="mr-2 font-bold text-red-300">*</span>
          </div>
          <div id="editor">
            <QuillWrapper
              theme="snow"
              value={value}
              onChange={setValue}
              bounds={".editor"}
              className="h-[150px]"
            />
          </div>
          <Space className="mt-6 flex h-[100px] w-full justify-end">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
              loading={isLoading}
            >
              {isLoading ? "Saving" : "Save"}
            </Button>
          </Space>
        </form>
      </Space>
    </Fragment>
  );
};

export default Editor;
