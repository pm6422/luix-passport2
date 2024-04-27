import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog } from "@/components/ui/dialog"
import SaveDialogContent from "@/components/custom/dialog/save-dialog-content"
import InputFormField from "@/components/custom/form-field/input"
import ComboboxFormField from "@/components/custom/form-field/combobox"
import SwitchFormField from "@/components/custom/form-field/switch"
import { initialFormState, formSchema, type FormSchema } from "../table/table-schema"
import { DataDictService } from "@/services/data-dict-service"
import { merge } from "@/libs/utils"

interface EditDialogProps {
  children: React.ReactNode,
  entityName: string,
  id?: string,
  save: (formData: FormSchema) => Promise<any>,
  afterSave?: (success: boolean) => void
}

export function EditDialog({
  children,
  entityName,
  id,
  save,
  afterSave
}: EditDialogProps) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [categoryCodeOptions, setCategoryCodeOptions] = useState(Array<any>)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormState
  })

  useEffect(() => {
    if(!open) {
      return
    }
    DataDictService.findAll(true).then(function (res) {
      const options = Array.from(new Set(res.data.map((item: any) => item.categoryCode))).map(code => ({ label: code, value: code }))
      setCategoryCodeOptions(options)
    })
    if(id) {
      // update form data on every dialog open
      DataDictService.findById(id).then(r => {
        form.reset(merge(r.data, initialFormState))
      })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <SaveDialogContent entityName={entityName} id={id} form={form} save={save} afterSave={afterSave} setOpen={setOpen}>
        <ComboboxFormField
          control={form.control} 
          name="categoryCode"
          label="Category Code"
          required
          options={categoryCodeOptions}
          placeholder="Select or input a category code"
          createable={true}
        />

        <InputFormField 
          control={form.control} 
          name="dictCode" 
          label="Dictionary Code" 
          required
        />

        <InputFormField 
          control={form.control} 
          name="dictName" 
          label="Dictionary Name"
        />

        <InputFormField 
          control={form.control} 
          name="remark" 
          label="Remark"
        />

        <SwitchFormField 
          control={form.control} 
          name="enabled" 
          label="Enabled"
          description="After disabling, existing data can still reference the object, but new data can"
        />
      </SaveDialogContent>
    </Dialog>
  )
}
