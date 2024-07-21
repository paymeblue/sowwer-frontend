import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import AdminMissionsRegistryTable from "@components/tables/admin/AdminMissionsRegistryTable";
import AdminOrphanageTable from "@components/tables/admin/AdminOrphanageTable";
import AdminWidowRegistryTable from "@components/tables/admin/AdminWidowRegistryTable";
// import AdminPayoutsTable from "@components/tables/admin/AdminPayoutsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

const RegistryComp = () => {
  return (
    <ContentWrapper title="Registry">
      <Tabs defaultValue="widows" className="mt-4 w-full">
        <TabsList>
          <TabsTrigger value="widows">Widows</TabsTrigger>
          <TabsTrigger value="missionaries">Missionaries</TabsTrigger>
          <TabsTrigger value="orphanages">Orphanages</TabsTrigger>
        </TabsList>
        <TabsContent value="widows">
          <AdminWidowRegistryTable />
        </TabsContent>
        <TabsContent value="missionaries">
          <AdminMissionsRegistryTable />
        </TabsContent>
        <TabsContent value="orphanages">
          <AdminOrphanageTable />
        </TabsContent>
      </Tabs>
    </ContentWrapper>
  );
};

const RegistryPage = () => {
  return (
    <NoSSRWrapper>
      <RegistryComp />
    </NoSSRWrapper>
  );
};

export default RegistryPage;
