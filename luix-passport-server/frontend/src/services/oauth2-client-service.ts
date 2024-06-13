import http from "@/axios"
import { type Auth2Client } from "@/domains/auth2-client"

export class Oauth2ClientService {
  constructor() {
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return http.get("api/oauth2-clients", { params: { page: 0, size: 2000, enabled: enabled } })
  }

  public static findById(id: string): Promise<any> {
    return http.get("api/oauth2-clients/" + id)
  }

  public static create(model: Auth2Client): Promise<void> {
    return http.post("api/oauth2-clients", model)
  }

  public static update(model: Auth2Client): Promise<void> {
    return http.put("api/oauth2-clients", model)
  }

  public static deleteById(id: string): Promise<void> {
    return http.delete("api/oauth2-clients/" + id)
  }

  public static findClientAuthenticationMethods(): Promise<any> {
    return http.get("api/oauth2-clients/client-authentication-methods")
  }

  public static findAuthorizationGrantTypes(): Promise<any> {
    return http.get("api/oauth2-clients/authorization-grant-types")
  }

  public static findScopes(): Promise<any> {
    return http.get("api/oauth2-clients/scopes")
  }
}