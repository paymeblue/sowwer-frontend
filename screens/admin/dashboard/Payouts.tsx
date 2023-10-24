import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import AdminPayoutsTable from "@components/tables/admin/AdminPayoutsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

const PayoutsComp = () => {
  return (
    <ContentWrapper title="Payouts">
      <Tabs defaultValue="project" className="mt-4 w-full">
        <TabsList>
          <TabsTrigger value="project">Project Payouts</TabsTrigger>
          <TabsTrigger value="general">General Payouts</TabsTrigger>
        </TabsList>
        <TabsContent value="project">
          <AdminPayoutsTable type="project" />
        </TabsContent>
        <TabsContent value="general">
          <AdminPayoutsTable type="ministry" />
        </TabsContent>
      </Tabs>
    </ContentWrapper>
  );
};

const PayoutsPage = () => {
  return (
    <NoSSRWrapper>
      <PayoutsComp />
    </NoSSRWrapper>
  );
};

export default PayoutsPage;
