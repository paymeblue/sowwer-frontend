import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import AdminCouncilTable from "@components/tables/admin/AdminCouncilTable";

const AdminCouncilComp = () => {
  return (
    <ContentWrapper title="Council">
      <div className="mt-10 w-full max-w-[1100px]">
        <AdminCouncilTable />
      </div>
    </ContentWrapper>
  );
};

const CouncilPage = () => {
  return (
    <NoSSRWrapper>
      <AdminCouncilComp />
    </NoSSRWrapper>
  );
};

export default CouncilPage;
