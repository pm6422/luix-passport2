import http from "@/axios"

export class Oauth2ClientService {
  constructor() {
  }

  public static findAll(enabled: boolean | null = null): Promise<any> {
    return http.get('api/oauth2-clients', { params: { page: 0, size: 2000, enabled: enabled } });
  }

  public static findById(id: String): Promise<any> {
    return http.get('api/oauth2-clients/' + id);
  }

  public static create(model: any): Promise<any> {
    return http.post('api/oauth2-clients', model);
  }

  public static update(model: any): Promise<any> {
    return http.put('api/oauth2-clients', model);
  }

  public static deleteById(id: String): Promise<any> {
    return http.delete('api/oauth2-clients/' + id);
  }

  public static findClientAuthenticationMethods(): Promise<any> {
    return http.get("api/oauth2-clients/client-authentication-methods");
  }

  public static findAuthorizationGrantTypes(): Promise<any> {
    return http.get("api/oauth2-clients/authorization-grant-types");
  }

  public static findScopes(): Promise<any> {
    return http.get("api/oauth2-clients/scopes");
  }
}