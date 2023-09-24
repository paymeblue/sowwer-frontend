import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import { formatCurrency } from "@lib/functions";
import { completedProjects, payoutHistory } from "@lib/mockData";
import { ColumnDef } from "@tanstack/react-table";

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

const completeProjectColumns: ColumnDef<CompletedProject>[] = [
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
    accessorKey: "goal",
    header: "Goal",
    cell: ({ row }) => {
      const value = row.getValue("goal") as string;
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
    accessorKey: "numOfDonors",
    header: "No. of Donors",
    cell: ({ row }) => {
      return <span>{row.getValue("numOfDonors")}</span>;
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
    cell: () => {
      return (
        <Button
          size="sm"
          variant="outline"
          className=" ml-auto w-full border-accent px-3 text-[.75rem] text-accent"
        >
          Request payout
        </Button>
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
  return (
    <DataTable data={completedProjects} columns={completeProjectColumns} />
  );
};

export const MinistryPayoutHistryTable = () => {
  return <DataTable data={payoutHistory} columns={payoutHistoryColumns} />;
};
