import axios from 'axios'

export class UserService {
  constructor() {
  }

  public static find(reqParams: any): Promise<any> {
    return axios.get('open-api/users', {
      params: reqParams,
      paramsSerializer: { indexes: null }
    })
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return axios.get('open-api/users', { params: { page: 0, size: 2000, enabled: enabled } });
  }

  public static findById(id: String): Promise<any> {
    return axios.get('open-api/users/' + id);
  }

  public static create(model: any): Promise<any> {
    return axios.post('open-api/users', model);
  }

  public static update(model: any): Promise<any> {
    return axios.put('open-api/users', model);
  }

  public static deleteById(id: String): Promise<any> {
    return axios.delete('open-api/users/' + id);
  }
}