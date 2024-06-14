import axios from "axios"
import {dateTimeFormats} from "@/data/date-time-formats"
import type {AuthUser} from "@/stores/auth-user-provider"

export class AccountService {
  constructor() {
  }

  public static async getCurrentAccount(): Promise<AuthUser> {
    try {
      const res = await axios.get<AuthUser>("open-api/accounts/user")
      const dateTimeFormatInstance = dateTimeFormats.find(d => d.value === res.data.dateTimeFormat)
      if(dateTimeFormatInstance) {
        res.data.dateTimeFormatInstance = dateTimeFormatInstance
      }
      return res.data
    } catch (error) {
      console.error(error)
      return {} as AuthUser
    }
  }

  public static update(model: any): Promise<void> {
    return instance.put("api/accounts/user", model)
  }

  public static sendEmailChangeVerificationCode(email: string): Promise<void> {
    return instance.post("api/accounts/request-email-change-verification-code?email=" + email)
  }

  public static sendPasswordChangeVerificationCode(): Promise<void> {
    return instance.post("api/accounts/request-password-change-verification-code")
  }

  public static updatePassword(model: any): Promise<void> {
    return instance.put("api/accounts/password", model)
  }

  public static changeEmail(verificationCode: string): Promise<void> {
    return instance.post("api/accounts/change-email?verificationCode=" + verificationCode)
  }

  public static uploadProfilePicture(formData: FormData): Promise<void> {
    return instance.post("api/accounts/profile-pic/upload", formData)
  }

  public static async signOut(): Promise<void> {
    await instance.post("api/accounts/sign-out")
    window.location.reload()
  }
}