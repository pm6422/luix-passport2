export interface IOauthClient {
    id: string;
    clientId: string;
    clientName: string;
    clientSecret: string;
    clientAuthenticationMethods: Array<string>;
    authorizationGrantTypes: Array<string>;
    redirectUris: Array<string>;
    postLogoutRedirectUris: Array<string>;
    scopes: Array<string>;
    clientSettings: string;
    tokenSettings: string;
    clientIdIssuedAt: string;
    clientSecretExpiresAt: string;
  }
