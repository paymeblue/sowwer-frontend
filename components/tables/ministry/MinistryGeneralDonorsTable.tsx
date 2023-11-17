"use client";
import Loader from "@components/shared/Loader";
import DataTable from "@components/ui/data-table";
import useUserAuth from "@hooks/auth/useUserAuth";
import usePagination from "@hooks/general/usePagination";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { useGetIncomingDonationsForMinistryUserQuery } from "services/projects";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import EmptyState from "@components/shared/EmptyState";
import Emptydonor from "@components/assets/svg/emptyDonor";

export type GeneralDonor = {
  id: string;
  amount: string;
  donorName: string;
  donorType: string | null;
  donorInterval: string | null;
  createdAt: string;
};

const columns: ColumnDef<GeneralDonor>[] = [
  {
    accessorKey: "donorName",
    header: "Donor's name",
    cell: ({ row }) => {
      const value = row.getValue("donorName") as string;
      return <span className="capitalize">{value}</span>;
    },
  },
  {
    accessorKey: "donorType",
    header: "Donation Type",
    cell: ({ row }) => {
      const value = row.getValue("donorType") as string | null;
      return value ? (
        <span className="capitalize">{value} donation</span>
      ) : (
        <span className="capitalize">One-time Donation</span>
      );
    },
  },
  {
    accessorKey: "donorInterval",
    header: "Frequency",
    cell: ({ row }) => {
      const value = row.getValue("donorInterval") as string;
      return value ? <span className="capitalize">{value}</span> : "-";
    },
  },
  {
    accessorKey: "amount",
    header: "Amount Donated",
    cell: ({ row }) => {
      const value = row.getValue("amount") as string;
      const formattedValue = new Intl.NumberFormat("en-US").format(
        parseInt(value || "0", 10)
      );
      return value ? (
        <span className="capitalize">₦{formattedValue}</span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Donated",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return <span>{moment(value).format("Do MMMM YYYY; h:mm:ss a")}</span>;
    },
  },
];

const MinistryGeneralDonorsTableComp = () => {
  const { user } = useUserAuth();
  const { handleNext, handlePrevious, pagination } = usePagination();
  const {
    data: donors,
    isLoading,
    isFetching,
  } = useGetIncomingDonationsForMinistryUserQuery({
    id: user?.ministry?.id,
    page: pagination?.current,
    type: "ministry",
  });

  if (!donors?.data?.length && isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!donors?.data?.length && !isLoading) {
    return (
      <EmptyState
        image={<Emptydonor />}
        title="No general donors yet"
        desc="Once you start receiving general donations your list of donors will appear here."
      />
    );
  }
  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={donors?.data || []}
        isLoading={isFetching}
        paginationInfo={{
          handleNext,
          handlePrevious,
          hasNext: donors?.paginationInfo?.hasNext || false,
          hasPrevious: donors?.paginationInfo?.hasPrevious || false,
        }}
      />
    </div>
  );
};

const MinistryGeneralDonorsTable = () => {
  return (
    <NoSSRWrapper>
      <MinistryGeneralDonorsTableComp />
    </NoSSRWrapper>
  );
};

export default MinistryGeneralDonorsTable;
