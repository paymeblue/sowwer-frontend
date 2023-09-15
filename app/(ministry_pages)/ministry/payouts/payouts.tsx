"use client";
import { CheckCircleIcon } from "@components/assets/icons";
import Container from "@shared/Container";
import TabList from "@shared/TabList";
import { useGetAccountInfoQuery } from "@store/services/payouts";
import { Alert, Button, Space, TabsProps, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { ArrowRight, EditSquare, InfoCircle } from "react-iconly";
import CompletedProjectsTable from "./components/completed-projects";
// import GeneralDonationsTable from "./components/general-donations";
import PayoutEditFormModal from "./components/payout-edit-modal";
import PayoutHistoryTable from "./components/payout-history";
import PayoutFormModal from "./components/payout-modal";

const { Title, Paragraph } = Typography;

const PayoutsPage = () => {
  const [displayAcctInfo, setDisplayAcctInfo] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [connectBankModal, setConnectBankModal] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [showForm, setShowForm] = useState<boolean>(false);
  const { data: res } = useGetAccountInfoQuery();

  const showModal = () => {
    setModalOpen(true);
  };

  const handleOk = () => {
    setModalOpen(false);
  };
  const showMessage = (content: {
    status: "success" | "fail";
    message: string;
  }) => {
    if (content.status === "success")
      messageApi.open({
        content: content.message,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleIcon />,
      });
    else
      messageApi.open({
        content: content.message,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
  };
  const handleCancel = () => {
    setModalOpen(false);
  };
  const showConnectBankModal = () => {
    setConnectBankModal(true);
    setShowForm(true);
  };

  useEffect(() => {
    if (res) setDisplayAcctInfo(true);
  }, [res]);

  const items: TabsProps["items"] = [
    {
      key: "completed-projects",
      label: "Completed Projects",
      children: <CompletedProjectsTable acctLinked={displayAcctInfo} />,
    },
    // {
    //   key: "general-donations",
    //   label: "General Donations",
    //   children: <GeneralDonationsTable acctLinked={displayAcctInfo} />,
    // },
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
          &nbsp;{res?.data.accountNumber}
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
          &nbsp;{res?.data.accountName}
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
          &nbsp;{res?.data.bank_name}
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
          msg={(info) => showMessage(info)}
          handleCancel={handleCancel}
        />
      )}
      {connectBankModal && (
        <PayoutFormModal
          modalOpen={connectBankModal}
          msg={(info) => showMessage(info)}
          setModalOpen={setConnectBankModal}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
      <Title level={2} className="text-[24px] font-bold leading-[30.24px]">
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
          className="flex w-full flex-col-reverse rounded bg-white mobile-md:flex-row laptop:w-1/2 "
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
          showIcon={false}
        />
      )}
      <TabList items={items} />
    </Container>
  );
};

export default PayoutsPage;
