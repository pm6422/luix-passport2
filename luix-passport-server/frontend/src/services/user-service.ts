import {type User} from "@/domains/user"
import {AxiosResponse} from "axios";

export class UserService {
  constructor() {
  }

  public static find(reqParams: object): Promise<AxiosResponse<Array<User>>> {
    return instance.get("api/users", { params: reqParams })
  }

  public static findAll(enabled: boolean | null = null): Promise<AxiosResponse<Array<User>>> {
    return instance.get("api/users", { params: { page: 0, size: 2000, enabled: enabled }})
  }

  public static findById(id: string): Promise<AxiosResponse<User>> {
    return instance.get("api/users/" + id)
  }

  public static save(model: User): Promise<void> {
    return model.id ? instance.put("api/users", model) : instance.post("api/users", model)
  }

  public static deleteById(id: string): Promise<void> {
    return instance.delete("api/users/" + id)
  }

  public static resetPassword(id: string): Promise<void> {
    return instance.put("api/users/reset-password/" + id)
  }
}