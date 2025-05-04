"use client";

// import { FileIcon } from "@components/assets/icons";
import EmptyStateDonation from "@components/assets/icons/EmptyStateDonation";
import EmptyState from "@components/shared/EmptyState";
// import { Button } from "@components/ui/button";
// import DataTable from "@components/ui/data-table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@components/ui/dropdown-menu";
// import usePagination from "@hooks/general/usePagination";
// import { formatCurrency } from "@lib/functions";
// import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import moment from "moment";
// import { useGetDonationsQuery } from "services/donations";
// import { Donation } from "services/donations/typings";

// const dadDonationsColumns: ColumnDef<Donation>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: (params) => {
//       const { name } = params.row.original;
//       return <span>{name || "N/A"}</span>;
//     },
//   },
//   {
//     accessorKey: "age",
//     header: "Age",
//     cell: (params) => {
//       const { age } = params.row.original;
//       return <span>{age || "N/A"}</span>;
//     },
//   },
//   {
//     accessorKey: "geo_location",
//     header: "Geolocation",
//     cell: (params) => {
//       const { geo_location } = params.row.original;
//       return <span className="capitalize">{geo_location}</span>;
//     },
//   },
//   {
//     accessorKey: "feePerTerm",
//     header: "Fee Per Term",
//     cell: (params) => {
//       const { amount } = params.row.original;
//       return <span>₦{formatCurrency(amount || "")}</span>;
//     },
//   },
//   {
//     accessorKey: "paymentFrequency",
//     header: "Payment Frequency",
//     cell: (params) => {
//       const { frequency } = params.row.original;
//       return <span className="capitalize">{frequency}</span>;
//     },
//   },
//   {
//     accessorKey: "recurringCharge",
//     header: "Total Payment",
//     cell: (params) => {
//       const amount = params.row.original?.recurringCharge?.total_amount;
//       console.log(params.row.original);
//       return <span>₦{formatCurrency(amount || "")}</span>;
//     },
//   },
//   {
//     accessorKey: "nextPaymentDue",
//     header: "Next Payment Due",
//     cell: ({ row }) => {
//       const value = row.original.recurringCharge?.next_payment_date;
//       return (
//         <span>
//           {value ? moment(value).format("Do MMMM YYYY; h:mm:ss a") : "N/A"}
//         </span>
//       );
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const donation = row.original;

//       return <ActionComp donation={donation} />;
//     },
//   },
// ];

// const ActionComp = ({ donation }: { donation: Donation }) => {
//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-grey">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem className="space-x-2">
//             <FileIcon />
//             <span className="text_tiny_body_r">Track progress</span>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// };

export const DonorDadDonationsTable = () => {
  // const { pagination, handleNext, handlePrevious } = usePagination();
  // const { data } = useGetDonationsQuery({
  //   page: pagination.current,
  //   limit: pagination.pageSize,
  //   type: "dad-project",
  //   extended: true,
  // });

  return (
    <div className="flex w-full flex-col gap-2">
      <h3 className="font-aeonik text-xl font-medium leading-[3rem] text-black">
        DAD Project
      </h3>
      <EmptyState
        image={<EmptyStateDonation />}
        title="No child assigned yet"
        desc="Once you sponsor an orphan’s full education scholarship, and a child is assigned, you can manage their progress from here."
      />
      {/* <DataTable
        columns={dadDonationsColumns}
        data={data?.data || []}
        paginationInfo={{
          handleNext,
          handlePrevious,
          hasNext: data?.paginationInfo?.hasNext || false,
          hasPrevious: data?.paginationInfo?.hasPrevious || false,
        }}
      /> */}
    </div>
  );
};
