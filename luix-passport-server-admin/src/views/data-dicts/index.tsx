import { useState, useEffect } from "react"
import { AccountNav } from "@/components/account-nav.tsx"
import { Layout, LayoutBody, LayoutHeader } from "@/layouts/layout-definitions"
import { DataTableToolbar } from "./table/table-toolbar"
import { DataTable } from "@/components/custom/data-table/server-pagination-data-table"
import { getColumns } from "./table/table-columns"
import { ICriteria } from "./table/table-schema"
import { initialCriteria } from "./table/table-schema"
import { DataDictService } from "@/services/data-dict-service"
import { type FormSchema } from "./table/table-schema"
import { type UploadFormSchema } from "@/components/custom/upload-dialog"

export default function DataDict() {
  // State to hold the fetched data
  const entityName = "data dictionary"
  const [tableData, setTableData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [tableColumns, setTableColumns] = useState(Array<any>)
  const [criteria, setCriteria] = useState<ICriteria>(initialCriteria)

  useEffect(() => {
    setTableColumns(getColumns(entityName, save, deleteRow))
  }, [])

  function loadPage(pageNo: number = 0, pageSize: number = 10, sorts: Array<string> = ["modifiedAt,desc"]): void {
    DataDictService.find({
      page: pageNo,
      size: pageSize,
      sort: sorts,
      num: criteria.num || null,
      categoryCode: criteria.categoryCode || null,
      enabled: criteria.enabled || null,
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
    const res = formData.id ? await DataDictService.update(formData) : await DataDictService.create(formData)
    await sleep(1000); // Sleep for 1 seconds
    loadPage()
    return res.data
  }

  async function upload(formData: UploadFormSchema): Promise<any> {
    const promises: Array<Promise<any>> = formData.files.map(file => {
      const formData = new FormData()
      formData.append("file", file)
      return DataDictService.upload(formData)
    })
    return Promise.all(promises)
  }

  async function deleteRow(row: FormSchema): Promise<any> {
    if(!row.id) {
      return;
    }
    const res = await DataDictService.deleteById(row.id)
    loadPage()
    return res.data
  }

  async function deleteRows(rows: Array<FormSchema>): Promise<any> {
    const promises: Array<Promise<any>> = rows.map(deleteRow)
    return Promise.all(promises)
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
            <DataTableToolbar entityName={entityName} criteria={criteria} setCriteria={setCriteria} loadPage={loadPage} save={save} upload={upload}/>
          </DataTable>
        </div>
      </LayoutBody>
    </Layout>
  )
}