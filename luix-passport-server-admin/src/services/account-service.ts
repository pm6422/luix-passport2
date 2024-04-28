import axios from 'axios'

export class AccountService {
  constructor() {
  }

  public static getCurrentAccount(): Promise<any> {
    return axios.get("open-api/accounts/user")
  }

  public static update(model: any): Promise<any> {
    return axios.put("api/accounts/user", model)
  }

  public static updatePassword(model: any): Promise<any> {
    return axios.put("api/accounts/password", model)
  }
}