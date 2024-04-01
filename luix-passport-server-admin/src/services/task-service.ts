import axios from 'axios'
import type { ITask } from '@/models/Task'

export class TaskService {
  constructor() {
  }


  public static findAll(): Promise<any> {
    return axios.get("open-api/tasks", { params: { page: 0, size: 2000 } });
  }

}