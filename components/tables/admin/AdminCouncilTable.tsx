"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import DataTable from "@components/ui/data-table";

import usePagination from "@hooks/general/usePagination";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useGetAdminCouncilsHistoryQuery } from "services/admin";
import { AdminCouncil } from "services/admin/typings";

const adminProjectsColumn: ColumnDef<AdminCouncil>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">{row.getValue("name")}</span>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email address",
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row.getValue("email") || "N/A"}</span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "church_name",
    header: "Church",
  },
  {
    accessorKey: "created_at",
    header: "Date submitted",
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {moment(row.getValue("created_at")).format("Do MMMM YYYY; h:mm:ss a")}
        </span>
      );
    },
  },
];

const AdminCouncilTable = () => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const {
    data: ministries,
    isLoading,
    isFetching,
  } = useGetAdminCouncilsHistoryQuery({
    limit: pagination.pageSize,
    page: pagination.current,
  });

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!ministries?.data?.length) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No project"
        desc="This page will be populated once you have projects"
      />
    );
  }

  return (
    <DataTable
      data={ministries.data || []}
      columns={adminProjectsColumn}
      isLoading={isFetching}
      // rowClassName="cursor-pointer"
      // navigateOptions={{
      //   base: "/admin/ministries",
      // }}
      paginationInfo={{
        handleNext,
        handlePrevious,
        hasNext: ministries?.paginationInfo?.hasNext || false,
        hasPrevious: ministries?.paginationInfo?.hasPrevious || false,
      }}
    />
  );
};

export default AdminCouncilTable;
