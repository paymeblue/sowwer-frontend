"use client";

import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import {
  MinistryCompletedProjectsTable,
  MinistryPayoutHistryTable,
} from "@components/tables/ministry/MinistryPayoutsTables";
import { Button } from "@components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { InfoCircle, ArrowRight } from "react-iconly";

const PayoutsPage = () => {
  return (
    <MainContentWrapper title="Payouts">
      <div className="mt-4 flex h-full w-full flex-col">
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
              <Button
                variant="link"
                className="h-6 w-fit space-x-2 px-0 py-0 text-[.8rem] text-accent"
              >
                <span>Connect your Bank Account</span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="flex  flex-1 items-center justify-center">
          <EmptyState
            image={<EmptyWallet />}
            title="No payouts yet"
            desc="None of your projects have been completed. Once they’re completed, you will see a list of your completed projects and be able to request payouts after adding your payout details."
          />
        </div> */}
        <div className="mt-6 w-full">
          <Tabs defaultValue="completed-projects" className="mt-4 w-full">
            <TabsList>
              <TabsTrigger value="completed-projects">
                Completed Projects
              </TabsTrigger>
              <TabsTrigger value="payout-history">Payout History</TabsTrigger>
            </TabsList>

            <TabsContent value="completed-projects">
              <MinistryCompletedProjectsTable />
            </TabsContent>
            <TabsContent value="payout-history">
              <MinistryPayoutHistryTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainContentWrapper>
  );
};

export default PayoutsPage;
