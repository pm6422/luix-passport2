import { useState } from 'react'
import { IconDots } from '@tabler/icons-react'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { tableSchema } from './table-schema'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  deleteRow: (row: any) => Promise<any>
}

export function DataTableRowActions<TData>({
  row,
  deleteRow
}: DataTableRowActionsProps<TData>) {
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [delConfirmPopoverOpen, setDelConfirmPopoverOpen] = useState(false)

  return (
    <DropdownMenu open={dropdownMenuOpen} onOpenChange={setDropdownMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <IconDots className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[75px] space-y-1'>
        <Button variant="outline" className='w-full'>Edit</Button>
        <Popover open={delConfirmPopoverOpen} onOpenChange={setDelConfirmPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className='w-full'>Delete</Button>
          </PopoverTrigger>
          <PopoverContent className='w-[240px]'>
            Are your sure to delete it?
            <div className="mt-4 flex items-center justify-between space-x-2">
              <Button
                className="w-full"
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  toast.promise(deleteRow(row.original), {
                    loading: "Deleting data dictionary...",
                    success: () => {
                      setDelConfirmPopoverOpen(false)
                      setDropdownMenuOpen(false)
                      return "Data dictionary deleted"
                    },
                    error: (error) => {
                      setDelConfirmPopoverOpen(false)
                      setDropdownMenuOpen(false)
                      return getErrorMessage(error)
                    }
                  })
                }}
              >
                Yes
              </Button>
              <Button
                className="w-full"
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setDelConfirmPopoverOpen(false)
                  setDropdownMenuOpen(false)
                }}
              >
                No
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
