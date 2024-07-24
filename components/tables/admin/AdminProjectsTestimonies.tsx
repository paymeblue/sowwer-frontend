"use client";

import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import { Dialog } from "@components/ui/dialog";
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
import { MoreHorizontal, PenLine, Trash } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
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

      return value ? (
        <span className="capitalize">{formatCurrency(value)}</span>
      ) : (
        "-"
      );
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
        [Status.draft]: "bg-[#FFCD39]",
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
  {
    id: "actions",
    cell: ({ row }) => {
      const testimony = row.original;

      return <ActionDialog testimony={testimony} />;
    },
  },
];

const ActionDialog = ({ testimony }: { testimony: AdminProjectTestimony }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-grey">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link
              href={`/admin/projects/${testimony.project_id}/edit-testimony?id=${testimony.id}`}
            >
              <DropdownMenuItem className="text_tiny_body_r space-x-2">
                <PenLine size={14} />{" "}
                <span className="text_tiny_body_r">Edit</span>{" "}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={() => setOpenDeleteModal(true)}
            >
              <div className=" flex items-center space-x-2 text-[#EB5757]">
                <Trash size={14} />
                <span className="text_tiny_body_r text-[#EB5757]">Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </>
  );
};

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
