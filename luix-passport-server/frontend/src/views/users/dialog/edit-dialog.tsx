import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog } from "@/components/ui/dialog"
import SaveDialogContent from "@/components/custom/dialog/save-dialog-content"
import InputFormField from "@/components/custom/form-field/input"
import ComboboxFormField from "@/components/custom/form-field/combobox"
import SwitchFormField from "@/components/custom/form-field/switch"
import SelectFormField from "@/components/custom/form-field/select"
import PhoneInputFormField from "@/components/custom/form-field/phone-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type FormSchema, formSchema, initialFormState } from "../table/table-schema"
import { languages } from "@/data/languages"
import { DataDictService } from "@/services/data-dict-service"
import { UserService } from "@/services/user-service"
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
  const [enabledRoles, setEnabledRoles] = useState(Array<any>)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormState
  })

  useEffect(() => {
    if(!open) {
      return
    }
    DataDictService.lookup("role", true).then(r => {
      setEnabledRoles(r.data.map((item: any) => ({label: item.dictCode, value: item.dictCode})))
    })
    if(id) {
      // update form data on every dialog open
      UserService.findById(id).then(r => {
        form.reset(merge(r.data, initialFormState))
      })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <SaveDialogContent entityName={entityName} id={id} form={form} save={save} afterSave={afterSave} setOpen={setOpen}>
        <div className="flex items-center justify-between gap-2">
          <InputFormField 
            control={form.control} 
            name="username" 
            label="Username"
            formItemClassName=""
            required 
            disabled={id ? true : false}
          />
           <Avatar className="size-20">
            <AvatarImage src={"api/user-profile-pics/" + id} alt="profile" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </div>

        <InputFormField 
          control={form.control} 
          name="email" 
          label="Email" 
          required
        />

        <PhoneInputFormField 
          control={form.control} 
          name="mobileNo" 
          label="Mobile No" 
          required
          placeholder="Enter a phone number"
        />
        
        <div className="flex items-center gap-2">
          <InputFormField 
            control={form.control} 
            name="firstName" 
            label="First Name" 
            formItemClassName="w-full"
          />
          
          <InputFormField 
            control={form.control} 
            name="lastName" 
            label="Last Name" 
            formItemClassName="w-full"
          />
        </div>

        <SelectFormField 
          control={form.control} 
          name="language" 
          label="Preferred Language"
          options={languages}
          required
        />

        <InputFormField 
          control={form.control} 
          name="remark" 
          label="Remark"
        />

        <ComboboxFormField
          control={form.control} 
          name="roles"
          label="Roles"
          required
          options={enabledRoles}
          multiple={true}
          description="ROLE_ANONYMOUS, ROLE_USER are required for each user."
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
