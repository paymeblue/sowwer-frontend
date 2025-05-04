"use client";

// import { FileIcon } from "@components/assets/icons";
import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useToast } from "@components/ui/use-toast";
import { formatCurrency } from "@lib/functions";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useGetDonationsQuery } from "services/donations";
import { Donation } from "services/donations/typings";
import { useToggleDonationRecurringPaymentMutation } from "services/payouts";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const donation = row.original;

      return <ActionComp donation={donation} />;
    },
  },
];

const ActionComp = ({ donation }: { donation: Donation }) => {
  const [togglePayment, { isLoading: togglingPayment }] =
    useToggleDonationRecurringPaymentMutation();
  const { toast } = useToast();

  const handleTogglePayment = async () => {
    try {
      await togglePayment({
        id: donation.recurringCharge?.id || "",
      }).unwrap();
      toast({
        title: `${
          donation?.recurringCharge?.status === "cancelled"
            ? "Donation recurring payment resumed successfully"
            : "Donation recurring payment paused successfully"
        }`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: `${
          donation?.recurringCharge?.status === "cancelled"
            ? "Unable to resume payment"
            : "Unable to pause payment"
        }`,
      });
    }
  };

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
          <DropdownMenuItem
            className="space-x-2"
            onClick={handleTogglePayment}
            disabled={togglingPayment || donation?.frequency === "one-time"}
          >
            {/* <FileIcon /> */}
            <span
              className={`${
                donation?.recurringCharge?.status === "cancelled"
                  ? "text-accent"
                  : "text-[#EB5757]"
              } text_tiny_body_r`}
            >
              {donation?.recurringCharge?.status === "cancelled"
                ? "Resume payment"
                : "Pause payment"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const DonorDonationsTable = () => {
  const { data } = useGetDonationsQuery({
    page: 1,
    limit: 10,
    extended: true,
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
