import { useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
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

interface CreateDialogProps {
  entityName: string,
  save: (formData: SaveSchema) => Promise<any>
}

export function CreateDialog({ 
  entityName,
  save
}: CreateDialogProps) {
  const [open, setOpen] = useState(false)

  const modelData = {
    categoryCode: '',
    dictCode: '',
    dictName: '',
    remark: '',
    enabled: true
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="mr-2">
          <IconPlus className="mr-2 size-4" aria-hidden="true" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
        <DialogTitle className='capitalize'>Create {entityName}</DialogTitle>
          {/* <DialogDescription>
            Fill in the details below to create a new data dictionary.
          </DialogDescription> */}
        </DialogHeader>
        <DialogForm entityName={entityName} modelData={modelData} save={save} closeDialog={() => setOpen(false)}></DialogForm>
      </DialogContent>
    </Dialog>
  )
}
