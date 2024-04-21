import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { IconEdit } from '@tabler/icons-react'
import { DataTableColumnHeader } from '@/components/custom/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/custom/data-table/data-table-row-actions'
import { Button } from '@/components/custom/button'
import { YesNo } from '@/data/yes-no'
import { DialogTrigger } from '@/components/ui/dialog'
import { FormSchema } from './table-schema'
import { EditDialog } from '../dialog/edit-dialog'
import { formatDateTime } from '@/libs/utils'

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
      cell: ({ row }) => <div className='w-[50px]'>{row.getValue('username')}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Email' />
      ),
      cell: ({ row }) => <div className='w-[100px]'>{row.getValue('email')}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'mobileNo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Mobile No' />
      ),
      cell: ({ row }) => <div className='w-[100px]'>{row.getValue('mobileNo')}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='First Name' />
      ),
      cell: ({ row }) => <div className='w-[50px]'>{row.getValue('firstName')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Last Name' />
      ),
      cell: ({ row }) => <div className='w-[50px]'>{row.getValue('lastName')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'roles',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Roles' />
      ),
      cell: ({ row }) => (
        <div className='w-[100px] text-xs'>
          {(row.getValue('roles') as string[]).map((role, index) => (
            <div key={index}>{role}</div>
          ))}
        </div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'activated',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Activated' />
      ),
      cell: ({ row }) => {
        const element = YesNo.find(e => e.value === row.getValue('activated'))

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
      accessorKey: 'lastSignInAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Last Sign In' />
      ),
      cell: ({ row }) => <div className='w-[150px]'>{formatDateTime(row.getValue('lastSignInAt'))}</div>,
      enableSorting: true,
      enableHiding: true,
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
      cell: ({ row }) => (
        <DataTableRowActions entityName={entityName} row={row} deleteRow={deleteRow}>
          <EditDialog entityName={entityName} id={row.original.id} save={save}>
            <DialogTrigger asChild>
              <Button variant='secondary' className='flex h-8 w-8 p-0'>
                <IconEdit className='h-4 w-4' />
                <span className='sr-only'>Update</span>
              </Button>
            </DialogTrigger>
          </EditDialog>
        </DataTableRowActions>
      )
    }
  ]
}
