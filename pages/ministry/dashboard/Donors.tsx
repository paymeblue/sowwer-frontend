import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import MinistryGeneralDonorsTable from "@components/tables/ministry/MinistryGeneralDonorsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

const DonorsPage = () => {
  return (
    <MainContentWrapper title="Donors">
      {/* <EmptyState
        image={<Emptydonor />}
        title="No donors yet"
        desc="Once you start receiving donations your list of donors will appear here."
      /> */}
      <Tabs defaultValue="general-donors" className="mt-4 w-full">
        <TabsList>
          <TabsTrigger value="general-donors">General Donors</TabsTrigger>
          <TabsTrigger value="project-donors">Project Donors</TabsTrigger>
        </TabsList>

        <TabsContent value="general-donors">
          <MinistryGeneralDonorsTable />
        </TabsContent>
      </Tabs>
    </MainContentWrapper>
  );
};

export default DonorsPage;
