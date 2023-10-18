import ContentWrapper from "@components/shared/Layouts/Admin/ContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

const PayoutsComp = () => {
  return (
    <ContentWrapper title="Payouts">
      <div>Ministries page</div>
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
