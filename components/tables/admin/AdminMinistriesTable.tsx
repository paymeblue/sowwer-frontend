"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import { Button } from "@components/ui/button";
import DataTable from "@components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { useToast } from "@components/ui/use-toast";
import usePagination from "@hooks/general/usePagination";
import { ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import {
  useGetMinistriesQuery,
  useVerifyMinistryMutation,
} from "services/admin";
import { AdminMinistryBase } from "services/admin/typings";

const adminMinistriesColumn: ColumnDef<AdminMinistryBase>[] = [
  {
    accessorKey: "name",
    header: "Ministry Name",
    cell: ({ row }) => {
      return (
        <span className="font-[600] capitalize">{row.getValue("name")}</span>
      );
    },
  },

  {
    accessorKey: "category",
    header: "Ministry Type",
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("category")}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "createdAt",
    header: "Date Joined",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return <span>{moment(value).format("Do MMMM YYYY; h:mm:ss a")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ministry = row.original;

      return (
        <ActionComp
          id={ministry.id}
          isVerified={ministry.verificationStatus}
          name={ministry.name}
        />
      );
    },
  },
];

const ActionComp = ({
  id,
  isVerified,
  name,
}: {
  id: string;
  isVerified: boolean;
  name: string;
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [verifyMinistry, { isLoading }] = useVerifyMinistryMutation();

  const handleClick = async () => {
    try {
      await verifyMinistry({ id }).unwrap();
      toast({
        title: "Ministry successully verified",
      });
      setOpen(false);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Unable to verify ministry. Please try again later.",
      });
    }
  };

  return (
    <>
      {!isVerified ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="w-fit space-x-2 text-[.8rem] text-[#27AE60]"
            >
              <Check size={14}></Check>
              <span>Verify</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verfiy User</DialogTitle>
            </DialogHeader>
            <div className="mb-4 mt-2 flex flex-col space-y-4 border-t-[.5px] border-[#DEDEDE] px-4 pt-4">
              <p className="text-center font-body text-body-1">
                Are you sure you want to verify this ministry “
                <span className="font-[600] capitalize">{name}</span>”?
              </p>
              <Button
                variant="secondary"
                onClick={handleClick}
                className="w-full"
                loading={isLoading}
              >
                Verify User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};

interface Props {
  status: "verified" | "unverified";
}

const AdminMinistriesTable = ({ status }: Props) => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const {
    data: ministries,
    isLoading,
    isFetching,
  } = useGetMinistriesQuery({
    limit: pagination.pageSize,
    page: pagination.current,
    status,
  });

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!ministries?.data?.length) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No ministries"
        desc="This page will be populated once you have ministries"
      />
    );
  }

  return (
    <DataTable
      data={ministries.data || []}
      columns={adminMinistriesColumn}
      isLoading={isFetching}
      rowClassName="cursor-pointer"
      navigateOptions={{
        base: "/admin/ministries",
      }}
      paginationInfo={{
        handleNext,
        handlePrevious,
        hasNext: ministries?.paginationInfo?.hasNext || false,
        hasPrevious: ministries?.paginationInfo?.hasPrevious || false,
      }}
    />
  );
};

export default AdminMinistriesTable;
