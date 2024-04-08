import { useState, useEffect } from 'react'
import {
  ColumnDef,
  PaginationState,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { DataTablePagination } from './data-table-pagination'
import { DataTableViewOptions } from '@/components/custom/data-table/data-table-view-options'
import { parseSorts } from '@/libs/utils'
import { Button } from '@/components/custom/button'
import { IconTrash } from '@tabler/icons-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableProps<TData, TValue> {
  children: React.ReactNode
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  totalCount: number,
  totalPages: number,
  loadPage: Function,
  deleteRows?: Function
}

export function DataTable<TData, TValue>({
  children,
  columns,
  data,
  totalCount,
  totalPages,
  loadPage,
  deleteRows
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection,
      pagination,
      sorting,
      columnFilters,
    },
    manualPagination: true, // turn off client-side pagination
    manualSorting: true, // turn off client-side sorting
    manualFiltering: true, // turn off client-side filtering
    pageCount: totalPages, // add page count
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
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

  // Use the useEffect hook to listen for changes and trigger the loadPage callback when it changes
  useEffect(() => {
    loadPage && loadPage(pagination.pageIndex, pagination.pageSize, parseSorts(sorting));
  }, [pagination, sorting]);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        {children}
        { Object.keys(rowSelection).length > 0 && (
            <Button
              variant='destructive'
              size='sm'
              className='ml-auto hidden h-8 lg:flex mr-2'
              onClick={() => {
                const selectedRows = Object.keys(rowSelection).map(rowIndex => data[parseInt(rowIndex)]);
                deleteRows && deleteRows(selectedRows);
              }}
            >
              <IconTrash className='mr-2 h-4 w-4' />
              Delete{`(${Object.keys(rowSelection).length})`}
            </Button>
        )}
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
