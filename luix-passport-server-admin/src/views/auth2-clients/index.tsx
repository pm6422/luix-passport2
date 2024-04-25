import { useState, useEffect } from "react"
import { AccountNav } from "@/components/account-nav.tsx"
import { Layout, LayoutHeader, LayoutBody } from "@/layouts/layout-definitions"
import { DataTableToolbar } from "./table/table-toolbar"
import { DataTable } from "@/components/custom/data-table/client-pagination-data-table"
import { getColumns } from "./table/table-columns"
import { type FormSchema, type CriteriaSchema } from "./table/table-schema"
import { Oauth2ClientService } from "@/services/oauth2-client-service"

export default function DataDict() {
  // State to hold the fetched data
  const entityName = "oauth2 client"
  const [tableColumns, setTableColumns] = useState(Array<any>)
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    setTableColumns(getColumns(entityName, save, deleteRow))
    loadPage()
  }, [])

  function loadPage(): void {
    Oauth2ClientService.findAll().then(r => {
      setTableData(r.data)
    })
  }

  function save(formData: FormSchema): Promise<any> {
    const res = formData.id ? Oauth2ClientService.update(formData) : Oauth2ClientService.create(formData)
    res.then(() => {
      loadPage()
    })
    return res
  }

  function deleteRow(row: FormSchema): Promise<any> {
    if(!row.id) {
      return Promise.reject("Invalid empty id")
    }
    return Oauth2ClientService.deleteById(row.id).then(() => {
      loadPage()
    })
  }

  function deleteRows(rows: Array<FormSchema>): Promise<any> {
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
          <DataTable columns={tableColumns} data={tableData}>
            {/* <DataTableToolbar entityName={entityName} loadPage={loadPage} save={save} /> */}
          </DataTable>
        </div>
      </LayoutBody>
    </Layout>
  )
}