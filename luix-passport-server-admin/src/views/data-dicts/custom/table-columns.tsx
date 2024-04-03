import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/custom/data-table/data-table-column-header'
import { DataTableRowActions } from './table-row-actions'
import { YesNo } from '@/data/yes-no'
import { DataDict } from './table-schema'
import { formatDateTime } from '@/lib/utils'

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
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='ID' />
  //   ),
  //   cell: ({ row }) => <div className='w-[30px]'>{row.getValue('id')}</div>,
  //   enableSorting: false,
  //   enableHiding: true,
  // },
  {
    accessorKey: 'num',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Number' />
    ),
    cell: ({ row }) => <div className='w-[30px]'>{row.getValue('num')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'categoryCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category Code' />
    ),
    cell: ({ row }) => <div className='w-[50px]'>{row.getValue('categoryCode')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'dictCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dictionary Code' />
    ),
    cell: ({ row }) => <div className='w-[50px]'>{row.getValue('dictCode')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'dictName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dictionary Name' />
    ),
    cell: ({ row }) => <div className='w-[50px]'>{row.getValue('dictName')}</div>,
    enableSorting: true,
    enableHiding: true,
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
    cell: ({ row }) => {
      const element = YesNo.find(
        (element) => element.value === row.getValue('enabled')
      )

      return (
        <div className='flex w-[100px] items-center'>
          {element && element.icon && (
            <element.icon className='mr-2 h-5 w-5 text-muted-foreground' />
          )}
          <span>{element && element.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'modifiedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Modified at' />
    ),
    cell: ({ row }) => <div className='w-[150px]'>{formatDateTime(row.getValue('modifiedAt'))}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
