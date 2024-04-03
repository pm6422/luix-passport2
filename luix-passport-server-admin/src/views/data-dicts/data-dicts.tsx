import { useState, useEffect } from 'react'
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { DataTable } from '@/components/custom/data-table/server-pagination-data-table'
import { columns } from './custom/table-columns'
import { DataDictService } from '@/services/data-dict-service'
import { PaginationState } from '@tanstack/react-table'

export default function DataDict() {
  // State to hold the fetched data
  const [tableData, setTableData] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    // Call the fetchTableData function when component mounts
    fetchTableData();
  }, [])

  const fetchTableData = async (pageNo: number = 0, pageSize: number = 10) => {
    // Promise.all([DataDictService.findAll(), UserService.findAll()])
    // .then(function (results) {
    //   const dicts = results[0];
    //   const users = results[1];
    // });
    const r = await DataDictService.find({page: pageNo, size: pageSize});
    setTableData(r.data);

    const totalCount = parseInt(r.headers['x-total-count']);
    setTotalPages(Math.ceil(totalCount / pageSize));
  }

  const handlePaginationChange = (paginationState: PaginationState) => {
    fetchTableData(paginationState.pageIndex, paginationState.pageSize);
  }

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
          <DataTable data={tableData} columns={columns} totalPages={totalPages} onPaginationChange={handlePaginationChange}/>
        </div>
      </LayoutBody>
    </Layout>
  )
}
