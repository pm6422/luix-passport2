import axios from 'axios'

export class AppInfoService {

  constructor() {
  }

  public static async load(): Promise<any> {
    try {
      const res = await axios.get<any>('management/info');
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
