import { useState, useEffect } from 'react'
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { DataTable } from '@/components/custom/data-table/server-pagination-data-table'
import { columns } from './custom/table-columns'
import { DataDictService } from '@/services/data-dict-service'
import { PaginationState } from '@tanstack/react-table'

export default function DataDict() {
  // State to hold the fetched data
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Call the fetchTableData function when component mounts
    fetchTableData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const fetchTableData = async (page: number = 0, size: number = 10) => {
    // Promise.all([DataDictService.findAll(), UserService.findAll()])
    // .then(function (results) {
    //   const dicts = results[0];
    //   const users = results[1];
    // });
    const response = await DataDictService.find({page: page, size: size});
    setTableData(response.data);
  };

  const handlePaginationChange = (pagination: PaginationState) => {
    fetchTableData(pagination.pageIndex, pagination.pageSize);
  };


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
          <DataTable data={tableData} columns={columns} totalPages={10} onPaginationChange={handlePaginationChange}/>
        </div>
      </LayoutBody>
    </Layout>
  )
}
