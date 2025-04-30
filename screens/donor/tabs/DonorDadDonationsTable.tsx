"use client";

import { FileIcon } from "@components/assets/icons";
import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";

export type DadDonation = {
  id: string;
  name: string;
  age: string;
  geolocation: string;
  feePerTerm: string;
  paymentFrequency: string;
  totalPayment: string;
  nextPaymentDue: string;
};

const dadDonationsColumns: ColumnDef<DadDonation>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "geolocation",
    header: "Geolocation",
  },
  {
    accessorKey: "feePerTerm",
    header: "Fee Per Term",
  },
  {
    accessorKey: "paymentFrequency",
    header: "Payment Frequency",
  },
  {
    accessorKey: "totalPayment",
    header: "Total Payment",
  },
  {
    accessorKey: "nextPaymentDue",
    header: "Next Payment Due",
    cell: ({ row }) => {
      const value = row.getValue("nextPaymentDue") as string;
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

const ActionComp = ({ donation }: { donation: DadDonation }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-grey">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="space-x-2">
            <FileIcon />
            <span className="text_tiny_body_r">Track progress</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const DonorDadDonationsTable = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <h3 className="font-aeonik text-xl font-medium leading-[3rem] text-black">
        DAD Project
      </h3>
      <DataTable columns={dadDonationsColumns} data={[]} />
    </div>
  );
};
