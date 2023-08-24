import { Fragment } from "react";

import { CheckCircleIcon } from "@components/assets/icons";
import { useAppDispatch } from "@hooks/useStore";
import { setProjectId } from "@store/reducers/utilSlice";
import {
  useCreateProjectMutation,
  useEditProjectMutation,
  useGetProjectQuery,
} from "@store/services/projects";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useSearchParams } from "next/navigation";

const { Title, Paragraph } = Typography;
const { Item, useForm } = Form;

type State = {
  amount: string;
  category: "orphans" | "widows" | "ministry";
  title: string;
};

const MainDetails = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("q");
  let id;
  if (projectId) {
    id = projectId;
  }
  const { data } = useGetProjectQuery(id);
  const [editProject, { isLoading: editLoading }] = useEditProjectMutation();
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const initialValues = data
    ? {
        title: data.data.title,
        category: data.data.category,
        amount: data.data.targetAmount.toString(),
      }
    : {
        title: "",
        category: "",
        amount: "",
      };

  const onFinish = async (values: State): Promise<void> => {
    const credentials = data
      ? {
          id: projectId,
          amount: +values.amount,
          category: values.category,
          title: values.title,
        }
      : {
          amount: +values.amount,
          category: values.category,
          title: values.title,
        };
    const mutationFn = data ? editProject : createProject;
    try {
      const res = await mutationFn(credentials).unwrap();
      console.log(res);
      dispatch(setProjectId({ projectId: res.data.id }));
      form.resetFields();
      messageApi.open({
        content: `${res.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
    } catch (error: any) {
      messageApi.open({
        content: `${error}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      content: "Form submission failed!",
      className: "[&>div]:bg-red-800 [&>div]:text-white",
    });
  };
  return (
    <Fragment>
      {contextHolder}
      <Form
        form={form}
        name="create_new_project_form_main_details"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="rounded bg-white p-4"
        initialValues={initialValues}
      >
        <Space
          className="flex w-full  flex-col items-start laptop:flex-row [&>div.ant-space-item]:w-full"
          size="large"
        >
          <Typography>
            <Title
              level={5}
              className="font-bold tablet:text-base laptop:text-[15px] laptop:leading-[18.9px]"
            >
              Main Details
            </Title>
            <Paragraph className="text-body-2 tablet:text-base laptop:text-[14px] laptop:leading-[17.64px]">
              Choose a title, goal and category for your project.
            </Paragraph>
          </Typography>
          <div>
            <Item
              name="title"
              label="Title"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  required: true,
                  message: "Please enter the project name",
                },
              ]}
            >
              <Input
                placeholder="Give your project a title"
                type="text"
                className="rounded border-none bg-[#f9f9f9] py-3 placeholder-[#555] outline-none placeholder:text-[12px] placeholder:leading-[15.62px] laptop:placeholder:text-[14px] laptop:placeholder:leading-[17.64px] [&>input]:bg-inherit"
              />
            </Item>
            <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
              <Item
                name="category"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please select a category!",
                  },
                ]}
              >
                <Select
                  placeholder="-- Select --"
                  options={[
                    { value: "", label: "-- Select --", disabled: true },
                    { value: "widows", label: "Widows" },
                    { value: "orphans", label: "Orphans" },
                    { value: "missions", label: "Missions" },
                  ]}
                  className="[&>.ant-select-selector]:h-auto  [&>.ant-select-selector]:border-none [&>.ant-select-selector]:bg-[#f9f9f9]  [&>.ant-select-selector]:py-3 [&>.ant-select-selector]:outline-none"
                />
              </Item>
              <Item
                name="amount"
                label="Goal"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                rules={[
                  {
                    required: true,
                    message: "Please enter the donation target!",
                  },
                ]}
              >
                <Input
                  prefix="₦"
                  placeholder="0.00"
                  type="text"
                  className="rounded border-none bg-[#f9f9f9] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
            </Space>
          </div>
        </Space>
        <Space className="w-full justify-end">
          <Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
              loading={data ? editLoading : isLoading}
            >
              {editLoading || isLoading ? "Saving" : "Save"}
            </Button>
          </Item>
        </Space>
        <Divider type="horizontal" className="my-0" />
      </Form>
    </Fragment>
  );
};

export default MainDetails;
