import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/custom/data-table/data-table-column-header'
import { DataTableRowActions } from './table-row-actions'
import { FormSchema } from './table-schema'
import { formatDateTime } from '@/libs/utils'
import { YesNo } from '@/data/yes-no'

export function getColumns(
  entityName: string,
  save: (formData: any) => Promise<any>,
  deleteRow: (row: any) => Promise<any>, 
): ColumnDef<FormSchema>[] {
  return [
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
      accessorKey: 'username',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Username' />
      ),
      cell: ({ row }) => <div className='w-[20px]'>{row.getValue('username')}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Email' />
      ),
      cell: ({ row }) => <div className='w-[50px]'>{row.getValue('email')}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'mobileNo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Mobile No' />
      ),
      cell: ({ row }) => <div className='w-[50px]'>{row.getValue('mobileNo')}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='First Name' />
      ),
      cell: ({ row }) => <div className='w-[50px]'>{row.getValue('firstName')}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Last Name' />
      ),
      cell: ({ row }) => <div className='w-[150px]'>{row.getValue('lastName')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'enabled',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Enabled' />
      ),
      cell: ({ row }) => {
        const element = YesNo.find(e => e.value === row.getValue('enabled'))

        return (
          <div className='flex w-[50px] items-center'>
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
        <DataTableColumnHeader column={column} title='Modified At' />
      ),
      cell: ({ row }) => <div className='w-[150px]'>{formatDateTime(row.getValue('modifiedAt'))}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions entityName={entityName} row={row} save={save} deleteRow={deleteRow}/>,
    }
  ]
}
