import { useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { Button } from "@/components/custom/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { type SaveSchema } from '../table/table-schema'
import { DialogForm } from './dialog-form'

interface CreateDialogProps<TData> {
  entityName: string,
  modelData: TData,
  save: (formData: SaveSchema) => Promise<any>,
  afterSave?: (success: boolean) => void
}

export function CreateDialog<TData>({ 
  entityName,
  modelData,
  save,
  afterSave
}: CreateDialogProps<TData>) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="mr-2">
          <IconPlus className="mr-2 size-4" aria-hidden="true" />
          Create
        </Button>
      </DialogTrigger>
      <DialogForm entityName={entityName} modelData={modelData} save={save} afterSave={(success) => {setOpen(false); afterSave && afterSave(success);}}/>
    </Dialog>
  )
}
