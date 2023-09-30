"use client";
import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
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
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  paginationInfo = null,
  isLoading,
}: DataTableProps<TData, TValue>) {
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
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
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
          {!paginationInfo.hasPrevious && !paginationInfo.hasPrevious ? null : (
            <div className="flex items-center justify-end space-x-10 py-4">
              <Button
                variant="link"
                className="px-0 text-body-2"
                size="sm"
                onClick={paginationInfo.handlePrevious}
                disabled={!paginationInfo.handlePrevious}
                loading={isLoading}
              >
                Previous
              </Button>
              <Button
                variant="link"
                className="px-0 text-body-2"
                size="sm"
                onClick={paginationInfo.handleNext}
                disabled={!paginationInfo.hasNext}
                loading={isLoading}
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
