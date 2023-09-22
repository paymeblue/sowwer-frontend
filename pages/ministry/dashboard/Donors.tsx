import Emptydonor from "@components/assets/svg/emptyDonor";
import EmptyState from "@components/shared/EmptyState";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";

const DonorsPage = () => {
  return (
    <MainContentWrapper title="Donors">
      <EmptyState
        image={<Emptydonor />}
        title="No donors yet"
        desc="Once you start receiving donations your list of donors will appear here."
      />
    </MainContentWrapper>
  );
};

export default DonorsPage;
