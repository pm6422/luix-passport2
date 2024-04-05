import { useState, useEffect } from 'react'
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { DataTable } from '@/components/custom/data-table/server-pagination-data-table'
import { getColumns } from './custom/table-columns'
import { DataTableFacetedFilter } from '@/components/custom/data-table/data-table-faceted-filter'
import { DataDictService } from '@/services/data-dict-service'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { IconSearch } from '@tabler/icons-react'
import { YesNo } from '@/data/yes-no'
import { ICriteria } from './custom/table-schema'


export default function DataDict() {
  // State to hold the fetched data
  const [tableData, setTableData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [tableColumns, setTableColumns] = useState(Array<any>)
  const [criteria, setCriteria] = useState<ICriteria>({
    num: '',
    categoryCode: '',
    enabled: null
  })

  useEffect(() => {
    // Promise.all([DataDictService.findAll(), UserService.findAll()])
    // .then(function (results) {
    //   const dicts = results[0];
    //   const users = results[1];
    // });

    setTableColumns(getColumns(YesNo));
  }, [])

  const loadPage = (pageNo: number = 0, pageSize: number = 10, sorts: Array<string> = ['modifiedAt,desc']) => {
    DataDictService.find({
      page: pageNo,
      size: pageSize,
      sort: sorts,
      num: criteria.num || null,
      categoryCode: criteria.categoryCode || null,
      enabled: criteria.enabled,
    }).then(r => {
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
        <div className='flex items-center justify-between'>
          <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
            <Input
              placeholder='Filter by number'
              value={criteria.num}
              onChange={(event) => setCriteria({ ...criteria, num: event.target.value })}
              className='h-8 w-[90px] lg:w-[130px]'
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
          </div>
          <Button
            variant='secondary'
            onClick={() => loadPage()}
            className='h-8 px-2 lg:px-3'
          >
            <IconSearch className='mr-2 h-4 w-4' />
            Search
          </Button>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tableData} columns={tableColumns} totalCount={totalCount} totalPages={totalPages} loadPage={loadPage}/>
        </div>
      </LayoutBody>
    </Layout>
  )
}
