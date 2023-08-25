import { PlusOutlined } from "@ant-design/icons";
import {
  CheckCircleIcon,
  MastercardIcon,
  VisacardIcon,
} from "@components/assets/icons";
import ResultComponent from "@shared/ResultComponent";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { Fragment, useId, useState } from "react";

const { Paragraph } = Typography;
const { Password } = Input;
const { Item, useForm } = Form;
const PaymentMethods = () => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [cardDetails, setCardDetails] = useState([
    {
      key: useId(),
      cardType: "MasterCard",
      cardIcon: <MastercardIcon />,
      lastDigits: "2244",
      expiryDate: "10/24",
    },
    {
      key: useId(),
      cardType: "VisaCard",
      cardIcon: <VisacardIcon />,
      lastDigits: "2341",
      expiryDate: "12/25",
    },
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const removeHandler = (id: string) => {
    const updatedCardDetails = cardDetails.filter((item) => item.key !== id);
    setCardDetails(updatedCardDetails);
  };

  const onFinish = async (values: any): Promise<void> => {
    setIsLoading(true);
    console.log("Form data: ", values);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating an asynchronous operation
    setIsLoading(false);
    messageApi.open({
      content: `New card added!`,
      className: "[&>div]:bg-[#17B472] [&>div]:text-white",
      icon: <CheckCircleIcon />,
    });
    // let cardIcon;
    // if (values.cardType === "Mastercard") {
    //   cardIcon = <MastercardIcon />;
    // } else {
    //   cardIcon = <VisacardIcon />;
    // }
    // const newCard: any = {
    //   key: Date.now().toString(),
    //   cardType: values.cardType,
    //   cardIcon,
    //   lastDigits: values.cardNumber.slice(-4),
    //   expiryDate: values.cardExpires,
    // };
    // setCardDetails((prev) => [newCard, prev]);
    // // form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      content: "Form submission failed!",
      className: "[&>div]:bg-red-800 [&>div]:text-white",
    });
  };

  return (
    <Card className="w-full laptop:w-1/2" bordered={false}>
      {contextHolder}
      <Modal
        open={isModalOpen}
        title="Add New Card"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="add_payment_card"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="my-6"
        >
          <Item
            name="cardType"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            label="Card Type"
            rules={[{ required: true, message: "Select card type" }]}
          >
            <Select
              placeholder="-- Select --"
              options={[
                { value: "Mastercard", label: "Mastercard" },
                { value: "Visacard", label: "Visacard" },
              ]}
              className="[&>.ant-select-selector]:h-auto  [&>.ant-select-selector]:border-none [&>.ant-select-selector]:bg-gray-100  [&>.ant-select-selector]:py-2 [&>.ant-select-selector]:outline-none"
            />
          </Item>
          <Item
            name="cardNumber"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            label="Card Number"
            rules={[{ required: true, message: "Enter card number" }]}
          >
            <Input
              placeholder="Enter your card number"
              type="text"
              required
              className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
            />
          </Item>
          <Space>
            <Item
              name="cardExpires"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              label="Expiry Date"
              rules={[{ required: true, message: "Enter expiry date" }]}
            >
              <Input
                placeholder="12/32"
                type="text"
                required
                className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
              />
            </Item>
            <Item
              name="cardCvv"
              className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:leading-[15.12px] after:[&>div>div.ant-form-item-label>label]:content-none [&>div>div.ant-form-item-label>label]:laptop:text-[14px] [&>div>div.ant-form-item-label>label]:laptop:leading-[17.64px]  [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
              label="Cvv"
              rules={[{ required: true, message: "Enter card cvv" }]}
            >
              <Password
                placeholder="***"
                className="rounded border-none bg-[#F7F8FA] py-3 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[14px] laptop:placeholder:[&>input]:leading-[17.64px]"
              />
            </Item>
          </Space>
          <Space className="w-full justify-end">
            <Item>
              <Button
                size="large"
                type="primary"
                className="bg-accent text-[13px] font-semibold leading-[16.38px] text-white"
                htmlType="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving" : "Add"}
              </Button>
            </Item>
          </Space>
        </Form>
      </Modal>
      {cardDetails.length === 0 ? (
        <Fragment>
          <ResultComponent title="No cards added yet!" />
          <Space className="w-full justify-center">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className=" m-auto text-[13px] leading-[16.38px]"
              onClick={showModal}
            >
              Add new card
            </Button>
          </Space>
        </Fragment>
      ) : (
        <Fragment>
          <table>
            <tbody>
              {cardDetails.map((card) => (
                <tr key={card.key}>
                  <td className="w-[15%]">{card.cardIcon}</td>
                  <td className="w-[70%]">
                    <Paragraph className="laptop:text-[13px] laptop:leading-[16.38px]">
                      {card.cardType} ending in {card.lastDigits} expires &nbsp;
                      {card.expiryDate}
                    </Paragraph>
                  </td>
                  <td className="w-[15%]">
                    <Button danger onClick={() => removeHandler(card.key)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Space className="mt-4 flex w-full justify-end">
            <Button
              type="link"
              icon={<PlusOutlined />}
              className=" m-auto w-full laptop:text-[13px] laptop:leading-[16.38px]"
              onClick={showModal}
            >
              Add new card
            </Button>
          </Space>
        </Fragment>
      )}
    </Card>
  );
};

export default PaymentMethods;
