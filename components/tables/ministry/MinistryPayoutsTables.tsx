import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import useUserAuth from "@hooks/auth/useUserAuth";
import usePagination from "@hooks/general/usePagination";
import { useRequestPayoutMutation } from "services/payouts";

import { formatCurrency } from "@lib/functions";
import { ColumnDef } from "@tanstack/react-table";
import { useGetMinistryProjectsQuery } from "services/projects";
import { AccountResponse, MinistryProject } from "services/typings";
import { usePayoutHistoryQuery } from "services/payouts";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import EmptyWallet from "@components/assets/svg/emptyWallet";
import moment from "moment";
import { useToast } from "@components/ui/use-toast";
import { Dialog } from "@components/ui/dialog";
import ConnectBankAccountDialog from "@components/dialogs/ministry/ConnectBankAccountDialog";
import { useState } from "react";

export type PayoutHistory = {
  id: string;
  user_id: string;
  reference: string;
  project_title: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
};

const getCompletedProjectColumn = (
  accountInfo: AccountResponse | undefined
) => {
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

        return <ActionComp project={project} accountInfo={accountInfo} />;
      },
    },
  ];
  return completeProjectColumns;
};

const ActionComp = ({
  project,
  accountInfo,
}: {
  project: MinistryProject;
  accountInfo: AccountResponse | undefined;
}) => {
  const disabled = !!project.request_payout;
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [requestPayout, { isLoading }] = useRequestPayoutMutation();
  const handleRequest = async () => {
    try {
      await requestPayout(project.id).unwrap();
      toast({
        title: "Payout successfully requested",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to request payment",
      });
    }
  };
  return (
    <div className="flex w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          size="sm"
          disabled={disabled || project.amountRaised === "0.00"}
          variant="outline"
          loading={isLoading}
          onClick={() => {
            if (!accountInfo?.data) {
              setOpen(true);
            } else {
              handleRequest();
            }
          }}
          className="ml-auto w-fit border-accent text-[.75rem] text-accent disabled:border-none disabled:bg-[#E8E9ED] disabled:text-white disabled:opacity-100"
        >
          {disabled ? "Payout requested" : "Request payout"}
        </Button>
        <ConnectBankAccountDialog setOpen={setOpen} defaultStep={1} />
      </Dialog>
    </div>
  );
};

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

interface Props {
  accountInfo: AccountResponse | undefined;
}

export const MinistryCompletedProjectsTable = ({ accountInfo }: Props) => {
  const { user } = useUserAuth();
  const { pagination, handleNext, handlePrevious } = usePagination();
  const {
    data: completedProjects,
    isFetching,
    isLoading,
  } = useGetMinistryProjectsQuery({
    id: user?.ministry?.id || "",
    page: pagination.current,
    status: "completed",
  });

  if (isLoading) {
    return <Loader className="h-[40vh]" />;
  }

  if (!completedProjects?.data.length && !isLoading) {
    return (
      <div className="flex  flex-1 items-center justify-center">
        <EmptyState
          image={<EmptyWallet />}
          title="No payouts yet"
          desc="None of your projects have been completed. Once they’re completed, you will see a list of your completed projects and be able to request payouts after adding your payout details."
        />
      </div>
    );
  }
  return (
    <DataTable
      data={completedProjects?.data || []}
      columns={getCompletedProjectColumn(accountInfo)}
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
