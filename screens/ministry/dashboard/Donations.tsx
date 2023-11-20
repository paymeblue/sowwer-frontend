"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import MinistryGeneralDonorsTable from "@components/tables/ministry/MinistryGeneralDonorsTable";
import {
  MinistryOutgoingGeneralDonationsTable,
  MinistryOutgoingProjectDonationsTable,
} from "@components/tables/ministry/MinistryOutgoingDonationsTables";
import MinistryProjectDonorsTable from "@components/tables/ministry/MinistryProjectDonorsTable";
import { Button } from "@components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import useUserAuth from "@hooks/auth/useUserAuth";
import Link from "next/link";

const IncomingDonations = () => {
  return (
    <Tabs defaultValue="general-donors" className="mt-4 w-full">
      <TabsList variant="line">
        <TabsTrigger value="general-donors" variant="line">
          General
        </TabsTrigger>
        <TabsTrigger value="project-donors" variant="line">
          Project
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general-donors">
        <MinistryGeneralDonorsTable />
      </TabsContent>
      <TabsContent value="project-donors">
        <MinistryProjectDonorsTable />
      </TabsContent>
    </Tabs>
  );
};

const OutgoingDonations = () => {
  return (
    <Tabs defaultValue="general-donors" className="mt-4 w-full">
      <TabsList variant="line">
        <TabsTrigger value="general-donors" variant="line">
          General
        </TabsTrigger>
        <TabsTrigger value="project-donors" variant="line">
          Project
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general-donors">
        <MinistryOutgoingGeneralDonationsTable />
      </TabsContent>
      <TabsContent value="project-donors">
        <MinistryOutgoingProjectDonationsTable />
      </TabsContent>
    </Tabs>
  );
};

const DonationsPage = () => {
  const { user } = useUserAuth();
  if (!user?.ministry?.verificationStatus) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="Pending Verification"
        desc="Your ministry is still awaiting verification. Please hang tight while we verify, afterwards you can view your donors"
        action={
          <Link href="mailto:info@soower.com">
            <Button variant="secondary">Contact Support</Button>
          </Link>
        }
      />
    );
  }
  return (
    <MainContentWrapper title="Donations">
      <Tabs defaultValue="incoming-donations" className="mt-4 w-full">
        <TabsList>
          <TabsTrigger value="incoming-donations">Received</TabsTrigger>
          <TabsTrigger value="outgoing-donations">Sent</TabsTrigger>
        </TabsList>

        <TabsContent value="incoming-donations">
          <IncomingDonations />
        </TabsContent>
        <TabsContent value="outgoing-donations">
          <OutgoingDonations />
        </TabsContent>
        {/* <TabsContent value="outgoing-donations">
          <MinistryProjectDonorsTable />
        </TabsContent> */}
      </Tabs>
    </MainContentWrapper>
  );
};

export default DonationsPage;
