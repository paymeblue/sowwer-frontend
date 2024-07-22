"use client";

import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import DataTable from "@components/ui/data-table";
import usePagination from "@hooks/general/usePagination";
import { ColumnDef } from "@tanstack/react-table";
import { useGetAdminWidowsHistoryQuery } from "services/admin";
import { AdminWidowHistory } from "services/admin/typings";

const adminWidowsColumn: ColumnDef<AdminWidowHistory>[] = [
  {
    accessorKey: "benefactor_name",
    header: "Name",
    cell: ({ row }) => {
      const val = row.getValue("benefactor_name") as string;
      return <span className="font-[600] capitalize">{val || "N/A"}</span>;
    },
  },
  {
    accessorKey: "benefactor_email",
    header: "Email",
    cell: ({ row }) => {
      const val = row.getValue("benefactor_email") as string;
      return <span className="capitalize">{val || "N/A"}</span>;
    },
  },
  {
    accessorKey: "benefactor_phone",
    header: "Phone",
    cell: ({ row }) => {
      const val = row.getValue("benefactor_phone") as string;
      return <span className="capitalize">{val || "N/A"}</span>;
    },
  },
  {
    accessorKey: "benefactor_address",
    header: "Address",
    cell: ({ row }) => {
      const val = row.getValue("benefactor_address") as string;
      return <span className="capitalize">{val || "N/A"}</span>;
    },
  },
  {
    accessorKey: "state_of_origin",
    header: "State of origin",
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row.getValue("state_of_origin")}</span>
      );
    },
  },
  {
    accessorKey: "registrar_name",
    header: "Registrar Name",
    cell: ({ row }) => {
      const val = row.getValue("registrar_name") as string;
      return <span className="capitalize">{val || "N/A"}</span>;
    },
  },
  {
    accessorKey: "registrar_email",
    header: "Registrar Email",
    cell: ({ row }) => {
      const val = row.getValue("registrar_email") as string;
      return <span className="capitalize">{val || "N/A"}</span>;
    },
  },
  {
    accessorKey: "next_of_kin_name",
    header: "Next of kin name",
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row.getValue("next_of_kin_name")}</span>
      );
    },
  },
  {
    accessorKey: "next_of_kin_phone",
    header: "Next of kin phone",
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row.getValue("next_of_kin_phone")}</span>
      );
    },
  },
];

const AdminWidowRegistryTable = () => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const { data, isLoading, isFetching } = useGetAdminWidowsHistoryQuery({
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
        title="No widows"
        desc="Widows registry will appear here"
      />
    );
  }

  return (
    <DataTable
      data={data.data || []}
      columns={adminWidowsColumn}
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

export default AdminWidowRegistryTable;
