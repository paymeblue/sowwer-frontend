"use client";
import { useGetAccountInfoQuery } from "services/payouts";

import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import { Button } from "@components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { InfoCircle, ArrowRight, EditSquare } from "react-iconly";
import Loader from "@components/shared/Loader";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import ConnectBankAccountDialog from "@components/dialogs/ministry/ConnectBankAccountDialog";
import { useState } from "react";
import MinstryPayoutsTable from "@components/tables/ministry/MinistryPayoutsTables";

const PayoutsPageComp = () => {
  const { data: accountInfo, isLoading } = useGetAccountInfoQuery();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MainContentWrapper title="Payouts">
      <div className="mt-4 flex h-full w-full flex-col">
        {!accountInfo?.data ? (
          <div className="w-fit rounded-[6px] bg-white p-4">
            <div className="flex space-x-2">
              <div>
                <InfoCircle />
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-body text-[.85rem] text-body-1 ">
                  Soower uses Flutterwave to securely process donations on your
                  behalf <br /> and transfer the funds you raise to your bank
                  account.
                </p>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="h-6 w-fit space-x-2 px-0 py-0 text-[.8rem] text-accent"
                    >
                      <span>Connect your Bank Account</span>
                      <ArrowRight size={18} />
                    </Button>
                  </DialogTrigger>
                  <ConnectBankAccountDialog setOpen={setOpen} defaultStep={2} />
                </Dialog>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[35%] rounded-[6px] bg-white p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-body text-[.8rem] font-[600] text-accent">
                Payout Information
              </h4>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="space-x-1.5 px-0 py-0 text-[.75rem] text-body-2"
                  >
                    <EditSquare size={15} /> <span>Edit</span>
                  </Button>
                </DialogTrigger>
                <ConnectBankAccountDialog setOpen={setOpen} defaultStep={2} />
              </Dialog>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="font-body text-[.8rem] font-[600]">
                Account number:{" "}
                <span className="font-[400]">
                  {accountInfo.data.accountNumber}
                </span>
              </p>
              <p className="font-body text-[.8rem] font-[600]">
                Account name:{" "}
                <span className="font-[400]">
                  {" "}
                  {accountInfo.data.accountName}
                </span>
              </p>
              <p className="font-body text-[.8rem] font-[600]">
                Bank name:{" "}
                <span className="font-[400]">{accountInfo.data.bank_name}</span>
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 w-full">
          <Tabs defaultValue="project-payouts" className="mt-4 w-full">
            <TabsList>
              <TabsTrigger value="project-payouts">Project Payouts</TabsTrigger>
              <TabsTrigger value="general-payouts">General Payouts</TabsTrigger>
            </TabsList>

            <TabsContent value="project-payouts">
              <MinstryPayoutsTable type="project" />
            </TabsContent>
            <TabsContent value="general-payouts">
              <MinstryPayoutsTable type="general" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainContentWrapper>
  );
};

const PayoutsPage = () => {
  return (
    <NoSSRWrapper>
      <PayoutsPageComp />
    </NoSSRWrapper>
  );
};

export default PayoutsPage;
