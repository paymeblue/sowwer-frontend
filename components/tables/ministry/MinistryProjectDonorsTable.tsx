"use client";
import Emptydonor from "@components/assets/svg/emptyDonor";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import DataTable from "@components/ui/data-table";
import useUserAuth from "@hooks/auth/useUserAuth";
import usePagination from "@hooks/general/usePagination";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useGetIncomingDonationsForMinistryUserQuery } from "services/projects";

export type ProjectDonor = {
  id: string;
  donor_name: string;
  title: string;
  category: "widows" | "orphans";
  amount: number;
  created_at: string;
};

const columns: ColumnDef<ProjectDonor>[] = [
  {
    accessorKey: "donor_name",
    header: "Donor's name",
    cell: ({ row }) => {
      const value = row.getValue("donor_name") as string;
      return <span className="capitalize">{value}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Project Title",
    cell: ({ row }) => {
      const value = row.getValue("title") as string;
      return (
        <div className="w-full max-w-[10rem]">
          <span className="block truncate capitalize">{value}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Project Category",
    cell: ({ row }) => {
      const value = row.getValue("category") as string;
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
    accessorKey: "created_at",
    header: "Date Donated",
    cell: ({ row }) => {
      const value = row.getValue("created_at") as string;
      return <span>{moment(value).format("Do MMMM YYYY; h:mm:ss a")}</span>;
    },
  },
];

const MinistryProjectDonorsTableComp = () => {
  const { user } = useUserAuth();
  const { handleNext, handlePrevious, pagination } = usePagination();
  const {
    data: donors,
    isLoading,
    isFetching,
  } = useGetIncomingDonationsForMinistryUserQuery({
    id: user?.ministry?.id,
    page: pagination?.current,
    type: "project",
  });

  if (!donors?.data?.length && isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!donors?.data?.length && !isLoading) {
    return (
      <EmptyState
        image={<Emptydonor />}
        title="No project donors yet"
        desc="Once you start receiving project donations your list of donors will appear here."
      />
    );
  }

  return (
    <div className="mb-16 w-full">
      <DataTable
        columns={columns}
        data={(donors?.data as unknown as ProjectDonor[]) || []}
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

const MinistryProjectDonorsTable = () => {
  return (
    <NoSSRWrapper>
      <MinistryProjectDonorsTableComp />
    </NoSSRWrapper>
  );
};

export default MinistryProjectDonorsTable;
