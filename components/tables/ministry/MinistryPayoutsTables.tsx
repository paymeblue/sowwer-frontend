import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import useUserAuth from "@hooks/auth/useUserAuth";
import usePagination from "@hooks/general/usePagination";
import { formatCurrency } from "@lib/functions";
import { payoutHistory } from "@lib/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { useGetMinistryProjectsQuery } from "services/projects";
import { MinistryProject } from "services/typings";

export type CompletedProject = {
  id: string;
  title: string;
  goal: number;
  category: string;
  numOfDonors: number;
  amountRaised: number;
};

export type PayoutHistory = {
  id: string;
  referenceNo: string;
  title: string;
  amountPaid: number;
  payoutDate: string;
};

const completeProjectColumns: ColumnDef<MinistryProject>[] = [
  {
    accessorKey: "title",
    header: "Project Title",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">{row.getValue("title")}</span>
      );
    },
  },
  {
    accessorKey: "targetAmount",
    header: "Goal",
    cell: ({ row }) => {
      const value = row.getValue("targetAmount") as string;
      return <span className="capitalize">₦{formatCurrency(value)}</span>;
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
    header: "Amount Raised",
    cell: ({ row }) => {
      const value = row.getValue("amountRaised") as string;

      return <span className="capitalize">₦{formatCurrency(value)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;
      const disabled = !!project.request_payout;
      return (
        <div className="flex w-full">
          <Button
            size="sm"
            disabled={disabled}
            variant="outline"
            className="ml-auto w-fit border-accent text-[.75rem] text-accent"
          >
            Request payout
          </Button>
        </div>
      );
    },
  },
];

const payoutHistoryColumns: ColumnDef<PayoutHistory>[] = [
  {
    accessorKey: "referenceNo",
    header: "Reference No.",
    cell: ({ row }) => {
      return (
        <span className="font-[600] uppercase">
          {row.getValue("referenceNo")}
        </span>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("title")}</span>;
    },
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
    cell: ({ row }) => {
      const value = row.getValue("amountPaid") as string;

      return <span className="capitalize">₦{formatCurrency(value)}</span>;
    },
  },
  {
    accessorKey: "payoutDate",
    header: "Payout Date",
  },
];

export const MinistryCompletedProjectsTable = () => {
  const { user } = useUserAuth();
  const { pagination, handleNext, handlePrevious } = usePagination();
  const { data: completedProjects, isFetching } = useGetMinistryProjectsQuery({
    id: user?.ministry?.id || "",
    page: pagination.current,
    status: "completed",
  });

  return (
    <DataTable
      data={completedProjects?.data || []}
      columns={completeProjectColumns}
      isLoading={isFetching}
      paginationInfo={{
        handleNext,
        handlePrevious,
        hasNext: completedProjects?.paginationInfo?.hasNext || false,
        hasPrevious: completedProjects?.paginationInfo?.hasPrevious || false,
      }}
    />
  );
};

export const MinistryPayoutHistryTable = () => {
  return <DataTable data={payoutHistory} columns={payoutHistoryColumns} />;
};
