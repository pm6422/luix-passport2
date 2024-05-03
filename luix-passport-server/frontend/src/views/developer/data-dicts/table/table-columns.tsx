import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { IconEdit } from "@tabler/icons-react"
import { DataTableColumnHeader } from "@/components/custom/data-table/data-table-column-header"
import { DataTableRowActions } from "@/components/custom/data-table/data-table-row-actions"
import { Button } from "@/components/custom/button"
import { yesNo } from "@/data/yes-no"
import { DialogTrigger } from "@/components/ui/dialog"
import { FormSchema } from "./table-schema"
import { EditDialog } from "../dialog/edit-dialog"
import { formatDateTime } from "@/libs/utils"

export function getColumns(
  entityName: string,
  save: (formData: any) => Promise<any>,
  deleteRow: (row: any) => Promise<any>
): ColumnDef<FormSchema>[] {

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
      accessorKey: "num",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Number" />
      ),
      cell: ({ row }) => <div className="w-[30px]">{row.getValue("num")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "categoryCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category Code" />
      ),
      cell: ({ row }) => <div className="w-[50px]">{row.getValue("categoryCode")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "dictCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dictionary Code" />
      ),
      cell: ({ row }) => <div className="w-[50px]">{row.getValue("dictCode")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "dictName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dictionary Name" />
      ),
      cell: ({ row }) => <div className="w-[50px]">{row.getValue("dictName")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "remark",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Remark" />
      ),
      cell: ({ row }) => <div className="w-[150px]">{row.getValue("remark")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "enabled",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Enabled" />
      ),
      cell: ({ row }) => {
        const element = yesNo.find(e => e.value === row.getValue("enabled"))

        return (
          <div className="flex w-[50px] items-center">
            {element && element.icon && (
              <element.icon className="mr-2 size-5 text-muted-foreground" />
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
      accessorKey: "modifiedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Modified At" />
      ),
      cell: ({ row }) => <div className="w-[150px]">{formatDateTime(row.getValue("modifiedAt"))}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions entityName={entityName} row={row} deleteRow={deleteRow}>
          <EditDialog entityName={entityName} id={row.original.id} save={save}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="flex size-8 p-0">
                <IconEdit className="size-4" />
                <span className="sr-only">Update</span>
              </Button>
            </DialogTrigger>
          </EditDialog>
        </DataTableRowActions>
      )
    }
  ]
}
