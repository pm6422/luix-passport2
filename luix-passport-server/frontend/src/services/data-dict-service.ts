import http from "@/axios"
import { type DataDict } from "@/domains/data-dict"
import {AxiosResponse} from "axios";

export class DataDictService {
  constructor() {
  }

  public static find(reqParams: object): Promise<any> {
    return http.get("api/data-dicts", { params: reqParams })
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return http.get("api/data-dicts", { params: { page: 0, size: 2000, enabled: enabled }})
  }

  public static lookup(categoryCode: string, enabled: boolean | null = null): Promise<any> {
    return http.get("api/data-dicts", { params: { page: 0, size: 2000, categoryCode: categoryCode, enabled: enabled }})
  }

  public static findById(id: string): Promise<AxiosResponse<DataDict>> {
    return http.get("api/data-dicts/" + id)
  }

  public static create(model: DataDict): Promise<void> {
    return http.post("api/data-dicts", model)
  }

  public static update(model: DataDict): Promise<void> {
    return http.put("api/data-dicts", model)
  }

  public static save(model: DataDict): Promise<void> {
    return model.id ? this.create(model) : this.update(model)
  }

  public static deleteById(id: string): Promise<void> {
    return http.delete("api/data-dicts/" + id)
  }

  public static upload(formData: FormData): Promise<void> {
    return http.post("api/data-dicts/import", formData)
  }

  public static batchUpdate(ids: Array<string>, targetCategoryCode: string): Promise<void> {
    return http.put("api/data-dicts/batch-update", { ids: ids, targetCategoryCode: targetCategoryCode })
  }
}