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
      // Load from local if failed
      return await AppInfoService.readLocalJsonFile('/src/data/app-info.json');
    }
  }

  public static async readLocalJsonFile(filePath: string): Promise<any> { 
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
