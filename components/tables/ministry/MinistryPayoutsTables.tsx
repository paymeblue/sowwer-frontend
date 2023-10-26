"use client";
import DataTable from "@components/ui/data-table";
import Tag from "@components/ui/tag";
import { formatCurrency } from "@lib/functions";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import {
  IMinistryGeneralPayout,
  IMinistryProjectPayout,
} from "services/ministry/typings";

const DUMMY_GENERAL_PAYOUT: IMinistryGeneralPayout[] = [
  {
    amount: "135000",
    createdAt: "2023-08-22T12:29:39.000Z",
    id: "fb690a00-d255-4642-87af-88dffd2319b4",
    payout_date: "2023-08-22T12:29:39.000Z",
    status: "successful",
  },
  {
    amount: "135000",
    createdAt: "2023-08-22T12:29:39.000Z",
    id: "fb690a00-d255-4642-87af-88dffd2319b4",
    payout_date: "2023-08-22T12:29:39.000Z",
    status: "successful",
  },
  {
    amount: "135000",
    createdAt: "2023-08-22T12:29:39.000Z",
    id: "fb690a00-d255-4642-87af-88dffd2319b4",
    payout_date: "2023-08-22T12:29:39.000Z",
    status: "failed",
  },
  {
    amount: "135000",
    createdAt: "2023-08-22T12:29:39.000Z",
    id: "fb690a00-d255-4642-87af-88dffd2319b4",
    payout_date: "2023-08-22T12:29:39.000Z",
    status: "successful",
  },
];
const DUMMY_PROJECT_PAYOUT: IMinistryProjectPayout[] = [
  {
    amount: "135000",
    createdAt: "2023-08-22T12:29:39.000Z",
    id: "fb690a00-d255-4642-87af-88dffd2319b4",
    payout_date: "2023-08-22T12:29:39.000Z",
    status: "successful",
    donor_count: 13,
    project_goal: 1355000,
    project_title: "The Widows Project",
  },
  {
    amount: "135000",
    createdAt: "2023-08-22T12:29:39.000Z",
    id: "fb690a00-d255-4642-87af-88dffd2319b4",
    payout_date: "2023-08-22T12:29:39.000Z",
    status: "successful",
    donor_count: 13,
    project_goal: 1355000,
    project_title: "The Widows Project",
  },
  {
    amount: "135000",
    createdAt: "2023-08-22T12:29:39.000Z",
    id: "fb690a00-d255-4642-87af-88dffd2319b4",
    payout_date: "2023-08-22T12:29:39.000Z",
    status: "successful",
    donor_count: 13,
    project_goal: 1355000,
    project_title: "The Widows Project",
  },
  {
    amount: "135000",
    createdAt: "2023-08-22T12:29:39.000Z",
    id: "fb690a00-d255-4642-87af-88dffd2319b4",
    payout_date: "2023-08-22T12:29:39.000Z",
    status: "successful",
    donor_count: 13,
    project_goal: 1355000,
    project_title: "The Widows Project",
  },
];

const ministryProjectPayoutsColumns: ColumnDef<IMinistryProjectPayout>[] = [
  {
    accessorKey: "project_title",
    header: "Project Name",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">
          {row.getValue("project_title")}
        </span>
      );
    },
  },
  {
    accessorKey: "project_goal",
    header: "Project Goal",
    cell: ({ row }) => {
      const formatedAmmount = formatCurrency(
        row.getValue("project_goal") as string
      );
      return <span>₦{formatedAmmount}</span>;
    },
  },
  {
    accessorKey: "donor_count",
    header: "No. Of Donors",
  },
  {
    accessorKey: "amount",
    header: "Amount Raised",
    cell: ({ row }) => {
      const formatedAmmount = formatCurrency(row.getValue("amount") as string);
      return <span>₦{formatedAmmount}</span>;
    },
  },
  {
    accessorKey: "payout_date",
    header: "Payout Date",
    cell: ({ row }) => {
      const value = row.getValue("payout_date") as string;
      return <span>{moment(value).format("Do MMMM YYYY; h:mm:ss a")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Payout Status",
    cell: ({ row }) => {
      const val = row.getValue("status") as string;
      const getColors = (status: string) => {
        if (status === "successful") {
          return {
            bg: "#E9FCF0",
            text: "#219653",
          };
        }

        if (status === "pending") {
          return {
            bg: "#F2C94C",
            text: "#FCFAE9",
          };
        }

        return {
          bg: "#FCE9E9",
          text: "#EB5757",
        };
      };
      return (
        <Tag
          backgroundColor={getColors(val).bg}
          color={getColors(val).text}
          className="w-full rounded-[7px] text-[12px] capitalize"
        >
          {val}
        </Tag>
      );
    },
  },
];
const ministryGeneralPayoutColumns: ColumnDef<IMinistryGeneralPayout>[] = [
  {
    accessorKey: "amount",
    header: "Amount Paid",
    cell: ({ row }) => {
      const formatedAmmount = formatCurrency(row.getValue("amount") as string);
      return <span>₦{formatedAmmount}</span>;
    },
  },
  {
    accessorKey: "payout_date",
    header: "Payout Date",
    cell: ({ row }) => {
      const value = row.getValue("payout_date") as string;
      return <span>{moment(value).format("Do MMMM YYYY; h:mm:ss a")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Payout Status",
    cell: ({ row }) => {
      const val = row.getValue("status") as string;
      const getColors = (status: string) => {
        if (status === "successful") {
          return {
            bg: "#E9FCF0",
            text: "#219653",
          };
        }

        if (status === "pending") {
          return {
            bg: "#F2C94C",
            text: "#FCFAE9",
          };
        }

        return {
          bg: "#FCE9E9",
          text: "#EB5757",
        };
      };
      return (
        <Tag
          backgroundColor={getColors(val).bg}
          color={getColors(val).text}
          className="w-full rounded-[7px] text-[12px] capitalize"
        >
          {val}
        </Tag>
      );
    },
  },
];

interface Props {
  type: "project" | "general";
}

const MinstryPayoutsTable = ({ type }: Props) => {
  if (type === "project") {
    return (
      <DataTable
        data={DUMMY_PROJECT_PAYOUT}
        columns={ministryProjectPayoutsColumns}
      />
    );
  }

  return (
    <DataTable
      data={DUMMY_GENERAL_PAYOUT}
      columns={ministryGeneralPayoutColumns}
    />
  );
};

export default MinstryPayoutsTable;
