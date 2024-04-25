import axios from 'axios'

export class Oauth2ClientService {
  constructor() {
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return axios.get('open-api/oauth2-clients', { params: { page: 0, size: 2000, enabled: enabled } });
  }

  public static findById(id: String): Promise<any> {
    return axios.get('open-api/oauth2-clients/' + id);
  }

  public static create(model: any): Promise<any> {
    return axios.post('open-api/oauth2-clients', model);
  }

  public static update(model: any): Promise<any> {
    return axios.put('open-api/oauth2-clients', model);
  }

  public static deleteById(id: String): Promise<any> {
    return axios.delete('open-api/oauth2-clients/' + id);
  }
}