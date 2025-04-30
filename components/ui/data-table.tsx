"use client";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useState } from "react";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "./button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  paginationInfo?: {
    hasNext: boolean;
    hasPrevious: boolean;
    handleNext: () => void;
    handlePrevious: () => void;
  } | null;
  rowClassName?: HTMLAttributes<HTMLDivElement>["className"];
  navigateOptions?: {
    base: string;
  };
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  paginationInfo = null,
  isLoading,
  rowClassName,
  navigateOptions,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div>
        <Table>
          <TableHeader className="bg-[#F7F8FA]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={rowClassName}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const header = cell.id.split("_")[1];

                    return (
                      <TableCell
                        key={cell.id}
                        className="whitespace-nowrap"
                        onClick={
                          navigateOptions && header !== "actions"
                            ? () => {
                                const { base } = navigateOptions;
                                const rowData = row.original as any;
                                router.push(`${base}/${rowData?.id}`);
                              }
                            : undefined
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className={rowClassName}>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!paginationInfo ? (
        <>
          {!table.getCanPreviousPage() && !table.getCanNextPage() ? null : (
            <div className="flex items-center justify-end space-x-10 py-4">
              <Button
                variant="link"
                className="px-0 text-body-2"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="link"
                className="px-0 text-body-2"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          {!paginationInfo.hasPrevious && !paginationInfo.hasNext ? null : (
            <div className="flex items-center justify-end space-x-10 py-4">
              <Button
                variant="link"
                className="px-0 text-body-2"
                size="sm"
                onClick={paginationInfo.handlePrevious}
                disabled={!paginationInfo.hasPrevious}
                loading={isLoading && paginationInfo.hasPrevious}
              >
                Previous
              </Button>
              <Button
                variant="link"
                className="px-0 text-body-2"
                size="sm"
                onClick={paginationInfo.handleNext}
                disabled={!paginationInfo.hasNext}
                loading={isLoading && paginationInfo.hasNext}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
