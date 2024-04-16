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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"
import { UpdateDialog } from '../dialog/update-dialog'

interface DataTableRowActionsProps<TData> {
  entityName: string,
  row: Row<TData>,
  save: (formData: any) => Promise<any>,
  deleteRow: (row: any) => Promise<any>
}

export function DataTableRowActions<TData>({
  entityName,
  row,
  save,
  deleteRow
}: DataTableRowActionsProps<TData>) {
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [delConfirmPopoverOpen, setDelConfirmPopoverOpen] = useState(false)

  function clickDeleteYes(): void {
    toast.promise(deleteRow(row.original), {
      loading: "Deleting " + entityName + "...",
      success: () => {
        setDelConfirmPopoverOpen(false)
        setDropdownMenuOpen(false)
        return "Deleted " + entityName
      },
      error: (error) => {
        setDelConfirmPopoverOpen(false)
        setDropdownMenuOpen(false)
        return getErrorMessage(error)
      }
    })
  }

  function clickDeleteNo(): void {
    setDelConfirmPopoverOpen(false)
    setDropdownMenuOpen(false)
  }

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
      <DropdownMenuContent align='end' className='w-[100px] space-y-1'>
        <UpdateDialog entityName={entityName} save={save}/>
        <Popover open={delConfirmPopoverOpen} onOpenChange={setDelConfirmPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className='w-full'>Delete</Button>
          </PopoverTrigger>
          <PopoverContent className='w-[240px]'>
            Are your sure to delete it?
            <div className="mt-4 flex items-center justify-between space-x-2">
              <Button
                className="w-full"
                variant="destructive"
                size="sm"
                onClick={clickDeleteYes}
              >
                Yes
              </Button>
              <Button
                className="w-full"
                variant="secondary"
                size="sm"
                onClick={clickDeleteNo}
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
