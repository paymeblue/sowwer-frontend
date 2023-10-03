import DonationCard from "@components/cards/DonationCard";
import moment from "moment";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { useGetMinistryProjectDonorsQuery } from "services/projects";
import usePagination from "@hooks/general/usePagination";
import Pagination from "@components/shared/Pagination";
import { useEffect } from "react";

interface Props {
  projectId: string;
  title: string;
}
const ViewProjectDonorsDialog = ({ projectId, title }: Props) => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const {
    data: projectDonors,
    isLoading,
    isFetching,
  } = useGetMinistryProjectDonorsQuery({
    id: projectId,
    page: pagination.current,
  });
  const sortedProjectDonors = projectDonors?.data
    ?.map((item) => ({ ...item, time: moment(item.createdAt).fromNow() }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  useEffect(() => {
    return () => {
      document.body.classList.add("activate-cursor");
    };
  }, []);

  return (
    <DialogContent>
      <DialogHeader className="">
        <DialogTitle className="font-body capitalize">
          {title} donors
        </DialogTitle>
      </DialogHeader>
      {sortedProjectDonors?.length ? (
        <div className="mt-4 flex w-full flex-col space-y-6">
          {sortedProjectDonors?.map((donor) => {
            const { amount, name, id, time } = donor;
            return (
              <DonationCard
                key={id}
                name={name}
                amount={amount}
                createdAt={time}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-4 flex w-full flex-col">
          <p className="font-body">No donations yet for this project</p>
        </div>
      )}
      <Pagination
        containerClassname="mt-0 justify-center"
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        hasNext={
          projectDonors?.paginationInfo.hasNext ||
          isLoading ||
          isFetching ||
          false
        }
        hasPrevious={
          projectDonors?.paginationInfo.hasPrevious ||
          isLoading ||
          isFetching ||
          false
        }
      />
    </DialogContent>
  );
};

export default ViewProjectDonorsDialog;
