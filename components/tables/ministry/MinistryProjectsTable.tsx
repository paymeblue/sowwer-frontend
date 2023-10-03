"use client";
import { useGetMinistryProjectsQuery } from "services/projects";

import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Status } from "@lib/constants";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, PenLine, QrCode, Trash, X } from "lucide-react";
import usePagination from "@hooks/general/usePagination";
import { MinistryProject } from "services/typings";
import Link from "next/link";
import ViewProjectDonorsDialog from "@components/dialogs/ministry/ViewProjectDonorsDialog";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import DeleteProjectDialog from "@components/dialogs/ministry/DeleteProjectDialog";
import { useState } from "react";

interface Props {
  ministryId: string;
}

const columns: ColumnDef<MinistryProject>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("title")}</span>;
    },
  },
  {
    accessorKey: "targetAmount",
    header: "Goal",
    cell: ({ row }) => {
      const value = row.getValue("targetAmount") as string;
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
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("category")}</span>;
    },
  },
  {
    accessorKey: "donors",
    header: "No. of Donors",
    cell: ({ row }) => {
      return <span>{row.getValue("donors")}</span>;
    },
  },
  {
    accessorKey: "amountRaised",
    header: "Amount raised",
    cell: ({ row }) => {
      const value = row.getValue("amountRaised") as string;
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

      return <ActionDialog project={project} />;
    },
  },
];

const ActionDialog = ({ project }: { project: MinistryProject }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-grey">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {project.status === Status.drafted && (
          <DropdownMenuContent align="end">
            <Link href={`/ministry/projects/${project.id}`}>
              <DropdownMenuItem className="text_tiny_body_r space-x-2">
                <PenLine size={14} />{" "}
                <span className="text_tiny_body_r">Edit</span>{" "}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DialogTrigger asChild>
                <div className=" flex items-center space-x-2 text-[#EB5757]">
                  <Trash size={14} />
                  <span className="text_tiny_body_r text-[#EB5757]">
                    Delete
                  </span>
                </div>
              </DialogTrigger>
              <DeleteProjectDialog id={project.id} setOpen={setOpen} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
        {project.status === Status.active && (
          <DropdownMenuContent align="end">
            <Link href={`/ministry/projects/${project.id}`}>
              <DropdownMenuItem className="text_tiny_body_r space-x-2">
                <PenLine size={14} />{" "}
                <span className="text_tiny_body_r">Edit</span>{" "}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="text_tiny_body_r space-x-2">
              <QrCode size={14} />{" "}
              <span className="text_tiny_body_r">Download QR</span>{" "}
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DialogTrigger asChild>
                <div className="text_tiny_body_r flex items-center space-x-2">
                  <Eye size={14} />{" "}
                  <span className="text_tiny_body_r">View donors</span>{" "}
                </div>
              </DialogTrigger>
              <ViewProjectDonorsDialog
                projectId={project.id}
                title={project.title}
              />
            </DropdownMenuItem>

            <DropdownMenuItem className=" space-x-2 text-[#EB5757]">
              <X size={14} />{" "}
              <span className="text_tiny_body_r text-[#EB5757]">Close</span>{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
        {project.status === Status.completed && (
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DialogTrigger asChild>
                <div className="text_tiny_body_r flex items-center space-x-2">
                  <Eye size={14} />{" "}
                  <span className="text_tiny_body_r">View donors</span>{" "}
                </div>
              </DialogTrigger>
              <ViewProjectDonorsDialog
                projectId={project.id}
                title={project.title}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </Dialog>
  );
};

const MinistryProjectsTable = ({ ministryId }: Props) => {
  const { handleNext, handlePrevious, pagination } = usePagination();
  const { data: projects, isFetching } = useGetMinistryProjectsQuery({
    id: ministryId,
    page: pagination.current,
  });

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={projects?.data || []}
        isLoading={isFetching}
        paginationInfo={{
          handleNext: handleNext,
          handlePrevious: handlePrevious,
          hasNext: projects?.paginationInfo.hasNext || false,
          hasPrevious: projects?.paginationInfo.hasPrevious || false,
        }}
      />
    </div>
  );
};

export default MinistryProjectsTable;
