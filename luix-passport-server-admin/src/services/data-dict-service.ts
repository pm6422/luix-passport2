import axios from 'axios'
import ApiService from "@/services/api-service"
import type { IDataDict } from '@/domain/DataDict'
export class DataDictService {
  constructor() {
  }

  public static find(reqParams: any): Promise<any> {
    return ApiService.query("api/data-dicts", { params: reqParams });
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return ApiService.query("api/data-dicts", { params: { page: 0, size: 2000, enabled: enabled } });
  }

  public static lookup(categoryCode: string, enabled: boolean | null = null): Promise<any> {
    return ApiService.query("api/data-dicts", { params: { page: 0, size: 2000, categoryCode: categoryCode, enabled: enabled } });
  }

  public static findById(id: String): Promise<any> {
    return ApiService.query("api/data-dicts/" + id, null);
  }

  public static create(model: IDataDict): Promise<any> {
    return ApiService.post("api/data-dicts", model);
  }

  public static update(model: IDataDict): Promise<any> {
    return ApiService.put("api/data-dicts", model);
  }

  public static deleteById(id: String): Promise<any> {
    return ApiService.delete("api/data-dicts/" + id);
  }

  public static batchUpdate(ids: Array<string>, targetCategoryCode: string): Promise<any> {
    return ApiService.put("api/data-dicts/batch-update", { ids: ids, targetCategoryCode: targetCategoryCode });
  }
}