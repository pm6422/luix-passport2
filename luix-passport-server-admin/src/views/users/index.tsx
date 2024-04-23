import { useState, useEffect } from "react"
import { AccountNav } from "@/components/account-nav.tsx"
import { Layout, LayoutBody, LayoutHeader } from "@/layouts/layout-definitions"
import { DataTableToolbar } from "./table/table-toolbar"
import { DataTable } from "@/components/custom/data-table/server-pagination-data-table"
import { getColumns } from "./table/table-columns"
import { ICriteria } from "./table/table-schema"
import { initialCriteria } from "./table/table-schema"
import { UserService } from "@/services/user-service"
import { type FormSchema } from "./table/table-schema"

export default function DataDict() {
  // State to hold the fetched data
  const entityName = "user"
  const [tableData, setTableData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [tableColumns, setTableColumns] = useState(Array<any>)
  const [criteria, setCriteria] = useState<ICriteria>(initialCriteria)

  useEffect(() => {
    setTableColumns(getColumns(entityName, save, deleteRow))
  }, [])

  function loadPage(pageNo: number = 0, pageSize: number = 10, sorts: Array<string> = ["modifiedAt,desc"]): void {
    UserService.find({
      page: pageNo,
      size: pageSize,
      sort: sorts,
      username: criteria.username || null,
      email: criteria.email || null,
      mobileNo: criteria.mobileNo || null,
      enabled: criteria.enabled || null
    }).then(r => {
      setTableData(r.data)
      const total = parseInt(r.headers["x-total-count"])
      setTotalCount(total)
      setTotalPages(Math.ceil(total / pageSize))
    })
  }

  async function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function save(formData: FormSchema): Promise<any> {
    const res = formData.id ? await UserService.update(formData) : await UserService.create(formData)
    await sleep(1000); // Sleep for 1 seconds
    loadPage()
    return res.data
  }

  async function deleteRow(row: FormSchema): Promise<any> {
    if(!row.id) {
      return Promise.reject("No id found")
    }
    const res = UserService.deleteById(row.id).then(r => {
      loadPage()
    })
    return res
  }

  async function deleteRows(rows: Array<FormSchema>): Promise<any> {
    return Promise.all(rows.map(deleteRow))
  }

  return (
    <Layout>
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <AccountNav />
        </div>
      </LayoutHeader>
      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={tableData} columns={tableColumns} totalCount={totalCount} totalPages={totalPages} loadPage={loadPage} deleteRows={deleteRows}>
            <DataTableToolbar entityName={entityName} criteria={criteria} setCriteria={setCriteria} loadPage={loadPage} save={save} />
          </DataTable>
        </div>
      </LayoutBody>
    </Layout>
  )
}