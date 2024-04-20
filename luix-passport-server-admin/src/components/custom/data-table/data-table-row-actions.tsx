import { useState } from 'react'
import { IconTrash } from '@tabler/icons-react'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'sonner'
import { getErrorMessage } from '@/libs/handle-error'

interface DataTableRowActionsProps {
  children: React.ReactNode,
  moreActions?: React.ReactNode,
  entityName: string,
  row: Row<any>,
  deleteRow: (row: any) => Promise<any>
}

export function DataTableRowActions({
  children,
  moreActions,
  entityName,
  row,
  deleteRow
}: DataTableRowActionsProps) {
  const [delConfirmPopoverOpen, setDelConfirmPopoverOpen] = useState(false)

  function clickDeleteYes(): void {
    toast.promise(deleteRow(row.original), {
      loading: 'Deleting ' + entityName + '...',
      success: () => {
        setDelConfirmPopoverOpen(false)
        return 'Deleted ' + entityName
      },
      error: (error) => {
        setDelConfirmPopoverOpen(false)
        return getErrorMessage(error)
      }
    })
  }

  function clickDeleteNo(): void {
    setDelConfirmPopoverOpen(false)
  }

  return (
    <div className='flex items-center space-x-2'>
      {children}
      <Popover open={delConfirmPopoverOpen} onOpenChange={setDelConfirmPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant='secondary' className='flex h-8 w-8 p-0'>
            <IconTrash className='h-4 w-4' />
            <span className='sr-only'>Delete</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[240px]'>
          Are your sure to delete it?
          <div className="mt-4 flex items-center justify-between space-x-2">
            <Button
              className="w-full"
              variant="secondary"
              size="sm"
              onClick={clickDeleteNo}
            >
              No
            </Button>
            <Button
              className="w-full"
              variant="destructive"
              size="sm"
              onClick={clickDeleteYes}
            >
              Yes
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {moreActions}
    </div>
  )
}
