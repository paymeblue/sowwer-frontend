"use client";
import DataTable from "@components/ui/data-table";
import { projectDonors } from "@lib/mockData";
import { ColumnDef } from "@tanstack/react-table";

export type ProjectDonor = {
  id: string;
  name: string;
  title: string;
  category: "widows" | "orphans";
  amount: number;
  datetime: string;
};

const columns: ColumnDef<ProjectDonor>[] = [
  {
    accessorKey: "name",
    header: "Donor's name",
  },
  {
    accessorKey: "title",
    header: "Project Title",
    cell: ({ row }) => {
      const value = row.getValue("title") as string;
      return <span className="capitalize">{value}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Project Category",
    cell: ({ row }) => {
      const value = row.getValue("category") as string;
      return value ? <span className="capitalize">{value}</span> : "-";
    },
  },
  {
    accessorKey: "amount",
    header: "Amount Donated",
    cell: ({ row }) => {
      const value = row.getValue("amount") as string;
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
    accessorKey: "datetime",
    header: "Date Donated",
  },
];

const MinistryProjectDonorsTable = () => {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={projectDonors} />
    </div>
  );
};

export default MinistryProjectDonorsTable;
