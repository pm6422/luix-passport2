import http from "@/axios"

export class UserService {
  constructor() {
  }

  public static find(reqParams: any): Promise<any> {
    return http.get("api/users", { params: reqParams })
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return http.get("api/users", { params: { page: 0, size: 2000, enabled: enabled }})
  }

  public static findById(id: String): Promise<any> {
    return http.get("api/users/" + id)
  }

  public static create(model: any): Promise<any> {
    return http.post("api/users", model)
  }

  public static update(model: any): Promise<any> {
    return http.put("api/users", model)
  }

  public static deleteById(id: String): Promise<any> {
    return http.delete("api/users/" + id)
  }
}