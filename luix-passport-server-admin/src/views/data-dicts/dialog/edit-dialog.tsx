import { useState, useEffect, useTransition} from 'react'
// import { tasks, type Task } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconPlus } from '@tabler/icons-react'
import { type Row } from "@tanstack/react-table"
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

// import { createTask } from "../_lib/actions"
import { createSchema, type CreateSchema } from '../table/table-schema'
import { DataDictService } from '@/services/data-dict-service'
import { map, uniq } from 'lodash'

interface CreateDialogProps {
  // prevTasks: Row<Task>[]
  create: () => void
}

export function EditDialog({ 
  create
}: CreateDialogProps) {
  const [open, setOpen] = useState(false)
  const [categoryCodes, setCategoryCodes] = useState([])
  const [isCreatePending, startCreateTransition] = useTransition()

  useEffect(() => {
    DataDictService.findAll(true)
    .then(function (res) {
      const codes = uniq(map(res.data, 'categoryCode'))
      setCategoryCodes(codes)  
    })
  }, [])

  const form = useForm<CreateSchema>({
    resolver: zodResolver(createSchema),
  })

  function onSubmit(input: CreateSchema) {
    // const anotherTaskId =
    //   prevTasks[Math.floor(Math.random() * prevTasks.length)]?.id

    // if (!anotherTaskId) return

    startCreateTransition(() => {
      // toast.promise(
      //   createTask({
      //     ...input,
      //     anotherTaskId,
      //   }),
      //   {
      //     loading: "Creating task...",
      //     success: () => {
      //       form.reset()
      //       setOpen(false)
      //       return "Task created"
      //     },
      //     error: (error) => {
      //       setOpen(false)
      //       return getErrorMessage(error)
      //     },
      //   }
      // )
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="mr-2" onClick={() => create()}>
          <IconPlus className="mr-2 size-4" aria-hidden="true" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Data Dictionary</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new data dictionary.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
            {/* <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select a label" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {tasks.label.enumValues.map((item) => (
                          <SelectItem
                            key={item}
                            value={item}
                            className="capitalize"
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {tasks.status.enumValues.map((item) => (
                          <SelectItem
                            key={item}
                            value={item}
                            className="capitalize"
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
            /> */}
            {/* <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {tasks.priority.enumValues.map((item) => (
                          <SelectItem
                            key={item}
                            value={item}
                            className="capitalize"
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
            /> */}
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isCreatePending}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
