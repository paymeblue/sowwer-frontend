import DonationCard from "@components/cards/DonationCard";
import moment from "moment";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { useGetMinistryProjectDonorsQuery } from "services/projects";
import usePagination from "@hooks/general/usePagination";
import Pagination from "@components/shared/Pagination";

interface Props {
  projectId: string;
  title: string;
}
const ProjectDonationsDialog = ({ projectId, title }: Props) => {
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

  if (!projectDonors?.data.length && (isLoading || isFetching)) {
    return <div className="min-h-[30rem] w-[70%] animate-pulse bg-gray-200" />;
  }

  return (
    <div className="h-fit w-[70%] rounded-[15px] bg-white p-[2rem]">
      <h3 className="text_variant_h2 text-[2rem]">Donations</h3>
      <div className="mt-6 min-h-[10rem] w-full space-y-10">
        {sortedProjectDonors && sortedProjectDonors.length ? (
          sortedProjectDonors.slice(0, 3).map((donor) => {
            const { amount, name, id, time } = donor;
            return (
              <DonationCard
                key={id}
                name={name}
                amount={amount}
                createdAt={time}
              />
            );
          })
        ) : (
          <p className="text-regular-body-p text-center ">
            No donations yet for this project
          </p>
        )}
      </div>
      {sortedProjectDonors && sortedProjectDonors.length && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="mt-10 w-full border-accent text-accent"
            >
              View more donations
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle className="font-body capitalize">
                Donations for {title} project
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 flex w-full flex-col space-y-6">
              {sortedProjectDonors.map((donor) => {
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
            <Pagination
              containerClassname="mt-0"
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
        </Dialog>
      )}
    </div>
  );
};

export default ProjectDonationsDialog;
