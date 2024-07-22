"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import FileIcon from "@components/assets/svg/File";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import usePagination from "@hooks/general/usePagination";
import { Status } from "@lib/constants";
import { formatCurrency } from "@lib/functions";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useGetAdminProjectsHistoryQuery } from "services/admin";
import { AdminProjectHistory } from "services/admin/typings";

const adminProjectsColumn: ColumnDef<AdminProjectHistory>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">{row.getValue("title")}</span>
      );
    },
  },

  {
    accessorKey: "minstryName",
    header: "Ministry",
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {row.getValue("minstryName") || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "target_amount",
    header: "Goal",
    cell: ({ row }) => {
      const formatedAmmount = formatCurrency(
        row.getValue("target_amount") as string
      );
      return <span>₦{formatedAmmount}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  //   {
  //     accessorKey: "createdAt",
  //     header: "Date Joined",
  //     cell: ({ row }) => {
  //       const value = row.getValue("createdAt") as string;
  //       return <span>{moment(value).format("Do MMMM YYYY; h:mm:ss a")}</span>;
  //     },
  //   },
  {
    accessorKey: "amount_raised",
    header: "Amound Raised",
    cell: ({ row }) => {
      const formatedAmmount = formatCurrency(
        row.getValue("amount_raised") as string
      );
      return <span>₦{formatedAmmount}</span>;
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
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <ActionComp
          id={project.id}
          status={project.status.toLowerCase()}
          title={project.title}
        />
      );
    },
  },
];

const ActionComp = ({
  id,
  status,
  title,
}: {
  id: string;
  status: string;
  title: string;
}) => {
  return (
    <>
      <DropdownMenu>
        {status === "completed" && (
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-grey">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent align="end">
          <Link
            href={{
              pathname: `/admin/projects/${id}/testimonies`,
              query: { name: title },
            }}
          >
            <DropdownMenuItem className="space-x-2">
              <FileIcon />
              <span className="text_tiny_body_r">Testimonies</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const AdminProjectsTable = () => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const {
    data: ministries,
    isLoading,
    isFetching,
  } = useGetAdminProjectsHistoryQuery({
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

export default AdminProjectsTable;
