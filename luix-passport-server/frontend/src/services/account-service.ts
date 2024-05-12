import axios from "axios"
import http from "@/axios"
import { dateFormats } from "@/data/date-formats"
import type { AuthUser } from "@/stores/auth-user-provider"

export class AccountService {
  constructor() {
  }

  public static async getCurrentAccount(): Promise<AuthUser> {
    try {
      const res = await axios.get<AuthUser>("open-api/accounts/user")
      const dateFormatInstance = dateFormats.find(d => d.value === res.data.dateFormat)
      if(dateFormatInstance) {
        res.data.dateFormatInstance = dateFormatInstance
      }
      return res.data
    } catch (error) {
      console.error(error)
      return {} as AuthUser
    }
  }

  public static update(model: any): Promise<any> {
    return http.put("api/accounts/user", model)
  }

  public static sendEmailChangeVerificationCode(email: string): Promise<any> {
    return http.post("api/accounts/request-email-change-verification-code?email=" + email)
  }

  public static sendPasswordChangeVerificationCode(): Promise<any> {
    return http.post("api/accounts/request-password-change-verification-code")
  }

  public static updatePassword(model: any): Promise<any> {
    return http.put("api/accounts/password", model)
  }

  public static changeEmail(verificationCode: string): Promise<any> {
    return http.post("api/accounts/change-email?verificationCode=" + verificationCode)
  }

  public static uploadProfilePicture(formData: FormData): Promise<any> {
    return http.post("api/accounts/profile-pic/upload", formData)
  }
}