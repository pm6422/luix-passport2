import axios from 'axios'


export class AppInfoService {
  private static appInfoData: any = null;

  constructor() {
  }

  public static async load(): Promise<any> {
    try {
      const res = await axios.get<any>('management/info');
      this.appInfoData = res.data;
      return this.appInfoData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public static getAppInfo(): any {
    return this.appInfoData;
  }
}
