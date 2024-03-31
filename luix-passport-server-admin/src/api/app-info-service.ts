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
      // Load from local if failed
      this.appInfoData = await AppInfoService.readLocalJsonFile('/src/data/app-info.json');
      return this.appInfoData;
    }
  }

  public static getAppInfo(): any {
    return this.appInfoData;
  }

  private static async readLocalJsonFile(filePath: string): Promise<any> { 
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('Failed to fetch JSON file');
        }
        return await response.json();
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
  }
}
