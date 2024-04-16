import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"
import { Button } from "@/components/custom/button"
import {
  DialogClose,
  DialogFooter,
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

interface DialogProps {
  entityName: string,
  modelData: object,
  save: (formData: SaveSchema) => Promise<any>,
  closeDialog: () => void
}

export function DialogForm({ 
  entityName,
  modelData,
  save,
  closeDialog
}: DialogProps) {
  const [saving, setSaving] = useState(false)
  const [categoryCodes, setCategoryCodes] = useState(Array<any>)

  useEffect(() => {
    DataDictService.findAll(true)
    .then(function (res) {
      const codes = uniq(map(res.data, 'categoryCode'))
      setCategoryCodes(codes)  
    })
  }, [])

  const form = useForm<SaveSchema>({
    resolver: zodResolver(saveSchema),
    defaultValues: modelData
  })

  function onSubmit(formData: SaveSchema) {
    setSaving(true)
    toast.promise(save(formData), {
      loading: "Saving " + entityName + "...",
      success: () => {
        form.reset()
        closeDialog()
        setSaving(false)
        return "Saved " + entityName
      },
      error: (error) => {
        closeDialog()
        setSaving(false)
        return getErrorMessage(error)
      }
    })
  }

  return (
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category code" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {categoryCodes.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                <Input {...field} />
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={saving}>Save</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
