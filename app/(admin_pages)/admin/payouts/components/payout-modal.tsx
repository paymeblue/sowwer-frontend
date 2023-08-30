import {
  useGetBanksQuery,
  useSaveAccountMutation,
  useVerifyAccountMutation,
} from "@store/services/payouts";
import {
  Button,
  Form,
  Input,
  Modal,
  Result,
  Select,
  Space,
  Typography,
} from "antd";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { InfoCircle } from "react-iconly";

const { Title, Text, Paragraph } = Typography;
const { Item, useForm } = Form;
type State = {
  accountName: string;
  accountNo: string;
  bankId: string;
  ref?: string;
};
type Props = {
  modalOpen: boolean;
  msg: (data: { status: "success" | "fail"; message: string }) => void;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const PayoutFormModal = ({
  modalOpen,
  showForm,
  setShowForm,
  msg,
  setModalOpen,
}: Props) => {
  const [showAcctName, setShowAcctName] = useState<boolean>(false);
  const [form] = useForm();
  // const regex = /^\d{9}$/;
  const regexPattern = useMemo(() => /^\d{9}$/, []);

  const { data, isLoading } = useGetBanksQuery();
  const [verifyAccount, { isLoading: verifyLoading }] =
    useVerifyAccountMutation();
  const [saveAccount, { isLoading: sendLoading }] = useSaveAccountMutation();
  const showFormHandler = useCallback(() => setShowForm(true), [setShowForm]);
  const [formdata, setFormdata] = useState<State>({
    accountNo: "",
    accountName: "",
    bankId: "",
    ref: "",
  });

  const isMatchingAccountNumber = regexPattern.test(formdata.accountNo);

  const fetchAccountDetails = async () => {
    if (isMatchingAccountNumber) {
      try {
        const res = await verifyAccount({
          account_number: "0690000032",
          // account_number: formdata.accountNo,
          bank_code: "044",
        }).unwrap();

        console.log(res);

        setFormdata((prev) => ({
          ...prev,
          accountName: res.data.accountName,
          ref: res.data.reference,
        }));

        setShowAcctName(true);
      } catch (error: any) {
        msg({ status: "fail", message: error });
      }
    }
  };

  const handleOk = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const onFinish = async (values: any): Promise<void> => {
    setFormdata((prev) => ({
      ...prev,
      accountNo: values.acctNo,
      bankId: values.bank,
    }));
    try {
      const res = await saveAccount({
        reference: formdata.ref,
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
        {showForm ? (
          <>
            <Title
              level={4}
              className="mb-0 text-[16px] font-semibold leading-[20.16px]"
            >
              Connect Your Bank Account
            </Title>
            <Text className="text-[13px] leading-[16.38px] text-body-1">
              Please enter your bank account details below to receive payouts.
            </Text>
            <Form
              form={form}
              name="create_new_project_form_main_details"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="rounded bg-white p-4"
            >
              <Space
                className="flex w-full flex-col items-start justify-center tablet:flex-row [&>div.ant-space-item]:w-full"
                size="large"
              >
                <Item
                  name="bank"
                  className="mb-0 [&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  label="Select bank"
                  rules={[
                    {
                      required: true,
                      message: "Please select a bank!",
                    },
                  ]}
                >
                  <Select
                    placeholder="-- Select bank --"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={data?.data.map((item) => ({
                      value: item.code,
                      label: item.name,
                    }))}
                    disabled={isLoading || verifyLoading}
                    className="[&>.ant-select-selector]:h-auto  [&>.ant-select-selector]:border-none [&>.ant-select-selector]:bg-[#f9f9f9]  [&>.ant-select-selector]:py-2 [&>.ant-select-selector]:outline-none"
                  />
                </Item>
                <Item
                  name="acctNo"
                  label="Account number"
                  className="mb-0 [&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
                  rules={[
                    {
                      pattern: /^\d{10}$/,
                      message:
                        "Please enter a valid account number with up to 10 digits",
                    },
                  ]}
                >
                  <Input
                    placeholder="Account number"
                    value={formdata.accountNo}
                    disabled={verifyLoading}
                    onChange={async (e) => {
                      setFormdata((prev) => ({
                        ...prev,
                        accountNo: e.target.value,
                      }));
                      await fetchAccountDetails();
                    }}
                    className="rounded border-none bg-[#F9f9f9] py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
                  />
                </Item>
              </Space>
              <Space className="m-0 w-full flex-row justify-end p-0">
                <Item>
                  {showAcctName && (
                    <Text className="mb-4 block text-accent">
                      {formdata.accountName}
                    </Text>
                  )}
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className="mt-2 bg-accent text-[13px] leading-[16px] text-white"
                    loading={sendLoading}
                  >
                    {sendLoading ? "Connecting" : "Connect Bank Account"}
                  </Button>
                </Item>
              </Space>
            </Form>
          </>
        ) : (
          <Result
            status="error"
            title={
              <Title className="text-[18px] font-bold leading-[23px]">
                Connect Your Bank Account
              </Title>
            }
            subTitle={
              <Paragraph className="text-[14px] leading-[26px] text-body-1">
                In order to request a payout, please connect your bank account.
              </Paragraph>
            }
            icon={
              <InfoCircle
                set="light"
                size={75}
                style={{ margin: "auto" }}
                primaryColor="#EB5757"
              />
            }
            extra={
              <Button
                type="primary"
                key="console"
                onClick={showFormHandler}
                className="mt-0 bg-accent text-[13px] leading-[16px] text-white"
                size="large"
              >
                Connect Bank Account
              </Button>
            }
          />
        )}
      </Modal>
    </Fragment>
  );
};

export default PayoutFormModal;
