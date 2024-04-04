import { useState, useEffect } from 'react'
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { DataTable } from '@/components/custom/data-table/server-pagination-data-table'
import { getColumns } from './custom/table-columns'
import { DataDictService } from '@/services/data-dict-service'
import { PaginationState, ColumnSort, ColumnFilter } from '@tanstack/react-table'
import { YesNo } from '@/data/yes-no'

export default function DataDict() {
  // State to hold the fetched data
  const [tableData, setTableData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [tableColumns, setTableColumns] = useState(Array<any>)

  // useEffect(() => {
  //   // Call the fetchTableData function when component mounts
  //   fetchTableData();
  // }, [])

  const loadPage = (pagination: PaginationState, sorting: Array<ColumnSort>, filter: Array<ColumnFilter>) => {
    var sorts = undefined;
    if(sorting && sorting.length > 0) {
      sorts = []
      sorting.forEach(sort => {
        sorts.push(`${sort.id},${sort.desc ? 'desc' : 'asc'}`)
      })
    }
    fetchTableData(pagination.pageIndex, pagination.pageSize, sorts);
  }

  const fetchTableData = (pageNo: number, pageSize: number, sorts: Array<string> = ['modifiedAt,desc']) => {
    // Promise.all([DataDictService.findAll(), UserService.findAll()])
    // .then(function (results) {
    //   const dicts = results[0];
    //   const users = results[1];
    // });

    DataDictService.find({page: pageNo, size: pageSize, sort: sorts}).then(r => {
      setTableData(r.data)
      const total = parseInt(r.headers['x-total-count'])
      setTotalCount(total)
      setTotalPages(Math.ceil(total / pageSize));
    })

    setTableColumns(getColumns(YesNo));
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
