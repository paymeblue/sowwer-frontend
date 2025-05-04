"use client";

import DataTable from "@components/ui/data-table";
import { formatCurrency } from "@lib/functions";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useGetDonationsQuery } from "services/donations";
import { Donation } from "services/donations/typings";

const columns: ColumnDef<Donation>[] = [
  {
    accessorKey: "program",
    header: "Program",
    cell: (params) => {
      const parseTitle = (title: string) => {
        if (title === "dad-project") return "DAD Project";
        return title;
      };
      const { type } = params.row.original;
      return (
        <div className="text-sm font-medium capitalize">{parseTitle(type)}</div>
      );
    },
  },
  {
    accessorKey: "frequency",
    header: "Donation Frequency",
    cell: (params) => {
      const { frequency } = params.row.original;
      return <span className="capitalize">{frequency}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (params) => {
      const { amount } = params.row.original;
      return <span>₦{formatCurrency(amount)}</span>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (params) => {
      const { createdAt } = params.row.original;
      return (
        <span>{moment(createdAt).utc().format("Do MMMM YYYY; h:mm:ss a")}</span>
      );
    },
  },
];

export const DonorDonationsTable = () => {
  const { data } = useGetDonationsQuery({
    page: 1,
    limit: 10,
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <h3 className="font-aeonik text-xl font-medium leading-[3rem] text-black">
        My Donations
      </h3>
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
};
