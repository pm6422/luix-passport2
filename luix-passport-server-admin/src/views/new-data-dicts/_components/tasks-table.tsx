import * as React from "react"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

import { type fetchTableData } from "../_lib/queries"
import {
  filterableColumns,
  getColumns,
  searchableColumns,
} from "./tasks-table-columns"
// import { TasksTableFloatingBar } from "./tasks-table-floating-bar"
import { useTasksTable } from "./tasks-table-provider"
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions"

interface TasksTableProps {
  tasksPromise: any
}

export async function TasksTable({ tasksPromise }: TasksTableProps) {
  // Flags for showcasing some additional features. Feel free to remove it.
  const { enableAdvancedFilter, showFloatingBar } = useTasksTable()

  const { data, pageCount } = await tasksPromise

  // Memoize the columns so they don't re-render on every render
  // const columns = React.useMemo(() => getColumns(), [])
  const columns = getColumns()

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
    enableAdvancedFilter,
  })

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      {enableAdvancedFilter ? (
        <DataTableAdvancedToolbar
          table={table}
          filterableColumns={filterableColumns}
          searchableColumns={searchableColumns}
        >
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar
          table={table}
          filterableColumns={filterableColumns}
          searchableColumns={searchableColumns}
        >
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
      <DataTable
        table={table}
        columns={columns}
        // floatingBar={
        //   showFloatingBar ? <TasksTableFloatingBar table={table} /> : null
        // }
      />
    </div>
  )
}
