import axios from 'axios'
import type { IDataDict } from '@/models/DataDict'

export class DataDictService {
  constructor() {
  }

  public static find(reqParams: any): Promise<any> {
    return axios.get("api/data-dicts", { params: reqParams });
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return axios.get("api/data-dicts", { params: { page: 0, size: 2000, enabled: enabled } });
  }

  public static lookup(categoryCode: string, enabled: boolean | null = null): Promise<any> {
    return axios.get("api/data-dicts", { params: { page: 0, size: 2000, categoryCode: categoryCode, enabled: enabled } });
  }

  public static findById(id: String): Promise<any> {
    return axios.get("api/data-dicts/" + id);
  }

  public static create(model: IDataDict): Promise<any> {
    return axios.post("api/data-dicts", model);
  }

  public static update(model: IDataDict): Promise<any> {
    return axios.put("api/data-dicts", model);
  }

  public static deleteById(id: String): Promise<any> {
    return axios.delete("api/data-dicts/" + id);
  }

  public static batchUpdate(ids: Array<string>, targetCategoryCode: string): Promise<any> {
    return axios.put("api/data-dicts/batch-update", { ids: ids, targetCategoryCode: targetCategoryCode });
  }
}