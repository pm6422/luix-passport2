"use client"

import * as React from "react"
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { getErrorMessage } from "@/libs/handle-error"
import { formatDate } from "@/libs/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataDict } from './_lib/validations'
import { formatDateTime } from '@/libs/utils'
import { YesNo } from '@/data/yes-no'
import { updateTask } from "../_lib/actions"
import { DeleteTasksDialog } from "./delete-tasks-dialog"

export const searchableColumns: DataTableSearchableColumn<DataDict>[] = [
  {
    id: "title",
    placeholder: "Filter titles...",
  },
]

export const filterableColumns: DataTableFilterableColumn<DataDict>[] = [
  {
    id: "enabled",
    title: "Enabled",
    options: [],
  }
]

export function getColumns(): ColumnDef<DataDict>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'num',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Number' />
      ),
      cell: ({ row }) => <div className='w-[30px]'>{row.getValue('num')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'categoryCode',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Category Code' />
      ),
      cell: ({ row }) => <div className='w-[50px]'>{row.getValue('categoryCode')}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'dictCode',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Dictionary Code' />
      ),
      cell: ({ row }) => <div className='w-[50px]'>{row.getValue('dictCode')}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'dictName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Dictionary Name' />
      ),
      cell: ({ row }) => <div className='w-[50px]'>{row.getValue('dictName')}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'remark',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Remark' />
      ),
      cell: ({ row }) => <div className='w-[100px]'>{row.getValue('remark')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'enabled',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Enabled' />
      ),
      cell: ({ row }) => {
        const element = YesNo.find(
          (element) => element.value === row.getValue('enabled')
        )
  
        return (
          <div className='flex w-[100px] items-center'>
            {element && element.icon && (
              <element.icon className='mr-2 h-4 w-4 text-muted-foreground' />
            )}
            <span>{element && element.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'modifiedAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Modified At' />
      ),
      cell: ({ row }) => <div className='w-[150px]'>{formatDateTime(row.getValue('modifiedAt'))}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] =
          React.useState(false)

        return (
          <>
            <DeleteTasksDialog
              open={showDeleteTaskDialog}
              onOpenChange={setShowDeleteTaskDialog}
              tasks={[row]}
              showTrigger={false}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={row.original.label}
                      onValueChange={(value) => {
                        startUpdateTransition(() => {
                          toast.promise(
                            updateTask({
                              id: row.original.id,
                              label: value as Task["label"],
                            }),
                            {
                              loading: "Updating...",
                              success: "Label updated",
                              error: (err) => getErrorMessage(err),
                            }
                          )
                        })
                      }}
                    >
                      {tasks.label.enumValues.map((label) => (
                        <DropdownMenuRadioItem
                          key={label}
                          value={label}
                          className="capitalize"
                          disabled={isUpdatePending}
                        >
                          {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteTaskDialog(true)}
                >
                
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent> */}
            </DropdownMenu>
          </>
        )
      },
    },
  ]
}
