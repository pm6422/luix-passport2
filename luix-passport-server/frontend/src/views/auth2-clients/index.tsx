import { useState, useEffect } from "react"
import { LayoutBody } from "@/layouts/layout-definitions"
import { DataTableToolbar } from "./table/table-toolbar"
import { DataTable } from "@/components/custom/data-table/client-pagination-data-table"
import { tableColumns } from "./table/table-columns"
import { type FormSchema, type CriteriaSchema } from "./table/table-schema"
import { Oauth2ClientService } from "@/services/oauth2-client-service"
import { filterTable } from "@/libs/utils"

export default function DataDict() {
  // State to hold the fetched data
  const entityName = "oauth2 client"
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    loadPage()
  }, [])

  function loadPage(criteria: CriteriaSchema = {}): void {
    if(criteria.keyword && tableData.length) {
      setTableData(filterTable(tableData, criteria.keyword))
      return
    }
    Oauth2ClientService.findAll().then(r => {
      setTableData(r.data)
    })
  }

  function save(formData: FormSchema): Promise<void> {
    const res = formData.id ? Oauth2ClientService.update(formData) : Oauth2ClientService.create(formData)
    res.then(() => {
      loadPage()
    })
    return res
  }

  function deleteRow(row: FormSchema): Promise<void> {
    if(!row.id) {
      return Promise.reject("Invalid empty id")
    }
    return Oauth2ClientService.deleteById(row.id).then(() => {
      loadPage()
    })
  }

  function deleteRows(rows: Array<FormSchema>): Promise<Array<void>> {
    return Promise.all(rows.map(deleteRow))
  }

  return (
    <LayoutBody className="flex flex-col" fixedHeight>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable 
          columns={tableColumns(entityName, save, deleteRow)} 
          data={tableData} 
          loadPage={loadPage} 
          deleteRows={deleteRows}
        >
          <DataTableToolbar entityName={entityName} loadPage={loadPage} save={save} />
        </DataTable>
      </div>
    </LayoutBody>
  )
}