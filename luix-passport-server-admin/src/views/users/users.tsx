import React, { useState, useEffect } from 'react'
import { AccountNav } from '@/components/account-nav.tsx'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { tasks } from './data/tasks'
import { DataDictService } from '@/services/data-dict-service'

export default function Tasks() {
  // State to hold the fetched data
  const [dataDicts, setDataDicts] = useState([]);

  useEffect(() => {
    // Function to fetch data from backend
    const fetchData = async () => {
      // Promise.all([DataDictService.findAll(), UserService.findAll()])
      // .then(function (results) {
      //   const dicts = results[0];
      //   const users = results[1];
      // });
      const response = await DataDictService.findAll();
      setDataDicts(response.data);
    };

    // Call the fetchData function when component mounts
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount


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
          <DataTable data={tasks} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  )
}
