import axios from 'axios';
import ApiService from "@/services/ApiService";
import type { IDataDict } from '@/domain/DataDict';
import type { IUser } from '@/domain/User';

export class LocalDataLoaderService {
  constructor() {
  }
  public load(fileName): Promise<any> {
    return new Promise(resolve => {
      axios
        .get<any>('/src/data/json/' + fileName)
        .then(res => {
          resolve(res.data);
        })
        .catch(() => resolve(null));
    });
  }
}

export class AppInfoService {
  constructor() {
  }

  public static async load(): Promise<any> {
    // try {
    //   const res = await ApiService.query("management/info", null);
    //   return res.data;
    // } catch (error) {
    //   return null;
    // }
    return new Promise(resolve => {
      axios
        .get<any>("management/info")
        .then(res => {
          resolve(res.data);
        })
        .catch(() => {
          // Load from local if failed
          resolve(AppInfoService.loadFromLocal());
        });
    });
  }

  public static loadFromLocal(): Promise<any> {
    return new Promise(resolve => {
      axios
        .get<any>('/src/data/json/app-info.json')
        .then(res => {
          resolve(res.data);
        })
        .catch(() => resolve(null));
    });
  }
}

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

  public static findByNum(num: String): Promise<any> {
    return ApiService.query("api/data-dicts/num/" + num, null);
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

export class AccountService {
  constructor() {
  }

  public static getCurrentAccount(): Promise<any> {
    return ApiService.query("open-api/accounts/user", null);
  }

  public static update(model: IUser): Promise<any> {
    return ApiService.put("api/accounts/user", model);
  }
}

export class UserService {
  constructor() {
  }

  public static find(reqParams: any): Promise<any> {
    return ApiService.query("api/users", { params: reqParams });
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return ApiService.query("api/users", { params: { page: 0, size: 2000, enabled: enabled } });
  }

  public static findById(id: String): Promise<any> {
    return ApiService.query("api/users/" + id, null);
  }

  public static create(model: IUser): Promise<any> {
    return ApiService.post("api/users", model);
  }

  public static update(model: IUser): Promise<any> {
    return ApiService.put("api/users", model);
  }

  public static deleteById(id: String): Promise<any> {
    return ApiService.delete("api/users/" + id);
  }
}

export class ManagementService {
  constructor() {
  }

  public static getHealth(): Promise<any> {
    return ApiService.query("management/health", {});
  }

  public static getConfiguration(): Promise<any> {
    return ApiService.query("management/configprops", {});
  }

  public static getEnv(): Promise<any> {
    return ApiService.query("management/env", {});
  }

  public static getBeans(): Promise<any> {
    return ApiService.query("management/beans", {});
  }
}