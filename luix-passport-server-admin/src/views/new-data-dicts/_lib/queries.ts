// import { unstable_noStore as noStore } from "next/cache"
import { type IDataDict } from "@/models/DataDict"
import { DataDictService } from '@/services/data-dict-service'

import { type GetDataDictsSchema } from "./validations"

export async function fetchTableData(input: GetDataDictsSchema) {
  // noStore()
  try {
    const {
      page,
      per_page,
      sort,
      num,
      categoryCode,
      dictCode,
      enabled,
      modifiedAt
    } = input

    // Offset to paginate the results
    const offset = (page - 1) * per_page
    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "createdAt",
      "desc",
    ]) as [keyof IDataDict | undefined, "asc" | "desc" | undefined]

    // Transaction is used to ensure both queries are executed in a single transaction
    const response = await DataDictService.find({})
    const data = response.data
    const total = 1000

    const pageCount = Math.ceil(total / per_page)
    return { data, pageCount }
  } catch (err) {
    return { data: [], pageCount: 0 }
  }
}
