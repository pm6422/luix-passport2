import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FormErrors from "@/components/custom/form/form-errors"
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"
import { Button } from "@/components/custom/button"
import { IconReload } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { RequiredFormLabel } from "@/components/custom/required-form-label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import InputFormField from "@/components/custom/form/input"
import { Switch } from "@/components/ui/switch"
import Combobox from "@/components/custom/combobox"
import { PhoneInput } from "@/components/custom/phone-input";
import { initialFormState, formSchema, type FormSchema } from "../table/table-schema"
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
  const [saving, setSaving] = useState(false)
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

  function onSubmit(formData: FormSchema): void {
    setSaving(true)
    toast.promise(save(formData), {
      loading: "Saving " + entityName + "...",
      success: () => {
        setOpen(false)
        form.reset()
        afterSave && afterSave(true)
        setSaving(false)
        return "Saved " + entityName
      },
      error: (error) => {
        setOpen(false)
        afterSave && afterSave(false)
        setSaving(false)
        return getErrorMessage(error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="lg:max-w-screen-md max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">{id ? "Update" : "Create"} {entityName}</DialogTitle>
        </DialogHeader>
        <Separator/>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormErrors form={form}/>

            <InputFormField 
              control={form.control} 
              name="username" 
              label="Username" 
              required 
              disabled={id ? true : false}
            />

            <InputFormField 
              control={form.control} 
              name="email" 
              label="Email" 
              required
            />

            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel required={true}>Mobile No</RequiredFormLabel>
                  <FormControl>
                    <PhoneInput defaultCountry="CN" international placeholder="Enter a phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <InputFormField 
              control={form.control} 
              name="remark" 
              label="Remark"
            />

            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel required={true}>Roles</RequiredFormLabel>
                  <FormControl>
                    <Combobox
                      options={enabledRoles}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      multiple={true}
                    />
                  </FormControl>
                  <FormDescription>
                    ROLE_ANONYMOUS, ROLE_USER are required for each user.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem >
                  <div className="flex items-center space-x-2">
                    <FormLabel>Enabled</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    After disabling, existing data can still reference the object, but new data can't.
                  </FormDescription>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => afterSave && afterSave(true)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={saving}>
                {saving ? "Saving..." : "Save"}
                {saving && (<IconReload className="ml-1 h-4 w-4 animate-spin"/>)}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
