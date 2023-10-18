import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

const AdminMinistriesComp = () => {
  return (
    <ContentWrapper title="Ministries">
      <div>Ministries page</div>
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
