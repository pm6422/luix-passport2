import { useState, useEffect } from 'react'
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { useReactTable, flexRender } from '@tanstack/react-table';
import { DataDictService } from '@/services/data-dict-service'

export default function DataDict() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    // Define your table columns here
  ];

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    const response = await axios.get(`/api/data?page=${page}&pageSize=${pageSize}`);
    setData(response.data.data);
    setTotalCount(response.data.totalCount);
    setPageCount(Math.ceil(response.data.totalCount / pageSize));
    setLoading(false);
  };

  useEffect(() => {
    fetchData(pageIndex + 1, pageSize);
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    initialState: {
      pageIndex,
      pageSize,
    },
    getCoreRowModel: (data) => data,
  });

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPageIndex(0);
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
        <DataTable
          columns={columns}
          data={data}
          totalCount={totalCount}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          isLoading={loading}
        />
        </div>
      </LayoutBody>
    </Layout>
  )
}
