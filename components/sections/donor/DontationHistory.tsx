import {
  DonorProjectDonationsTable,
  DonorGeneralDonationsTable,
} from "@components/tables/donors/DonorDonationsTables";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

const DonationHistory = () => {
  return (
    <Tabs
      defaultValue="project-donations"
      className="mt-4 flex w-full flex-col lg:flex-row"
    >
      <TabsList orientation="vertical">
        <TabsTrigger orientation="vertical" value="project-donations">
          Project Donations
        </TabsTrigger>
        <TabsTrigger orientation="vertical" value="general-donations">
          Ministry Donations
        </TabsTrigger>
      </TabsList>
      <TabsContent orientation="vertical" value="project-donations">
        <DonorProjectDonationsTable />
      </TabsContent>
      <TabsContent orientation="vertical" value="general-donations">
        <DonorGeneralDonationsTable />
      </TabsContent>
    </Tabs>
  );
};

export default DonationHistory;
