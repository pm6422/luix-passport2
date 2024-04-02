import { useState, useEffect } from 'react'
import * as React from "react"
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { TasksTable } from "./_components/tasks-table"
import type { SearchParams } from "@/types"
import { searchParamsSchema } from "./_lib/validations"
import { fetchTableData } from "./_lib/queries"

export interface DataDictViewProps {
  searchParams: SearchParams
}

export default function DataDictView({ searchParams }: DataDictViewProps) {
  if(!searchParams) {
    searchParams = {}
  }
  const searchCriteria = searchParamsSchema.parse(searchParams)
  const tableDataPromise = fetchTableData(searchCriteria)

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <AccountNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {/* <DataTable data={tableData} columns={columns} /> */}
          <React.Suspense
            fallback={
              <DataTableSkeleton
                columnCount={5}
                searchableColumnCount={1}
                filterableColumnCount={2}
                cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
                shrinkZero
              />
            }
          >
            {/**
             * The `TasksTable` component is used to render the `DataTable` component within it.
             * This is done because the table columns need to be memoized, and the `useDataTable` hook needs to be called in a client component.
             * By encapsulating the `DataTable` component within the `tasktableshell` component, we can ensure that the necessary logic and state management is handled correctly.
             */}
            <TasksTable tasksPromise={tableDataPromise} />
          </React.Suspense>
        </div>
      </LayoutBody>
    </Layout>
  )
}
