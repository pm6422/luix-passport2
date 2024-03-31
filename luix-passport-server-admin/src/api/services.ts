import axios from 'axios';


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
        .get<any>('management/info')
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
        .get<any>('/src/data/app-info.json')
        .then(res => {
          resolve(res.data);
        })
        .catch(() => resolve(null));
    });
  }
}
