import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '../components/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { labels, priorities, statuses } from './data'
import { DataDict } from './schema'

export const columns: ColumnDef<DataDict>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[30px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'num',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='#' />
    ),
    cell: ({ row }) => <div className='w-[30px]'>{row.getValue('num')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'categoryCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category Code' />
    ),
    cell: ({ row }) => <div className='w-[50px]'>{row.getValue('categoryCode')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'dictCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dictionary Code' />
    ),
    cell: ({ row }) => <div className='w-[50px]'>{row.getValue('dictCode')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'dictName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dictionary Name' />
    ),
    cell: ({ row }) => <div className='w-[50px]'>{row.getValue('dictName')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'remark',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Remark' />
    ),
    cell: ({ row }) => <div className='w-[100px]'>{row.getValue('remark')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'enabled',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Enabled' />
    ),
    cell: ({ row }) => <div className='w-[50px]'>{'' + row.getValue('enabled')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'modifiedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Modified At' />
    ),
    cell: ({ row }) => <div className='w-[150px]'>{row.getValue('modifiedAt')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'title',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Title' />
  //   ),
  //   cell: ({ row }) => {
  //     const label = labels.find((label) => label.value === row.original.label)

  //     return (
  //       <div className='flex space-x-2'>
  //         {label && <Badge variant='outline'>{label.label}</Badge>}
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('title')}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Status' />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue('status')
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className='flex w-[100px] items-center'>
  //         {status.icon && (
  //           <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
