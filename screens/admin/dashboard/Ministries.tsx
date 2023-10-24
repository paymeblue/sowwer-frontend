import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import AdminMinistriesTable from "@components/tables/admin/AdminMinistriesTable";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@components/ui/tabs";

const AdminMinistriesComp = () => {
  return (
    <ContentWrapper title="Ministries">
      <Tabs defaultValue="unverified" className="mt-4 w-full">
        <TabsList>
          <TabsTrigger value="unverified">Unverified Accounts</TabsTrigger>
          <TabsTrigger value="verified">Verified Accounts</TabsTrigger>
        </TabsList>
        <TabsContent value="unverified">
          <NoSSRWrapper>
            <AdminMinistriesTable status="unverified" />
          </NoSSRWrapper>
        </TabsContent>
        <TabsContent value="verified">
          <NoSSRWrapper>
            <AdminMinistriesTable status="verified" />
          </NoSSRWrapper>
        </TabsContent>
      </Tabs>
    </ContentWrapper>
  );
};

const MinistriesPage = () => {
  return (
    <NoSSRWrapper>
      <AdminMinistriesComp />
    </NoSSRWrapper>
  );
};

export default MinistriesPage;
