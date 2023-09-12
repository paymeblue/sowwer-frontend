import { Button, Form, FormInstance, Input, Space } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-iconly";

const PersonalInfo: FC<any> = ({
  form,
  next,
  prev,
}: {
  form: FormInstance<any>;
  next: () => void;
  prev: () => void;
}) => {
  const { Item } = Form;
  const { Password } = Input;
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const path = `${pathname}?${searchparams}`;
  const router = useRouter();
  const [submittable, setSubmittable] = useState(false);
  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values, form]);
  return (
    <Fragment>
      {path === "/auth/signup/ministry?step=personal-information" ? (
        <section className="mx-auto laptop:max-w-2xl">
          <Form
            form={form}
            preserve
            name="admin_info__register_form"
            layout="vertical"
            autoComplete="off"
            initialValues={{
              adminFirstName: "",
              adminLastName: "",
              adminRole: "",
              adminPhoneNumber: "",
              adminEmail: "",
              adminPassword: "",
            }}
          >
            <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
              <Item
                name="adminFirstName"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="First Name"
                  type="text"
                  className="rounded border-none bg-[#F7F8FA] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
              <Item
                name="adminLastName"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="rounded border-none bg-[#F7F8FA] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
            </Space>
            <Item
              name="adminRole"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              label="Role"
              rules={[
                {
                  required: true,
                  message: "Please input your role!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Enter your role in your ministry"
                type="text"
                className="rounded border-none bg-[#F7F8FA] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
              />
            </Item>
            <Space className="flex w-full flex-col tablet:flex-row [&>div.ant-space-item]:w-full">
              <Item
                name="adminEmail"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                label="Email Address"
                rules={[
                  {
                    type: "email",
                    message: "Email is not valid!",
                  },
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Email Address"
                  type="email"
                  className="rounded border-none bg-[#F7F8FA] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
              <Item
                name="adminPhoneNumber"
                className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    min: 11,
                    message: "A minimum of 11 digits",
                  },
                  {
                    max: 14,
                    message: "Phone number should not exceed 14 digits",
                  },
                ]}
                hasFeedback
              >
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  pattern="^\+\d{13}|\d{11}$"
                  className="rounded border-none bg-[#F7F8FA] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                />
              </Item>
            </Space>
            <Item
              name="adminPassword"
              label="Password"
              extra="Password must be at least 8 characters"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[10.91px] [&>div>div.ant-form-item-label>label]:leading-[13.75px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[13px] [&>div>div.ant-form-item-label>label]:laptop:leading-[16.38px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>.ant-form-item-extra]:text-start [&>div>div>.ant-form-item-extra]:text-[9.23px] [&>div>div>.ant-form-item-extra]:leading-[11.63px] [&>div>div>.ant-form-item-extra]:text-body-1 laptop:[&>div>div>.ant-form-item-extra]:text-[11px] laptop:[&>div>div>.ant-form-item-extra]:leading-[13.86px] [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Password too short!",
                },
                {
                  max: 16,
                  message: "Password should not exceed 16 characters",
                },
              ]}
              hasFeedback
            >
              <Password
                placeholder="Create a password"
                pattern="^.{8,16}$"
                className="rounded border-none bg-[#F7F8FA] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
              />
            </Item>
            <Space className="my-6 flex w-full items-center justify-between">
              <Item>
                <Button
                  onClick={() => {
                    router.push("/auth/signup/ministry?step=details");
                    prev();
                  }}
                  size="large"
                  className="flex items-center justify-center bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
                  icon={<ArrowLeft set="light" />}
                >
                  Back
                </Button>
              </Item>
              <Item>
                <Button
                  onClick={() => {
                    router.push("/auth/signup/ministry?step=terms");
                    next();
                  }}
                  type="primary"
                  size="large"
                  className="float-right  flex items-center justify-center gap-2 bg-accent text-[13px] font-semibold leading-[16.38px] text-white disabled:bg-gray-300"
                  disabled={!submittable}
                >
                  <span>Continue</span>
                  <ArrowRight set="light" />
                </Button>
              </Item>
            </Space>
          </Form>
        </section>
      ) : (
        <>null</>
      )}
    </Fragment>
  );
};

export default PersonalInfo;
