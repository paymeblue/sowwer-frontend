import {
  useGetAccountInfoQuery,
  useGetBanksQuery,
  useVerifyAccountMutation,
} from "@store/services/payouts";
import { Button, Form, Input, Modal, Select, Space, Typography } from "antd";
import { ChangeEvent, Fragment, useCallback, useMemo, useState } from "react";

type Props = {
  modalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  msg: (data: { status: "success" | "fail"; message: string }) => void;
};
const { Title, Paragraph } = Typography;
const { Item, useForm } = Form;

const PayoutEditFormModal = ({
  modalOpen,
  handleOk,
  handleCancel,
  msg,
}: Props) => {
  const [form] = useForm();
  const [acctNo, setAcctNo] = useState<string>("");
  const regexPattern = useMemo(() => /^\d{10}$/, []);
  const { data: res } = useGetAccountInfoQuery();
  const { data, isLoading } = useGetBanksQuery();
  const [verifyAccount, { isLoading: sendLoading }] =
    useVerifyAccountMutation();
  const acctHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAcctNo(e.target.value);
  }, []);

  const onFinish = async (values: any): Promise<void> => {
    try {
      const res = await verifyAccount({
        account_number: values.acctNo,
        bank_id: "44",
      }).unwrap();
      console.log(res);
      // form.resetFields();
      msg({ status: "success", message: res.message });
      handleCancel();
    } catch (error: any) {
      msg({ status: "fail", message: error });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Modal
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={550}
        footer={null}
      >
        <Title className="text-[18px] font-bold leading-[23px]">
          Update Bank Information
        </Title>
        <Paragraph className="text-[14px] leading-[26px] text-body-1">
          Please update your bank account details below to receive payouts.
        </Paragraph>
        <Form
          form={form}
          name="create_new_project_form_main_details"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            bank: res?.data.bank_name,
            acctNo: res?.data.accountNumber,
          }}
          className="rounded bg-white p-4"
        >
          <Space
            className="flex w-full flex-col items-start justify-center tablet:flex-row [&>div.ant-space-item]:w-full"
            size="large"
          >
            <Item
              name="bank"
              className="mb-0 [&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              label="Select Bank"
              rules={[
                {
                  required: true,
                  message: "Please select a bank!",
                },
              ]}
            >
              <Select
                placeholder="-- Select --"
                options={data?.data.map((item) => ({
                  value: item.code,
                  label: item.name,
                }))}
                disabled={isLoading}
                className="[&>.ant-select-selector]:h-auto  [&>.ant-select-selector]:border-none [&>.ant-select-selector]:bg-[#f9f9f9]  [&>.ant-select-selector]:py-3 [&>.ant-select-selector]:outline-none"
              />
            </Item>
            <Item
              name="acctNo"
              label="Account number"
              className="mb-0 [&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              rules={[
                {
                  required: true,
                  message: "Please enter your account number",
                  pattern: regexPattern,
                },
              ]}
            >
              <Input
                placeholder="Account number"
                value={acctNo}
                onChange={acctHandler}
                className="rounded border-none bg-[#F9f9f9] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
              />
            </Item>
          </Space>
          <Space className="m-0 w-full flex-row justify-end p-0">
            <Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="mt-3 bg-accent text-[13px] leading-[16px] text-white"
                loading={sendLoading}
              >
                {sendLoading ? "Updating" : "Update Bank Information"}
              </Button>
            </Item>
          </Space>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PayoutEditFormModal;
