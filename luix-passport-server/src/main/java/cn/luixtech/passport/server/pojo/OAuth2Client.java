//package cn.luixtech.passport.server.pojo;
//
//import cn.luixtech.passport.server.persistence.tables.pojos.Oauth2RegisteredClient;
//import com.luixtech.uidgenerator.core.id.IdGenerator;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.apache.commons.lang3.StringUtils;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.oauth2.core.AuthorizationGrantType;
//import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
//import org.springframework.security.oauth2.core.oidc.OidcScopes;
//import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
//import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
//
//import java.io.Serial;
//import java.io.Serializable;
//import java.time.Instant;
//import java.time.ZoneId;
//import java.util.Collections;
//import java.util.HashSet;
//import java.util.Optional;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import static cn.luixtech.passport.server.config.AuthorizationServerConfiguration.DEFAULT_PASSWORD_ENCODER;
//
//@Data
//@NoArgsConstructor
//public class OAuth2Client implements Serializable {
//    @Serial
//    private static final long    serialVersionUID           = 8481969837769002598L;
//    public static final  String  INTERNAL_CLIENT_ID         = "internal-client";
//    public static final  String  AUTH_CODE_CLIENT_ID        = "login-client";
//    public static final  String  INTERNAL_RAW_CLIENT_SECRET = "65G-HD9-4PD-j9F-HP5";
//    public static final  String  CLIENT_NAME                = "passport-client";
//    private              String  id;
//    private              String  clientId;
//    private              String  rawClientSecret;
//    private              Instant clientIdIssuedAt;
//    private              Instant clientSecretExpiresAt;
//    private              Integer validityInDays;
//    private              String  remarks;
//    private              Boolean enabled;
//
//    private Set<String> clientAuthenticationMethods = new HashSet<>();
//    private Set<String> authorizationGrantTypes     = new HashSet<>();
//    private Set<String> redirectUris                = new HashSet<>();
//    private Set<String> postLogoutRedirectUris      = new HashSet<>();
//    private Set<String> scopes                      = new HashSet<>();
//
//
//    public void setClientAuthenticationMethods(Set<String> clientAuthenticationMethods) {
//        if (this.clientAuthenticationMethods == null) {
//            this.clientAuthenticationMethods = clientAuthenticationMethods;
//        } else {
//            this.clientAuthenticationMethods.clear();
//            this.clientAuthenticationMethods.addAll(clientAuthenticationMethods);
//        }
//    }
//
//    public void setAuthorizationGrantTypes(Set<String> authorizationGrantTypes) {
//        if (this.authorizationGrantTypes == null) {
//            this.authorizationGrantTypes = authorizationGrantTypes;
//        } else {
//            this.authorizationGrantTypes.clear();
//            this.authorizationGrantTypes.addAll(authorizationGrantTypes);
//        }
//    }
//
//    public void setRedirectUris(Set<String> redirectUris) {
//        if (this.redirectUris == null) {
//            this.redirectUris = redirectUris;
//        } else {
//            this.redirectUris.clear();
//            this.redirectUris.addAll(redirectUris);
//        }
//    }
//
//    public void setPostLogoutRedirectUris(Set<String> postLogoutRedirectUris) {
//        if (this.postLogoutRedirectUris == null) {
//            this.postLogoutRedirectUris = postLogoutRedirectUris;
//        } else {
//            this.postLogoutRedirectUris.clear();
//            this.postLogoutRedirectUris.addAll(postLogoutRedirectUris);
//        }
//    }
//
//    public void setScopes(Set<String> scopes) {
//        if (this.scopes == null) {
//            this.scopes = scopes;
//        } else {
//            this.scopes.clear();
//            this.scopes.addAll(scopes);
//        }
//    }
//
//    /**
//     * To registered client.
//     *
//     * @return the registered client
//     */
//    public RegisteredClient toRegisteredClient() {
//        Set<String> clientAuthMethods = clientAuthenticationMethods == null ? Collections.emptySet() : clientAuthenticationMethods;
//        Set<String> oAuth2GrantTypes = authorizationGrantTypes == null ? Collections.emptySet() : authorizationGrantTypes;
//        Set<String> uris = redirectUris == null ? Collections.emptySet() : redirectUris;
//        Set<String> logoutUris = postLogoutRedirectUris == null ? Collections.emptySet() : postLogoutRedirectUris;
//        Set<String> oAuth2Scopes = scopes == null ? Collections.emptySet() : scopes;
//
//        return RegisteredClient
//                .withId(Optional.ofNullable(this.id).orElse(IdGenerator.generateId()))
//                .clientId(Optional.ofNullable(this.clientId).orElse(IdGenerator.generateId()))
//                .clientSecret(DEFAULT_PASSWORD_ENCODER + new BCryptPasswordEncoder().encode(this.getRawClientSecret()))
//                .clientIdIssuedAt(this.clientIdIssuedAt)
//                .clientAuthenticationMethods(clientAuthenticationMethodSet ->
//                        clientAuthenticationMethodSet.addAll(clientAuthMethods.stream()
//                                .map(ClientAuthenticationMethod::new)
//                                .collect(Collectors.toSet())))
//                .authorizationGrantTypes(authorizationGrantTypeSet ->
//                        authorizationGrantTypeSet.addAll(oAuth2GrantTypes.stream()
//                                .map(AuthorizationGrantType::new)
//                                .collect(Collectors.toSet())))
//                .redirectUris(redirectUriSet -> redirectUriSet.addAll(uris))
//                .postLogoutRedirectUris(postLogoutRedirectUris ->
//                        postLogoutRedirectUris.addAll(logoutUris))
//                .scopes(scopeSet -> scopeSet.addAll(oAuth2Scopes))
//                // add openid scope as default
//                .scope(OidcScopes.OPENID)
//                .clientSecretExpiresAt(this.clientSecretExpiresAt)
//                .clientName(this.remarks)
//                .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
//                .build();
//    }
//
//    /**
//     * From registeredClient to oauth2Client.
//     *
//     * @param registeredClient the registeredClient
//     * @return the oauth2Client
//     */
//    public static OAuth2Client fromRegisteredClient(Oauth2RegisteredClient registeredClient) {
//        OAuth2Client oAuth2Client = new OAuth2Client();
//        oAuth2Client.setId(registeredClient.getId());
//        oAuth2Client.setClientId(registeredClient.getClientId());
//        // Ignore clientSecret clientSecretExpiresAt
//        oAuth2Client.setRawClientSecret(StringUtils.EMPTY);
//        oAuth2Client.setClientIdIssuedAt(registeredClient.getClientIdIssuedAt().atZone(ZoneId.systemDefault()).toInstant());
//
//        oAuth2Client.setClientAuthenticationMethods(registeredClient.getClientAuthenticationMethods().split(","));
//        oAuth2Client.setAuthorizationGrantTypes(registeredClient.getAuthorizationGrantTypes()
//                .stream()
//                .map(AuthorizationGrantType::getValue)
//                .collect(Collectors.toSet()));
//        oAuth2Client.setRedirectUris(registeredClient.getRedirectUris());
//        oAuth2Client.setPostLogoutRedirectUris(registeredClient.getPostLogoutRedirectUris());
//        oAuth2Client.setScopes(registeredClient.getScopes());
//        oAuth2Client.setClientSecretExpiresAt(registeredClient.getClientSecretExpiresAt().atZone(ZoneId.systemDefault()).toInstant());
//        oAuth2Client.setRemarks(registeredClient.getClientName());
//
//        return oAuth2Client;
//    }
//}
//
