import axios from "axios"
import type { AuthUser } from "@/stores/auth-user-provider"

export class AccountService {
  constructor() {
  }

  public static async getCurrentAccount(): Promise<any> {
    try {
      const res = await axios.get<AuthUser>("open-api/accounts/user")
      return res.data
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  public static update(model: any): Promise<any> {
    return axios.put("api/accounts/user", model)
  }

  public static updatePassword(model: any): Promise<any> {
    return axios.put("api/accounts/password", model)
  }
}