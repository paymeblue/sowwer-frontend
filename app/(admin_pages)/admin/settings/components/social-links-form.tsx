import { GlobalOutlined } from "@ant-design/icons";
import {
  CheckCircleIcon,
  FacebookIcon,
  InstaColorIcon,
  LinkedInColorIcon,
  TwitterColorIcon,
  YoutubeColorIcon,
} from "@components/assets/icons";
import {
  useGetSocialLinksQuery,
  useUpdateSocialLinksMutation,
} from "@store/services/ministries";
import { UpdateSocialLinksRequest } from "@store/types";
import { Button, Form, Input, Space, message } from "antd";
import { Fragment, useEffect } from "react";

const { Item, useForm } = Form;

const SocialLinksForm = ({ id }: { id?: string }) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [updateSocialLinks, { isLoading }] = useUpdateSocialLinksMutation();
  const { data: socialLinks } = useGetSocialLinksQuery(id);
  useEffect(() => {
    if (socialLinks?.data) {
      form.setFieldsValue({
        website: socialLinks.data.website,
        facebook: socialLinks.data.facebook,
        instagram: socialLinks.data.instagram,
        twitter: socialLinks.data.twitter,
        linkedin: socialLinks.data.linkedin,
        youtube: socialLinks.data.youtube,
      });
    }
  }, [socialLinks?.data, form]);
  const initialValues = {
    website: "https://",
    facebook: "https://",
    instagram: "https://",
    twitter: "https://",
    linkedin: "https://",
    youtube: "https://",
  };
  let formIsValid = false;
  const website = Form.useWatch("website", form);
  const facebook = Form.useWatch("facebook", form);
  const instagram = Form.useWatch("instagram", form);
  const twitter = Form.useWatch("twitter", form);
  const linkedin = Form.useWatch("linkedin", form);
  const youtube = Form.useWatch("youtube", form);

  if (
    website &&
    facebook &&
    instagram &&
    twitter &&
    linkedin &&
    youtube !== "https://"
  ) {
    formIsValid = true;
  }
  const onFinish = async (values: UpdateSocialLinksRequest): Promise<void> => {
    console.log("Form data: ", values);
    try {
      const res = await updateSocialLinks(values).unwrap();
      // form.resetFields();
      messageApi.open({
        content: `${res.message}`,
        className: `[&>div]:bg-[#17B472] [&>div]:text-white`,
        icon: <CheckCircleIcon />,
      });
    } catch (error) {
      messageApi.open({
        content: `${error}`,
        className: `[&>div]:bg-red [&>div]:text-white`,
      });
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
        name="admin_social_links_form"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={initialValues}
      >
        <Item
          name="website"
          label="Website"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          rules={[
            {
              type: "url",
            },
          ]}
        >
          <Input
            placeholder="fwcabuja.org"
            type="text"
            prefix={<GlobalOutlined style={{ fontSize: 20 }} />}
            className="rounded border-none bg-[#f9f9f9] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
          />
        </Item>
        <Item
          name="facebook"
          label="Facebook"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          rules={[
            {
              type: "url",
            },
          ]}
        >
          <Input
            placeholder="Enter Facebook URL"
            type="text"
            prefix={<FacebookIcon style={{ color: "#1877F2" }} />}
            className="rounded border-none bg-[#f9f9f9] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
          />
        </Item>
        <Item
          name="instagram"
          label="Instagram"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          rules={[
            {
              type: "url",
            },
          ]}
        >
          <Input
            placeholder="Enter Instagram URL"
            prefix={<InstaColorIcon />}
            type="text"
            className="rounded border-none bg-[#f9f9f9] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
          />
        </Item>
        <Item
          name="twitter"
          label="Twitter"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          rules={[
            {
              type: "url",
            },
          ]}
        >
          <Input
            placeholder="Enter Twitter URL"
            prefix={<TwitterColorIcon />}
            type="text"
            className="rounded border-none bg-[#f9f9f9] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
          />
        </Item>
        <Item
          name="linkedin"
          label="LinkedIn"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          rules={[
            {
              type: "url",
            },
          ]}
        >
          <Input
            placeholder="Enter LinkedIn URL"
            prefix={<LinkedInColorIcon />}
            type="text"
            className="rounded border-none bg-[#f9f9f9] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
          />
        </Item>
        <Item
          name="youtube"
          label="Youtube"
          className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
          rules={[
            {
              type: "url",
            },
          ]}
        >
          <Input
            placeholder="Enter YouTube URL"
            prefix={<YoutubeColorIcon />}
            type="text"
            className="rounded border-none bg-[#f9f9f9] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
          />
        </Item>
        <Space className="w-full justify-end">
          <Button
            htmlType="submit"
            size="large"
            className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            loading={isLoading}
            disabled={!formIsValid}
          >
            {isLoading ? "Saving" : "Save"}
          </Button>
        </Space>
      </Form>
    </Fragment>
  );
};

export default SocialLinksForm;
