"use client";

import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import DataTable from "@components/ui/data-table";
import usePagination from "@hooks/general/usePagination";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useGetAdminOrphanageHistoryQuery } from "services/admin";
import { AdminOrphanageHistory } from "services/admin/typings";

const adminWidowsColumn: ColumnDef<AdminOrphanageHistory>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const val = row.getValue("name") as string;
      return <span className="font-[600] capitalize">{val || "N/A"}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">{row.getValue("email")}</span>
      );
    },
  },
  {
    accessorKey: "registrar_email",
    header: "Email",
    cell: ({ row }) => {
      const val = row.getValue("registrar_email") as string;
      return <span className="font-[600] capitalize">{val || "N/A"}</span>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">{row.getValue("phone")}</span>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">{row.getValue("address")}</span>
      );
    },
  },
  {
    accessorKey: "number_of_orphans",
    header: "Number of orphans",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">
          {row.getValue("number_of_orphans")}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">
          {moment(row.getValue("created_at")).format("Do MMMM YYYY; h:mm:ss a")}
        </span>
      );
    },
  },
];

const AdminOrphanageTable = () => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const { data, isLoading, isFetching } = useGetAdminOrphanageHistoryQuery({
    limit: pagination.pageSize,
    page: pagination.current,
  });

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!data?.data?.length) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No orphanages"
        desc="Orphanages registry will appear here"
      />
    );
  }

  return (
    <DataTable
      data={data.data || []}
      columns={adminWidowsColumn}
      isLoading={isFetching}
      // rowClassName="cursor-pointer"
      // navigateOptions={{
      //   base: "/admin/ministries",
      // }}
      paginationInfo={{
        handleNext,
        handlePrevious,
        hasNext: data?.paginationInfo?.hasNext || false,
        hasPrevious: data?.paginationInfo?.hasPrevious || false,
      }}
    />
  );
};

export default AdminOrphanageTable;
