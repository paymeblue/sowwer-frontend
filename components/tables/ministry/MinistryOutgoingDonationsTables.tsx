"use client";
import {
  useGetOutgoingGeneralDonationsForMinistryUserQuery,
  useGetOutgoingProjectDonationsForMinistryUserQuery,
} from "services/projects";
import {
  useResumeRecurringPaymentMutation,
  usePauseRecurringPaymentMutation,
} from "services/payouts";
import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import { formatCurrency } from "@lib/functions";
import { ColumnDef } from "@tanstack/react-table";
import usePagination from "@hooks/general/usePagination";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import EmptyWallet from "@components/assets/svg/emptyWallet";
import moment from "moment";
import Link from "next/link";
import { useToast } from "@components/ui/use-toast";

export type ProjectDonation = {
  id: string;
  title: string;
  category: string;
  amountDonated: string;
  createdAt: string;
};

export type GeneralDonation = {
  id: string;
  organisedBy: string;
  type: "recurring" | "one-time";
  interval: "monthly" | "quarterly" | "yearly" | null;
  amountDonated: string;
  createdAt: string;
  plan_status: string;
  plan_id: string;
};

const projectDonationsColumns: ColumnDef<ProjectDonation>[] = [
  {
    accessorKey: "title",
    header: "Project Title",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return <span className="capitalize">{category}</span>;
    },
  },
  {
    accessorKey: "amountDonated",
    header: "Amount Donated",
    cell: ({ row }) => {
      const formatedAmmount = formatCurrency(
        row.getValue("amountDonated") as string
      );
      return <span>₦{formatedAmmount}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Donated",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return <span>{moment(value).format("Do MMMM YYYY; h:mm:ss a")}</span>;
    },
  },
];

const generalDonationsColumn: ColumnDef<GeneralDonation>[] = [
  {
    accessorKey: "ministry_name",
    header: "Ministry's Name",
    cell: ({ row }) => {
      const name = row.getValue("ministry_name") as string;
      return <span className="font-[600] capitalize">{name}</span>;
    },
  },
  {
    accessorKey: "type",
    header: "Donation Type",
    cell: ({ row }) => {
      const value = row.getValue("type") as string;
      return <span className="capitalize">{value} donation</span>;
    },
  },
  {
    accessorKey: "interval",
    header: "Frequency",
    cell: ({ row }) => {
      const value = row.getValue("interval") as string;
      return value ? <span className="capitalize">{value}</span> : "-";
    },
  },
  {
    accessorKey: "amountDonated",
    header: "Amount Donated",
    cell: ({ row }) => {
      const formatedAmmount = formatCurrency(
        row.getValue("amountDonated") as string
      );
      return <span>₦{formatedAmmount}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Donated",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return <span>{moment(value).format("Do MMMM YYYY; h:mm:ss a")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const donation = row.original;

      return <ActionComp donation={donation} />;
    },
  },
];

const ActionComp = ({ donation }: { donation: GeneralDonation }) => {
  const [resumePayment, { isLoading: resumingPaymentLoading }] =
    useResumeRecurringPaymentMutation();
  const [pausePayment, { isLoading: pausingPayment }] =
    usePauseRecurringPaymentMutation();
  const { toast } = useToast();

  const handleResumePayment = async () => {
    const { plan_id } = donation;

    try {
      await resumePayment(plan_id).unwrap();
      toast({
        title: "Donation recurring payment resumed successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to resume payment",
      });
    }
  };

  const handlePausePayment = async () => {
    const { plan_id } = donation;

    try {
      await pausePayment(plan_id).unwrap();
      toast({
        title: "Donation recurring payment paused successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to pause payment",
      });
    }
  };
  return (
    <>
      {donation.type === "recurring" ? (
        <>
          {donation.plan_status === "cancelled" ? (
            <Button
              variant="outline"
              className="w-full border-accent px-3 text-[.75rem] text-accent"
              size="sm"
              onClick={handleResumePayment}
              loading={resumingPaymentLoading}
            >
              Resume payment
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full border-[#EB5757] px-3 text-[.75rem] text-[#EB5757]"
              size="sm"
              onClick={handlePausePayment}
              loading={pausingPayment}
            >
              Pause payment
            </Button>
          )}
        </>
      ) : null}
    </>
  );
};

export const MinistryOutgoingProjectDonationsTable = () => {
  const { handleNext, handlePrevious, pagination } = usePagination();
  const {
    data: projectDonations,
    isLoading,
    isError,
  } = useGetOutgoingProjectDonationsForMinistryUserQuery({
    page: pagination?.current,
    // pageSize: pagination?.pageSize,
  });
  if (isLoading) {
    return <Loader className="h-[40vh]" />;
  }

  if (!projectDonations?.data) {
    return (
      <EmptyState
        image={<EmptyWallet />}
        title="No Project Donations"
        desc="You have not donated to a project. Start donating to a project you believe in today."
        action={
          <Link href="/projects">
            <Button variant="secondary">Start Donating</Button>
          </Link>
        }
      />
    );
  }

  if (isError) {
    return (
      <EmptyState
        image={<EmptyWallet />}
        title="Unable to retrieve your project donations"
        desc="A problem occured trying to retrieve your project donations"
      />
    );
  }

  return (
    <DataTable
      columns={projectDonationsColumns}
      data={projectDonations.data || []}
      paginationInfo={{
        handleNext,
        handlePrevious,
        hasNext: projectDonations?.paginationInfo?.hasNext || false,
        hasPrevious: projectDonations?.paginationInfo?.hasPrevious || false,
      }}
    />
  );
};

export const MinistryOutgoingGeneralDonationsTable = () => {
  const { handleNext, handlePrevious, pagination } = usePagination();
  const {
    data: generalDonations,
    isLoading,
    isError,
  } = useGetOutgoingGeneralDonationsForMinistryUserQuery({
    page: pagination?.current,
    // pageSize: pagination?.pageSize,
  });

  if (isLoading) {
    return <Loader className="h-[40vh]" />;
  }

  if (!generalDonations?.data) {
    return (
      <EmptyState
        image={<EmptyWallet />}
        title="No general Donations"
        desc="You have not donated to a minsitry. Start donating to a ministry you believe in today."
        action={
          <Link href="/ministries">
            <Button variant="secondary">Start Donating</Button>
          </Link>
        }
      />
    );
  }

  if (isError) {
    return (
      <EmptyState
        image={<EmptyWallet />}
        title="Unable to retrieve your general donations"
        desc="A problem occured trying to retrieve your general donations"
      />
    );
  }

  return (
    <DataTable
      columns={generalDonationsColumn}
      data={generalDonations.data || []}
      paginationInfo={{
        handleNext,
        handlePrevious,
        hasNext: generalDonations?.paginationInfo?.hasNext || false,
        hasPrevious: generalDonations?.paginationInfo?.hasPrevious || false,
      }}
    />
  );
};
