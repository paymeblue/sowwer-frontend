import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import useUserAuth from "@hooks/auth/useUserAuth";
import usePagination from "@hooks/general/usePagination";
import { formatCurrency } from "@lib/functions";
import { ColumnDef } from "@tanstack/react-table";
import { useGetMinistryProjectsQuery } from "services/projects";
import { MinistryProject } from "services/typings";
import { usePayoutHistoryQuery } from "services/payouts";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import EmptyWallet from "@components/assets/svg/emptyWallet";
import moment from "moment";

export type PayoutHistory = {
  id: string;
  user_id: string;
  reference: string;
  project_title: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
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
    accessorKey: "reference",
    header: "Reference No.",
    cell: ({ row }) => {
      return (
        <span className="font-[600] uppercase">
          {row.getValue("reference")}
        </span>
      );
    },
  },
  {
    accessorKey: "project_title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row.getValue("project_title")}</span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount Paid",
    cell: ({ row }) => {
      const value = row.getValue("amount") as string;

      return <span className="capitalize">₦{formatCurrency(value)}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Payout Date",
    cell: ({ row }) => {
      const value = row.getValue("updatedAt") as string;
      return <span>{moment(value).format("Do MMMM YYYY; h:mm:ss a")}</span>;
    },
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
  const { pagination, handleNext, handlePrevious } = usePagination();
  const {
    data: payoutHistory,
    isFetching,
    isLoading,
  } = usePayoutHistoryQuery({
    page: pagination.current,
  });

  if (isLoading) {
    return <Loader className="h-[40vh]" />;
  }

  if (!payoutHistory?.data?.length) {
    return (
      <EmptyState
        image={<EmptyWallet />}
        title="No payouts yet"
        desc="Once we have paid out proceeds from completed projects, you'll be able to see the history here."
      />
    );
  }

  return (
    <DataTable
      data={payoutHistory?.data || []}
      columns={payoutHistoryColumns}
      isLoading={isFetching}
      paginationInfo={{
        handleNext,
        handlePrevious,
        hasNext: payoutHistory?.paginationInfo?.hasNext || false,
        hasPrevious: payoutHistory?.paginationInfo?.hasPrevious || false,
      }}
    />
  );
};
