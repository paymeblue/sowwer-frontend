"use client";
import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import { formatCurrency } from "@lib/functions";
import { generalDonations, projectDonations } from "@lib/mockData";
import { ColumnDef } from "@tanstack/react-table";

export type ProjectDonation = {
  id: string;
  title: string;
  category: string;
  amount: number;
  datetime: string;
};

export type GeneralDonation = {
  id: string;
  ministryName: string;
  donationType: "recurring" | "one-time";
  frequency: "monthly" | "daily" | null;
  amount: number;
  datetime: string;
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
    accessorKey: "amount",
    header: "Amount Donated",
    cell: ({ row }) => {
      const formatedAmmount = formatCurrency(row.getValue("amount") as string);
      return <span>₦{formatedAmmount}</span>;
    },
  },
  {
    accessorKey: "datetime",
    header: "Date Donated",
  },
];

const generalDonationsColumn: ColumnDef<GeneralDonation>[] = [
  {
    accessorKey: "ministryName",
    header: "Ministry's Name",
    cell: ({ row }) => {
      const name = row.getValue("ministryName") as string;
      return <span className="font-[600] capitalize">{name}</span>;
    },
  },
  {
    accessorKey: "donationType",
    header: "Donation Type",
    cell: ({ row }) => {
      const value = row.getValue("donationType") as string;
      return <span className="capitalize">{value} donation</span>;
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    cell: ({ row }) => {
      const value = row.getValue("frequency") as string;
      return value ? <span className="capitalize">{value}</span> : "-";
    },
  },
  {
    accessorKey: "amount",
    header: "Amount Donated",
    cell: ({ row }) => {
      const formatedAmmount = formatCurrency(row.getValue("amount") as string);
      return <span>₦{formatedAmmount}</span>;
    },
  },
  {
    accessorKey: "datetime",
    header: "Date Donated",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const donation = row.original;

      return donation.donationType === "recurring" ? (
        <Button
          variant="outline"
          className="w-full border-[#EB5757] px-3 text-[.75rem] text-[#EB5757]"
          size="sm"
        >
          Pause payment
        </Button>
      ) : null;
    },
  },
];

export const DonorProjectDonationsTable = () => {
  return (
    <DataTable columns={projectDonationsColumns} data={projectDonations} />
  );
};

export const DonorGeneralDonationsTable = () => {
  return <DataTable columns={generalDonationsColumn} data={generalDonations} />;
};
