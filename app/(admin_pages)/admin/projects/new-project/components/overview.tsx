import { Fragment } from "react";
// import CoverPhoto from "./cover-photo";
import MainDetails from "./main-details";
import ProjectDesc from "./project-desc";

const Overview = () => {
  return (
    <Fragment>
      <MainDetails />
      {/* <CoverPhoto /> */}
      <ProjectDesc />
    </Fragment>
  );
};

export default Overview;

// import AmountInput from "@components/amountField";
// import { CheckCircleIcon, FileUpload } from "@components/assets/icons";
// import { useAppDispatch } from "@hooks/useStore";
// import { skipToken } from "@reduxjs/toolkit/dist/query";
// import { setProjectId } from "@store/reducers/utilSlice";
// import {
//   useCreateProjectMutation,
//   useEditProjectMutation,
//   useGetProjectQuery,
// } from "@store/services/projects";
// import {
//   Button,
//   Divider,
//   Form,
//   Input,
//   Select,
//   Space,
//   Typography,
//   Upload,
//   UploadProps,
//   message,
// } from "antd";
// import { RcFile } from "antd/es/upload";
// import { useSearchParams } from "next/navigation";
// import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
// import { ArrowRight } from "react-iconly";

// const { Title, Paragraph } = Typography;
// const { Item, useForm } = Form;
// const { TextArea } = Input;

// type State = {
//   amount: { number: number };
//   category: "orphans" | "widows" | "ministry";
//   title: string;
//   coverPhoto: any;
//   description: string;
// };

// const { Dragger } = Upload;

// const props: UploadProps = {
//   name: "file",
//   headers: {
//     authorization: "authorization-text",
//   },
//   multiple: false,
//   listType: "picture",
//   beforeUpload: (file: RcFile) => {
//     const isPNG = file.type === "image/png";
//     const isJPG = file.type === "image/jpeg" || file.type === "image/jpg";
//     const isPDF = file.type === "application/pdf";
//     if (!(isPNG || isJPG || isPDF)) {
//       message.error(`${file.name} is not a png, jpeg, jpg or pdf file`);
//     }
//     console.log({ file });
//     return false;
//     // return isPNG || isJPG || isPDF || Upload.LIST_IGNORE;
//   },
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
//   progress: {
//     strokeColor: {
//       "0%": "#108ee9",
//       "100%": "#87d068",
//     },
//     size: 3,
//     format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
//   },
//   maxCount: 1,
//   accept: ".png,.jpeg,.jpg,application/pdf",
// };

// const Overview = ({
//   setActiveKey,
// }: {
//   setActiveKey: Dispatch<SetStateAction<string>>;
// }) => {
//   const [form] = useForm();
//   const [messageApi, contextHolder] = message.useMessage();
//   const dispatch = useAppDispatch();
//   const searchParams = useSearchParams();
//   const projectId = searchParams.get("q");
//   const { data } = useGetProjectQuery(projectId ?? skipToken);
//   const [editProject, { isLoading: editLoading, isSuccess: editSuccess }] =
//     useEditProjectMutation();
//   const [createProject, { isLoading, isSuccess: createSuccess }] =
//     useCreateProjectMutation();

//   useEffect(() => {
//     if (data?.data) {
//       form.setFieldsValue({
//         title: data.data.title,
//         amount: +data.data.targetAmount,
//         category: data.data.category,
//         description: data.data.description,
//       });
//     }
//   }, [data?.data, form]);
//   const [submittable, setSubmittable] = useState(false);
//   // Watch all values
//   const values = Form.useWatch([], form);
//   useEffect(() => {
//     form.validateFields({ validateOnly: true }).then(
//       () => {
//         setSubmittable(true);
//       },
//       () => {
//         setSubmittable(false);
//       }
//     );
//   }, [values, form]);

//   const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };

//   const onFinish = async (values: State): Promise<void> => {
//     const credentials = data
//       ? {
//           id: projectId,
//           amount: values.amount.number,
//           category: values.category,
//           title: values.title,
//           cover_photo: values.coverPhoto[0].thumbUrl,
//           description: values.description,
//         }
//       : {
//           amount: values.amount.number,
//           category: values.category,
//           title: values.title,
//           cover_photo: values.coverPhoto[0].thumbUrl,
//           description: values.description,
//         };
//     const mutationFn = data ? editProject : createProject;

//     try {
//       const res = await mutationFn(credentials).unwrap();
//       dispatch(setProjectId({ projectId: res.data.id }));
//       // form.resetFields();
//       messageApi.open({
//         content: `${res.message}`,
//         className: "[&>div]:bg-[#17B472] [&>div]:text-white",
//         icon: <CheckCircleIcon />,
//       });
//       setActiveKey((prev) => (prev = "details"));
//     } catch (error: any) {
//       messageApi.open({
//         content: `${error}`,
//         className: "[&>div]:bg-red-800 [&>div]:text-white",
//       });
//     }
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     messageApi.open({
//       content: "Form submission failed!",
//       className: "[&>div]:bg-red-800 [&>div]:text-white",
//     });
//   };
//   return (
//     <Fragment>
//       {contextHolder}
//       <Form
//         form={form}
//         name="create_new_project_form_main_details"
//         layout="vertical"
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//         className="rounded bg-white p-4"
//       >
//         <Space className="flex w-full flex-col items-start bg-white p-4 laptop:flex-row [&>div.ant-space-item]:w-full">
//           <Typography>
//             <Title
//               level={5}
//               className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
//             >
//               Main Details
//             </Title>
//             <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
//               Choose a title, goal and category for your project.
//             </Paragraph>
//           </Typography>
//           <div>
//             <Item
//               name="title"
//               label="Title"
//               className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter the project name",
//                 },
//               ]}
//             >
//               <Input
//                 placeholder="Give your project a title"
//                 type="text"
//                 className="rounded border-none bg-[#f9f9f9] py-3 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px] [&>input]:bg-inherit"
//               />
//             </Item>
//             <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
//               <Item
//                 name="category"
//                 className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
//                 label="Category"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please select a category!",
//                   },
//                 ]}
//               >
//                 <Select
//                   placeholder="-- Select --"
//                   options={[
//                     { value: "", label: "-- Select --", disabled: true },
//                     { value: "widows", label: "Widows" },
//                     { value: "orphans", label: "Orphans" },
//                     { value: "missions", label: "Missions" },
//                   ]}
//                   showSearch
//                   optionFilterProp="children"
//                   filterOption={(input, option) =>
//                     (option?.label ?? "")
//                       .toLowerCase()
//                       .includes(input.toLowerCase())
//                   }
//                   className="[&>.ant-select-selector]:h-auto  [&>.ant-select-selector]:border-none [&>.ant-select-selector]:bg-[#f9f9f9]  [&>.ant-select-selector]:py-3 [&>.ant-select-selector]:outline-none"
//                 />
//               </Item>
//               <Item
//                 name="amount"
//                 label="Goal"
//                 className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter the donation target!",
//                   },
//                 ]}
//               >
//                 <AmountInput
//                   props={{
//                     prefix: "₦",
//                     className:
//                       "rounded border-none bg-[#f9f9f9] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]",
//                   }}
//                 />
//               </Item>
//             </Space>
//             <Item
//               label="Upload cover photo"
//               className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
//               required
//             >
//               <Item
//                 name="coverPhoto"
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please upload a cover photo",
//                   },
//                 ]}
//               >
//                 <Dragger {...props}>
//                   <div className="px-1">
//                     <FileUpload />
//                     <p className="mb-0 text-primary">Upload cover photo</p>
//                     <small className="text-body-2">
//                       (.jpg, .png or .pdf file format supported)
//                     </small>
//                   </div>
//                 </Dragger>
//               </Item>
//             </Item>
//           </div>
//         </Space>
//         <Divider type="horizontal" className="my-0" />
//         <Space className="flex w-full flex-col items-start bg-white p-4 [&>div.ant-space-item]:w-full">
//           <Typography>
//             <Title
//               level={5}
//               className="mt-4 font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
//             >
//               Story
//             </Title>
//             <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
//               Describe and talk about your project.
//             </Paragraph>
//           </Typography>

//           <Item
//             className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
//             label="What is this project about?"
//             name="description"
//             rules={[
//               {
//                 required: true,
//                 message: "Please write the story about the project!",
//               },
//             ]}
//           >
//             <TextArea
//               style={{ height: 200, resize: "none" }}
//               placeholder="Write about this project..."
//               className="rounded border-none bg-[#f9f9f9] py-3 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px] [&>input]:bg-inherit"
//             />
//           </Item>
//           <Space className="w-full justify-end">
//             <Item>
//               <Button
//                 htmlType="submit"
//                 type="primary"
//                 size="large"
//                 className="flex items-center justify-center gap-1 bg-accent text-[13px] font-semibold leading-[16.38px] text-white disabled:cursor-not-allowed disabled:bg-gray-300"
//                 loading={data ? editLoading : isLoading}
//                 disabled={!submittable}
//               >
//                 {editLoading || isLoading
//                   ? "Saving"
//                   : editSuccess || createSuccess
//                   ? "Saved"
//                   : "Continue"}
//                 <ArrowRight set="light" />
//               </Button>
//             </Item>
//           </Space>
//         </Space>
//       </Form>
//     </Fragment>
//   );
// };

// export default Overview;
