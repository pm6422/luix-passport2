import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"
import { Button } from "@/components/custom/button"
import { IconReload, IconExclamationCircle } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription
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
import { Alert, AlertTitle } from "@/components/ui/alert"
import { RequiredFormLabel } from "@/components/custom/required-form-label"
import InputFormField from "@/components/custom/form/input";
import Combobox from "@/components/custom/combobox"
import { Switch } from "@/components/ui/switch"
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
      <DialogContent className="lg:max-w-screen-sm max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">{id ? "Update" : "Create"} {entityName}</DialogTitle>
          { form.getValues().num && 
            <DialogDescription className="text-xs">Number: {form.getValues().num}</DialogDescription>
          }
        </DialogHeader>
        <Separator/>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {Object.values(form.formState.errors).length > 0 && (
              <Alert variant="destructive">
                <AlertTitle className="flex items-center"><IconExclamationCircle className="size-5 me-1" />Please check your input.</AlertTitle>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="categoryCode"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>Category Code</RequiredFormLabel>
                  <FormControl>
                    <Combobox
                      options={categoryCodeOptions}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select or input a category code"
                      createable={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <InputFormField control={form.control} name="dictCode" label="Dictionary Code" required/>
            <InputFormField control={form.control} name="dictName" label="Dictionary Name"/>
            <InputFormField control={form.control} name="remark" label="Remark"/>

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
                    After disabling, existing data can still reference the object, but new data can"t.
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
