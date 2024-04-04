import { useState, useEffect } from 'react'
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { PaginationState, ColumnSort, ColumnFilter } from '@tanstack/react-table'
import { DataTable } from '@/components/custom/data-table/server-pagination-data-table'
import { getColumns } from './custom/table-columns'
import { DataTableFacetedFilter } from '@/components/custom/data-table/data-table-faceted-filter'
import { DataDictService } from '@/services/data-dict-service'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { IconX } from '@tabler/icons-react'
import { YesNo } from '@/data/yes-no'
import { parseSorts } from '@/libs/utils'

export default function DataDict() {
  // State to hold the fetched data
  const [tableData, setTableData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [tableColumns, setTableColumns] = useState(Array<any>)

  useEffect(() => {
    // Promise.all([DataDictService.findAll(), UserService.findAll()])
    // .then(function (results) {
    //   const dicts = results[0];
    //   const users = results[1];
    // });

    setTableColumns(getColumns(YesNo));
  }, [])

  const loadPage = (pagination: PaginationState, sorting: Array<ColumnSort>, filter: Array<ColumnFilter>) => {
    fetchTableData(pagination.pageIndex, pagination.pageSize, parseSorts(sorting));
  }

  const fetchTableData = (pageNo: number, pageSize: number, sorts: Array<string> = ['modifiedAt,desc']) => {
    DataDictService.find({page: pageNo, size: pageSize, sort: sorts}).then(r => {
      setTableData(r.data)
      const total = parseInt(r.headers['x-total-count'])
      setTotalCount(total)
      setTotalPages(Math.ceil(total / pageSize));
    })
  }

  return (
    <Layout>
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <AccountNav />
        </div>
      </LayoutHeader>
      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
          <Input
            placeholder='Filter by number'
            // value={(table.getColumn('num')?.getFilterValue() as string) ?? ''}
            // onChange={(event) =>
            //   table.getColumn('num')?.setFilterValue(event.target.value)
            // }
            className='h-8 w-[150px] lg:w-[250px]'
          />
          <div className='flex gap-x-2'>
            {/* {table.getColumn('enabled') && ( */}
              <DataTableFacetedFilter
                // column={table.getColumn('enabled')}
                title='Enabled'
                options={YesNo}
              />
            {/* )} */}
          </div>
          {/* {isFiltered && ( */}
            <Button
              variant='ghost'
              // onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <IconX className='ml-2 h-4 w-4' />
            </Button>
          {/* )} */}
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tableData} columns={tableColumns} totalCount={totalCount} totalPages={totalPages} loadPage={loadPage}/>
        </div>
      </LayoutBody>
    </Layout>
  )
}
