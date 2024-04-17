import { useState } from 'react'
import { Button } from "@/components/custom/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type SaveSchema } from '../table/table-schema'
import { DialogForm } from './dialog-form'

interface UpdateDialogProps<TData> {
  entityName: string,
  modelData: TData,
  save: (formData: SaveSchema) => Promise<any>,
  afterSave?: (success: boolean) => void
}

export function UpdateDialog<TData>({ 
  entityName,
  modelData,
  save,
  afterSave
}: UpdateDialogProps<TData>) {
  const [open, setOpen] = useState(false)
  // closeDropdownMenu()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className='w-full'>Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='capitalize'>Update {entityName}</DialogTitle>
          {/* <DialogDescription>
            Fill in the details below to create a new data dictionary.
          </DialogDescription> */}
        </DialogHeader>
        <DialogForm entityName={entityName} modelData={modelData} save={save} afterSave={(success) => {setOpen(false); afterSave && afterSave(success);}}></DialogForm>
      </DialogContent>
    </Dialog>
  )
}
