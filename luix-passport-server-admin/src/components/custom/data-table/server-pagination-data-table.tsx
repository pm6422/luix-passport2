import { useState, useEffect } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Sorting
} from '@tanstack/react-table'
import { DataTablePagination } from './data-table-pagination'
// import { DataTableToolbar } from '../custom/table-toolbar'
import { DataTableViewOptions } from '@/components/custom/data-table/data-table-view-options'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  totalCount: number,
  totalPages: number,
  onPaginationChange: Function,
  onSortingChange: Function
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalCount,
  totalPages,
  onPaginationChange,
  onSortingChange
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    manualPagination: true, // turn off client-side pagination
    manualSorting: true, // turn off client-side sorting
    pageCount: totalPages, // add page count
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(), // load client-side pagination code
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const currentPaginationState = table.getState().pagination;
  // Use the useEffect hook to listen for changes in the currentPaginationState and trigger the onPaginationChange callback when it changes
  useEffect(() => {
    onPaginationChange && onPaginationChange(currentPaginationState);
  }, [currentPaginationState]);

  const currentSortingState = table.getState().sorting;
  // Use the useEffect hook to listen for changes in the currentSortingState and trigger the onSortingChange callback when it changes
  useEffect(() => {
    onSortingChange && onSortingChange(currentSortingState);
  }, [currentSortingState])

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        {/* <DataTableToolbar table={table} /> */}
        <DataTableViewOptions columns={table.getAllColumns()} />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} totalCount={totalCount}/>
    </div>
  )
}
