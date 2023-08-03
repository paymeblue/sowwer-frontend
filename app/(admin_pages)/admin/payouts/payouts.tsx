"use client";
import { CheckCircleIcon, EmptyWalletIcon } from "@components/assets/icons";
import Container from "@shared/Container";
import ResultComponent from "@shared/ResultComponent";
import TabList from "@shared/TabList";
import { Alert, Button, Space, TabsProps, Typography, message } from "antd";
import { useState } from "react";
import { ArrowRight, EditSquare, InfoCircle } from "react-iconly";
import CompletedProjectsTable from "./components/completed-projects";
import PayoutEditFormModal from "./components/payout-edit-modal";
import PayoutHistoryTable from "./components/payout-history";
import PayoutFormModal from "./components/payout-modal";

export type FormData = { bank: string; acct_no: string; acct_name: string };

const { Title, Text, Paragraph } = Typography;

const PayoutsPage = () => {
  const [payoutsPage, setPayoutsPage] = useState<boolean>(false);
  const [displayAcctInfo, setDisplayAcctInfo] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [connectBankModal, setConnectBankModal] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [showForm, setShowForm] = useState<boolean>(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const handleOk = () => {
    setModalOpen(false);
  };
  const showMessage = (content: string) => {
    messageApi.open({
      content,
      className: "[&>div]:bg-[#17B472] [&>div]:text-white",
      icon: <CheckCircleIcon />,
    });
  };
  const handleCancel = () => {
    setModalOpen(false);
  };
  const showConnectBankModal = () => {
    setConnectBankModal(true);
    setShowForm(true);
  };

  const [formInputs, setFormInputs] = useState<FormData>({
    bank: "",
    acct_no: "",
    acct_name: "",
  });
  const onFormData = (data: FormData) => {
    setFormInputs((prev) => ({
      ...prev,
      bank: data.bank,
      acct_no: data.acct_no,
      acct_name: data.acct_name,
    }));
    setDisplayAcctInfo(true);
  };

  const items: TabsProps["items"] = [
    {
      key: "completed-projects",
      label: "Completed Projects",
      children: (
        <CompletedProjectsTable
          onFormData={onFormData}
          acctLinked={displayAcctInfo}
        />
      ),
    },
    {
      key: "payout-history",
      label: "Payout History",
      children: <PayoutHistoryTable />,
    },
  ];
  const acctDetails = (
    <Typography>
      <Space className="w-full flex-col items-start tablet:flex-row tablet:items-center">
        <Title
          level={5}
          className="m-0 text-[12px] font-semibold leading-[20px]"
        >
          Account number:
        </Title>
        <Paragraph className="m-0 text-[12px] leading-[20px]">
          &nbsp;{formInputs.acct_no}
        </Paragraph>
      </Space>
      <Space className="w-full flex-col items-start tablet:flex-row tablet:items-center">
        <Title
          level={5}
          className="m-0 text-[12px] font-semibold leading-[20px]"
        >
          Account name:
        </Title>
        <Paragraph className="m-0 text-[12px] leading-[20px]">
          &nbsp;{formInputs.acct_name}
        </Paragraph>
      </Space>
      <Space className="w-full flex-col items-start tablet:flex-row tablet:items-center">
        <Title
          level={5}
          className="m-0 text-[12px] font-semibold leading-[20px]"
        >
          Bank name:
        </Title>
        <Paragraph className="m-0 text-[12px] leading-[20px]">
          &nbsp;{formInputs.bank}
        </Paragraph>
      </Space>
    </Typography>
  );
  return (
    <Container className="bg-[#F7F8FA] tablet:px-4">
      {contextHolder}
      {modalOpen && (
        <PayoutEditFormModal
          modalOpen={modalOpen}
          handleOk={handleOk}
          msg={() => showMessage("Account Info updated successfully!")}
          handleCancel={handleCancel}
          onFormData={onFormData}
          initialData={formInputs}
        />
      )}
      {connectBankModal && (
        <PayoutFormModal
          modalOpen={connectBankModal}
          msg={() => showMessage("Account connected successfully!")}
          setModalOpen={setConnectBankModal}
          onFormData={onFormData}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
      <Title
        level={2}
        onClick={() => setPayoutsPage(true)}
        className="leading-30.24px] text-[24px] font-bold"
      >
        Payouts
      </Title>
      {!displayAcctInfo ? (
        <Alert
          message={
            <Paragraph className="text-[13px] leading-[18px] text-body-1">
              Soower uses Flutterwave to securely process donations on your
              behalf and transfer the funds you raise to your bank account.
            </Paragraph>
          }
          description={
            <Button
              type="link"
              onClick={showConnectBankModal}
              className="flex items-center justify-center gap-2 p-0 text-[13px] font-semibold leading-[18px]"
            >
              Connect your Bank Account
              <ArrowRight set="light" />
            </Button>
          }
          icon={<InfoCircle set="light" primaryColor="black" />}
          showIcon
          banner
          className="flex-start w-full rounded bg-white text-left tablet:flex-row laptop:w-3/5"
        />
      ) : (
        <Alert
          message={
            <Title
              level={5}
              className="text-[13px] font-semibold leading-[18px] text-accent"
            >
              Payout Information
            </Title>
          }
          description={acctDetails}
          action={
            <Button type="text" onClick={showModal}>
              <Space className="flex w-full items-start justify-center">
                <EditSquare set="light" size={15} />
                <Paragraph className="mb-0 text-[11px] leading-[15px]">
                  Edit
                </Paragraph>
              </Space>
            </Button>
          }
          banner
          className="w-full rounded bg-white laptop:w-1/2"
          showIcon={false}
        />
      )}
      {!payoutsPage ? (
        <ResultComponent
          title={
            <Title className="text-[18px] font-bold leading-[22.68px]">
              No payouts yet
            </Title>
          }
          subTitle={
            <Text className="text-[13px] leading-[19px] text-gray-500">
              None of your projects have been completed. Once they're completed,
              you will see a list of <br /> your completed projects and be able
              to request payouts after adding your payout details.
            </Text>
          }
          icon={<EmptyWalletIcon />}
        />
      ) : (
        <TabList items={items} />
      )}
    </Container>
  );
};

export default PayoutsPage;
