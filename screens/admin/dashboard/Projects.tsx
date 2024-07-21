import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import AdminProjectsTable from "@components/tables/admin/AdminProjectsTable";

const AdminProjectsComp = () => {
  return (
    <ContentWrapper title="Projects">
      <div className="mt-10 w-full">
        <AdminProjectsTable />
      </div>
    </ContentWrapper>
  );
};

const ProjectsPage = () => {
  return (
    <NoSSRWrapper>
      <AdminProjectsComp />
    </NoSSRWrapper>
  );
};

export default ProjectsPage;
