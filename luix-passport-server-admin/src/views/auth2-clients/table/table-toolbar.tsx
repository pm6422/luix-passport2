import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/custom/button"
import { IconPlus } from "@tabler/icons-react"
import { EditDialog } from "../dialog/edit-dialog"
import { type FormSchema, type CriteriaSchema, criteriaSchema, initialCriteriaState } from "./table-schema"
import { DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"

interface DataTableToolbarProps{
  entityName: string,
  loadPage: (criteria: CriteriaSchema) => void,
  save: (formData: FormSchema) => Promise<any>
}

export function DataTableToolbar ({
  entityName,
  loadPage,
  save
}: DataTableToolbarProps) {
  const form = useForm<CriteriaSchema>({
    resolver: zodResolver(criteriaSchema),
    defaultValues: initialCriteriaState
  })

  function onSubmit(formData: CriteriaSchema): void {
    loadPage(formData)
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
              <FormField
                name="keyword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Filter by keyword" onKeyDown={e => e.key === 'Enter' ? form.handleSubmit(onSubmit) : ''}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </form>
        </Form>
      </div>
      <div className="space-x-2">
        <EditDialog entityName={entityName} save={save}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm">
              <IconPlus className="mr-2 size-4" aria-hidden="true" />
              Create
            </Button>
          </DialogTrigger>
        </EditDialog>
      </div>
    </div>
  )
}
