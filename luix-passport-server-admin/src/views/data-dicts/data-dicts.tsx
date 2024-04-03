import { useState, useEffect } from 'react'
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { DataTable } from '@/components/custom/data-table/server-pagination-data-table'
import { getColumns } from './custom/table-columns'
import { DataDictService } from '@/services/data-dict-service'
import { PaginationState, SortingState, ColumnFilter, ColumnDef } from '@tanstack/react-table'
import { DataDictSchema } from './custom/table-schema'
import { YesNo } from '@/data/yes-no'

export default function DataDict() {
  // State to hold the fetched data
  const [tableData, setTableData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [tableColumns, setTableColumns] = useState(Array<ColumnDef<DataDictSchema>>)

  useEffect(() => {
    // Call the fetchTableData function when component mounts
    fetchTableData();
  }, [])

  const fetchTableData = (pageNo: number = 0, pageSize: number = 10) => {
    // Promise.all([DataDictService.findAll(), UserService.findAll()])
    // .then(function (results) {
    //   const dicts = results[0];
    //   const users = results[1];
    // });
    DataDictService.find({page: pageNo, size: pageSize}).then(r => {
      setTableData(r.data)
      const total = parseInt(r.headers['x-total-count'])
      setTotalCount(total)
      setTotalPages(Math.ceil(total / pageSize));
    })

    setTableColumns(getColumns(YesNo));
  }

  const loadPage = (pagination: PaginationState, sorting: SortingState, filter: Array<ColumnFilter>) => {
    fetchTableData(pagination.pageIndex, pagination.pageSize);
  }

  return (
    <Layout>
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <AccountNav />
        </div>
      </LayoutHeader>
      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tableData} columns={tableColumns} totalCount={totalCount} totalPages={totalPages} loadPage={loadPage}/>
        </div>
      </LayoutBody>
    </Layout>
  )
}
