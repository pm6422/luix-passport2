import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/custom/button"
import { IconPlus, IconUpload, IconFilterSearch } from "@tabler/icons-react"
import { EditDialog } from "../dialog/edit-dialog"
import { type FormSchema, type CriteriaSchema, criteriaSchema, initialCriteriaState } from "./table-schema"
import { type UploadFormSchema } from "@/components/custom/upload-dialog"
import { DialogTrigger } from "@/components/ui/dialog"
import { UploadDialog } from "@/components/custom/upload-dialog"
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableToolbarProps{
  entityName: string,
  loadPage: (pageNo: number | undefined, pageSize: number | undefined, sorts: Array<string> | undefined, criteria: CriteriaSchema) => void,
  save: (formData: FormSchema) => Promise<any>,
  upload: (formData: UploadFormSchema) => Promise<any>
}

export function DataTableToolbar ({
  entityName,
  loadPage,
  save,
  upload
}: DataTableToolbarProps) {
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false)
  const form = useForm<CriteriaSchema>({
    resolver: zodResolver(criteriaSchema),
    defaultValues: initialCriteriaState
  })

  function onSubmit(formData: CriteriaSchema): void {
    loadPage(undefined, undefined, undefined, formData)
    setIsFilterPopoverOpen(false)
  }

  return (
    <div className="flex items-center justify-between w-full">
      <Popover open={isFilterPopoverOpen} onOpenChange={setIsFilterPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <IconFilterSearch className="size-4"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[500px] w-auto p-3 -intro-y" align="start">
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2">
                  <FormField
                    name="num"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Number</FormLabel>
                        <FormControl>
                          <Input {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="categoryCode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Category Code</FormLabel>
                        <FormControl>
                          <Input {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Enabled</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" className="max-w-20" onClick={() => form.reset()}>
                    Reset
                  </Button>
                  <Button className="max-w-20">
                    Apply
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </PopoverContent>
      </Popover>
      <div>
        <EditDialog entityName={entityName} save={save}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="mr-2">
              <IconPlus className="mr-2 size-4" aria-hidden="true" />
              Create
            </Button>
          </DialogTrigger>
        </EditDialog>
        <UploadDialog entityName={entityName} upload={upload} description="Supported file types: .txt, .json" templateUrl="open-api/data-dicts/import-template">
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="mr-2">
              <IconUpload className="mr-2 size-4" aria-hidden="true" />
              Upload
            </Button>
          </DialogTrigger>
        </UploadDialog>
      </div>
    </div>
  )
}
