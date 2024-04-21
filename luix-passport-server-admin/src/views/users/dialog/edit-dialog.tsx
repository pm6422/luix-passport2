import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getErrorMessage } from '@/libs/handle-error'
import { Button } from '@/components/custom/button'
import { IconReload } from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import Combobox from '@/components/custom/combobox'
import { formSchema, type FormSchema } from '../table/table-schema'
import { DataDictService } from '@/services/data-dict-service'

interface EditDialogProps {
  children: React.ReactNode,
  entityName: string,
  formData: FormSchema,
  save: (formData: FormSchema) => Promise<any>,
  afterSave?: (success: boolean) => void
}

export function EditDialog({
  children,
  entityName,
  formData,
  save,
  afterSave
}: EditDialogProps) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [enabledRoles, setEnabledRoles] = useState(Array<any>)

  useEffect(() => {
    DataDictService.lookup('role', true).then(r => {
      setEnabledRoles(r.data.map((item: any) => ({ label: item.dictCode, value: item.dictCode })))
    })
  }, [])

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formData as Object
  })

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
          <DialogTitle className='capitalize'>{formData.id ? 'Update' : 'Create'} {entityName}</DialogTitle>
        </DialogHeader>
        <Separator/>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={formData.id ? true : false}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile No</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                      <SelectItem value='English'>English</SelectItem>
                      <SelectItem value='Chinese'>Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage/>
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
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
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
