import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { IconPlus } from '@tabler/icons-react'
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"
import { Button } from "@/components/custom/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch'
import { saveSchema, type SaveSchema } from '../table/table-schema'
import { DataDictService } from '@/services/data-dict-service'
import { map, uniq } from 'lodash'
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
