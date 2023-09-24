"use client";
import DataTable from "@components/ui/data-table";
import { generalDonors } from "@lib/mockData";
import { ColumnDef } from "@tanstack/react-table";

export type GeneralDonor = {
  id: string;
  name: string;
  type: "one-time" | "recurring";
  frequency: "monthly" | "daily" | null;
  amount: number;
  datetime: string;
};

const columns: ColumnDef<GeneralDonor>[] = [
  {
    accessorKey: "name",
    header: "Donor's name",
  },
  {
    accessorKey: "type",
    header: "Donation Type",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    cell: ({ row }) => {
      const value = row.getValue("frequency");
      return value ? value : "-";
    },
  },
  {
    accessorKey: "amount",
    header: "Amount Donated",
  },
  {
    accessorKey: "datetime",
    header: "Date Donated",
  },
];

const MinistryGeneralDonorsTable = () => {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={generalDonors} />
    </div>
  );
};

export default MinistryGeneralDonorsTable;
