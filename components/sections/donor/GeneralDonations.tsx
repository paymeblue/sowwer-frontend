"use client";
import { useGetGeneralDonationsForDonorUserQuery } from "services/projects";
import ProjectCard, { IProject } from "@components/cards/ProjectCard";
import { motion } from "framer-motion";
import { DEFAULT_VIEWPORT, cardContainerVariant } from "lib/variants";
import usePagination from "@hooks/general/usePagination";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import Emptydonor from "@components/assets/svg/emptyDonor";
import Link from "next/link";
import { Button } from "@components/ui/button";
import Pagination from "@components/shared/Pagination";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";

export const donations: IProject[] = [
  {
    image: "/assets/images/rectangle.png",
    category: "recurring",
    title: "Family Worship Center",
    organisedBy: "Abuja, Nigeria",
    description:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    amountRaised: "2 million",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
  },
  {
    image: "/assets/images/rectangle.png",
    category: "one-time",
    title: "Family Worship Center",
    organisedBy: "Abuja, Nigeria",
    description:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    amountRaised: "2 million",
    id: "db7e493b-fe92-4a11-b0e5-505943300ssa2",
    targetAmount: "1000000.00",
    createdAt: "2023-08-31T14:37:36.000Z",
    donors: 12,
    donationPercent: "67.94",
  },
];

const GeneralDonationsComp = () => {
  const { handleNext, handlePrevious, pagination } = usePagination();
  const {
    data: donations,
    isLoading,
    isFetching,
  } = useGetGeneralDonationsForDonorUserQuery({
    page: pagination.current,
    pageSize: pagination.pageSize,
  });

  if (isLoading) {
    return <Loader className="h-[60vh]" />;
  }

  if (!isLoading && !isFetching && !donations?.data?.length) {
    return (
      <EmptyState
        image={<Emptydonor />}
        title="You have not donated to a minstry"
        desc="Donate to ministries you believe in and see them appear here."
        action={
          <Link href="/ministries">
            <Button>Start donating</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <motion.div
        variants={cardContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="mt-6 grid w-full grid-cols-3 gap-6"
      >
        {donations?.data
          .filter((donation, index, self) => {
            // Use the filter method to keep only the first occurrence of each unique id
            return index === self.findIndex((d) => d.id === donation.id);
          })
          .map((donation, i) => {
            const { id, organisedBy, type, description } = donation;
            return (
              <ProjectCard
                variant="general"
                title={organisedBy}
                category={type}
                key={donation.id}
                description={description}
                id={id}
              />
            );
          })}
      </motion.div>
      <Pagination
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        hasNext={donations?.paginationInfo.hasNext || false}
        hasPrevious={donations?.paginationInfo.hasPrevious || false}
      />
    </div>
  );
};

const GeneralDonations = () => {
  return (
    <NoSSRWrapper>
      <GeneralDonationsComp />
    </NoSSRWrapper>
  );
};
export default GeneralDonations;
