import { useState } from 'react'
import { Dialog } from "@/components/ui/dialog"
import { type SaveSchema } from '../table/table-schema'
import { DialogForm } from './dialog-form'

interface EditDialogProps<TData> {
  children: React.ReactNode,
  entityName: string,
  modelData: TData,
  save: (formData: SaveSchema) => Promise<any>,
  afterSave?: (success: boolean) => void
}

export function EditDialog<TData>({
  children,
  entityName,
  modelData,
  save,
  afterSave
}: EditDialogProps<TData>) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogForm entityName={entityName} modelData={modelData} save={save} afterSave={(success) => {setOpen(false); afterSave && afterSave(success);}}/>
    </Dialog>
  )
}
