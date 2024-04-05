import { useState, useEffect } from 'react'
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { DataTable } from '@/components/custom/data-table/server-pagination-data-table'
import { getColumns } from './custom/table-columns'
import { DataDictService } from '@/services/data-dict-service'
import { YesNo } from '@/data/yes-no'
import { ICriteria } from './custom/table-schema'
import { initialCriteria } from './custom/table-schema'
import { DataTableToolbar } from './custom/table-toolbar'

export default function DataDict() {
  // State to hold the fetched data
  const [tableData, setTableData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [tableColumns, setTableColumns] = useState(Array<any>)
  const [criteria, setCriteria] = useState<ICriteria>(initialCriteria)

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
        <DataTableToolbar criteria={criteria} setCriteria={setCriteria} loadPage={loadPage} create={() => {}}></DataTableToolbar>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tableData} columns={tableColumns} totalCount={totalCount} totalPages={totalPages} loadPage={loadPage}/>
        </div>
      </LayoutBody>
    </Layout>
  )
}