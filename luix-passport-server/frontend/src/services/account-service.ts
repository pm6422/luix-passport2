import axios from "axios"
import http from "@/axios"
import type { AuthUser } from "@/stores/auth-user-provider"

export class AccountService {
  constructor() {
  }

  public static async getCurrentAccount(): Promise<AuthUser | null> {
    try {
      const res = await axios.get<AuthUser>("open-api/accounts/user")
      return res.data
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public static update(model: any): Promise<any> {
    return http.put("api/accounts/user", model)
  }

  public static updatePassword(model: any): Promise<any> {
    return http.put("api/accounts/password", model)
  }
}