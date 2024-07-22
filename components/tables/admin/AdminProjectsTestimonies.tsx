"use client";

import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import DataTable from "@components/ui/data-table";
import usePagination from "@hooks/general/usePagination";
import { Status } from "@lib/constants";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useGetAdminProjectTestimoniesHistoryQuery } from "services/admin";
import { AdminProjectTestimony } from "services/admin/typings";

const columns: ColumnDef<AdminProjectTestimony>[] = [
  {
    accessorKey: "title",
    header: "Testimony Title",
    cell: ({ row }) => {
      return (
        <span className="font-bold capitalize">{row.getValue("title")}</span>
      );
    },
  },
  {
    accessorKey: "amount_raised",
    header: "Amount Raised",
    cell: ({ row }) => {
      const value = row.getValue("amount_raised") as string;
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
    accessorKey: "number_of_people_impacted",
    header: "People impacted",
    cell: ({ row }) => {
      const value = row.getValue("number_of_people_impacted") as string;

      return value ? <span className="capitalize">₦{value}</span> : "-";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Status;
      const statusColors = {
        [Status.active]: "bg-[#3466FF]",
        [Status.drafted]: "bg-[#FFCD39]",
        [Status.completed]: "bg-[#4FAE64]",
        [Status.published]: "bg-[#3466FF]",
      };
      const color = statusColors[status];

      return (
        <div className="flex items-center space-x-2 capitalize">
          <div className={`h-2 w-2 rounded-full ${color}`} />
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date Added",
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {moment(row.getValue("created_at")).format("Do MMMM YYYY; h:mm:ss a")}
        </span>
      );
    },
  },
];

const AdminProjectsTestimoniesTable = ({
  projectId,
}: {
  projectId: string;
}) => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const { data, isLoading, isFetching } =
    useGetAdminProjectTestimoniesHistoryQuery({
      limit: pagination.pageSize,
      page: pagination.current,
      projectId,
    });

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!data?.data?.length) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No testimony yet"
        desc="Add a new testimony and manage all your testimonies from here."
      />
    );
  }

  return (
    <DataTable
      data={data.data || []}
      columns={columns}
      isLoading={isFetching}
      paginationInfo={{
        handleNext,
        handlePrevious,
        hasNext: data?.paginationInfo?.hasNext || false,
        hasPrevious: data?.paginationInfo?.hasPrevious || false,
      }}
    />
  );
};

export default AdminProjectsTestimoniesTable;
