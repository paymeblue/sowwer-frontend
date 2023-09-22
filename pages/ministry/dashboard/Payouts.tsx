import EmptyWallet from "@components/assets/svg/emptyWallet";
import EmptyState from "@components/shared/EmptyState";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";

const PayoutsPage = () => {
  return (
    <MainContentWrapper title="Donors">
      <EmptyState
        image={<EmptyWallet />}
        title="No payouts yet"
        desc="None of your projects have been completed. Once they’re completed, you will see a list of your completed projects and be able to request payouts after adding your payout details."
      />
    </MainContentWrapper>
  );
};

export default PayoutsPage;
