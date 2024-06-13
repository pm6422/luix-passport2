import http from "@/axios"
import { type User } from "@/domains/user"
import {AxiosResponse} from "axios";

export class UserService {
  constructor() {
  }

  public static find(reqParams: object): Promise<any> {
    return http.get("api/users", { params: reqParams })
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return http.get("api/users", { params: { page: 0, size: 2000, enabled: enabled }})
  }

  public static findById(id: string): Promise<AxiosResponse<User>> {
    return http.get("api/users/" + id)
  }

  public static create(model: User): Promise<void> {
    return http.post("api/users", model)
  }

  public static update(model: User): Promise<void> {
    return http.put("api/users", model)
  }

  public static save(model: User): Promise<void> {
    return model.id ? this.create(model) : this.update(model)
  }

  public static deleteById(id: string): Promise<void> {
    return http.delete("api/users/" + id)
  }

  public static resetPassword(id: string): Promise<void> {
    return http.put("api/users/reset-password/" + id)
  }
}