import {type DataDict} from "@/domains/data-dict"
import {AxiosResponse} from "axios";

export class DataDictService {
  constructor() {
  }

  public static find(reqParams: object): Promise<AxiosResponse<Array<DataDict>>> {
    return instance.get("api/data-dicts", { params: reqParams })
  }

  public static findAll(enabled: boolean | null = null): Promise<AxiosResponse<Array<DataDict>>> {
    return instance.get("api/data-dicts", { params: { page: 0, size: 2000, enabled: enabled }})
  }

  public static lookup(categoryCode: string, enabled: boolean | null = null): Promise<AxiosResponse<Array<DataDict>>> {
    return instance.get("api/data-dicts", { params: { page: 0, size: 2000, categoryCode: categoryCode, enabled: enabled }})
  }

  public static findById(id: string): Promise<AxiosResponse<DataDict>> {
    return instance.get("api/data-dicts/" + id)
  }

  public static save(model: DataDict): Promise<void> {
    return model.id ? instance.put("api/data-dicts", model) : instance.post("api/data-dicts", model)
  }

  public static deleteById(id: string): Promise<void> {
    return instance.delete("api/data-dicts/" + id)
  }

  public static upload(formData: FormData): Promise<void> {
    return instance.post("api/data-dicts/import", formData)
  }

  public static batchUpdate(ids: Array<string>, targetCategoryCode: string): Promise<void> {
    return instance.put("api/data-dicts/batch-update", { ids: ids, targetCategoryCode: targetCategoryCode })
  }
}