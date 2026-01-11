/* eslint-disable react/prop-types */
import React, { useState, useMemo, useDeferredValue } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";

// Simple fuzzy filter
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

// Convert your column format to TanStack columns
const convertColumns = (columns) =>
  columns.map((col) => ({
    id: col.key,
    accessorKey: col.key,
    header: col.label,
    cell: (info) =>
      col.render ? col.render(info.row.original) : info.getValue() ?? "-",
  }));

export default function PaginatedTable({
  title = "Table",
  data = [],
  columns = [],
  onAdd = () => {},
  onRefresh = () => {},
  showAdd = false,
  showSearch = true,
  showRefresh = true,
  buttonTitle = "",
}) {
  const memoData = useMemo(() => [...data], [data]);
  const memoColumns = useMemo(() => convertColumns(columns), [columns]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const deferredFilter = useDeferredValue(globalFilter);

  const table = useReactTable({
    data: memoData,
    columns: memoColumns,
    state: { sorting, globalFilter: deferredFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex gap-5">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          {showAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 bg-dark text-white px-3 py-1.5 rounded-md"
              title={buttonTitle}
            >
              <PlusIcon className="w-4 h-4" strokeWidth={2}/>
              {/* {buttonTitle} */}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          )}

          {showRefresh && (
            <button
              onClick={() => {
                table.resetSorting();
                table.resetPagination();
                table.resetGlobalFilter();
                onRefresh();
              }}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              title="Refresh"
            >
              <ArrowPathIcon className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 select-none cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: "↑",
                        desc: "↓",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-gray-500 py-4"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
