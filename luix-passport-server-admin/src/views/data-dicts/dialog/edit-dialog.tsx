import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getErrorMessage } from '@/libs/handle-error'
import { Button } from '@/components/custom/button'
import { IconReload } from '@tabler/icons-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Combobox from '@/components/custom/combobox'
import { Switch } from '@/components/ui/switch'
import { formSchema, type FormSchema } from '../table/table-schema'
import { DataDictService } from '@/services/data-dict-service'
import { map, uniq } from 'lodash'

interface EditDialogProps {
  children: React.ReactNode,
  entityName: string,
  modelData: FormSchema,
  save: (formData: FormSchema) => Promise<any>,
  afterSave?: (success: boolean) => void
}

export function EditDialog({
  children,
  entityName,
  modelData,
  save,
  afterSave
}: EditDialogProps) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [categoryCodes, setCategoryCodes] = useState(Array<any>)

  useEffect(() => {
    open && fetchCategoryCodes()
  }, [open])

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: modelData as Object
  })

  function fetchCategoryCodes(): void {
    DataDictService.findAll(true)
      .then(function (res) {
        const codes = uniq(map(res.data, 'categoryCode'))
        setCategoryCodes(codes.map(code => ({ label: code, value: code })))
      })
  };

  function onSubmit(formData: FormSchema): void {
    setSaving(true)
    toast.promise(save(formData), {
      loading: 'Saving ' + entityName + '...',
      success: () => {
        form.reset()
        setOpen(false)
        afterSave && afterSave(true)
        setSaving(false)
        return 'Saved ' + entityName
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
      <DialogContent className='lg:max-w-screen-sm max-h-screen overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='capitalize'>{modelData.id ? 'Update' : 'Create'} {entityName}</DialogTitle>
          { modelData.num && 
            <DialogDescription>Number: {modelData.num}</DialogDescription>
          }
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="categoryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Code</FormLabel>
                  <FormControl>
                    <Combobox
                      options={categoryCodes}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select or create a category code"
                      createable={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dictCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dictionary Code</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dictName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dictionary Name</FormLabel>
                  <FormControl>
                  <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remark</FormLabel>
                  <FormControl>
                  <Input {...field} />
                  </FormControl>
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
                {saving ? 'Saving...' : 'Save'}
                {saving && (<IconReload className="ml-1 h-4 w-4 animate-spin"/>)}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
