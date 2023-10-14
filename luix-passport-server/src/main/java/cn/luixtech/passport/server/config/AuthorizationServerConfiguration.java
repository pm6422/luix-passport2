package cn.luixtech.passport.server.config;

import cn.luixtech.passport.server.config.oauth.DeviceClientAuthenticationConverter;
import cn.luixtech.passport.server.config.oauth.DeviceClientAuthenticationProvider;
import cn.luixtech.passport.server.config.oauth.federation.FederatedIdentityIdTokenCustomizer;
import cn.luixtech.passport.server.jose.Jwks;
import com.luixtech.uidgenerator.core.id.IdGenerator;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.JdbcOAuth2AuthorizationConsentService;
import org.springframework.security.oauth2.server.authorization.JdbcOAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationConsentService;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.client.JdbcRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher;

@Configuration(proxyBeanMethods = false)
public class AuthorizationServerConfiguration {
    public static final String AUTHORIZATION_BEARER    = "Bearer ";
    public static final String AUTHORIZATION_BASIC     = "Basic ";
    public static final String AUTH_CODE_CLIENT_ID     = "messaging-client";
    public static final String AUTH_CODE_CLIENT_SECRET = "secret";
    public static final String DEVICE_VERIFICATION_URI = "/activate";
    public static final String LOGIN_URI               = "/login";
    /**
     * Refer to Endpoint {@link org.springframework.security.oauth2.server.authorization.web.OAuth2TokenEndpointFilter}
     */
    public static final String TOKEN_URI               = "/oauth2/token";
    public static final String INTROSPECT_TOKEN_URI    = "/oauth2/introspect";
    public static final String VIEW_JWK_URI            = "/oauth2/jwks";
    public static final String REVOKE_TOKEN_URI        = "/oauth2/revoke";
    public static final String CONSENT_PAGE_URI        = "/oauth2/consent";

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain authorizationServerSecurityFilterChain(
            HttpSecurity http,
            RegisteredClientRepository registeredClientRepository,
            AuthorizationServerSettings authorizationServerSettings) throws Exception {

        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

        /*
         * This sample demonstrates the use of a public client that does not
         * store credentials or authenticate with the authorization server.
         *
         * The following components show how to customize the authorization
         * server to allow for device clients to perform requests to the
         * OAuth 2.0 Device Authorization Endpoint and Token Endpoint without
         * a clientId/clientSecret.
         *
         * CAUTION: These endpoints will not require any authentication, and can
         * be accessed by any client that has a valid clientId.
         *
         * It is therefore RECOMMENDED to carefully monitor the use of these
         * endpoints and employ any additional protections as needed, which is
         * outside the scope of this sample.
         */
        DeviceClientAuthenticationConverter deviceClientAuthenticationConverter =
                new DeviceClientAuthenticationConverter(
                        authorizationServerSettings.getDeviceAuthorizationEndpoint());
        DeviceClientAuthenticationProvider deviceClientAuthenticationProvider =
                new DeviceClientAuthenticationProvider(registeredClientRepository);

        // @formatter:off
		http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
			.deviceAuthorizationEndpoint(endpoint -> endpoint.verificationUri(DEVICE_VERIFICATION_URI))
			.deviceVerificationEndpoint(endpoint -> endpoint.consentPage(CONSENT_PAGE_URI))
			.clientAuthentication(auth ->
				auth
				.authenticationConverter(deviceClientAuthenticationConverter)
				.authenticationProvider(deviceClientAuthenticationProvider)
			)
			.authorizationEndpoint(endpoint -> endpoint.consentPage(CONSENT_PAGE_URI))
			// Enable OpenID Connect 1.0
			.oidc(Customizer.withDefaults());
		// @formatter:on

        // @formatter:off
		http
			.exceptionHandling((exceptions) -> exceptions
				.defaultAuthenticationEntryPointFor(
					new LoginUrlAuthenticationEntryPoint(LOGIN_URI),
					new MediaTypeRequestMatcher(MediaType.TEXT_HTML)
				)
			)
			.oauth2ResourceServer(server -> server.jwt(Customizer.withDefaults()));
		// @formatter:on
        return http.build();
    }

    // @formatter:off
	@Bean
	public RegisteredClientRepository registeredClientRepository(JdbcTemplate jdbcTemplate) {
		RegisteredClient registeredClient = RegisteredClient
				.withId(IdGenerator.generateId())
				.clientId(AUTH_CODE_CLIENT_ID)
//				.clientSecret("{noop}secret")
				.clientSecret("{bcrypt}"+new BCryptPasswordEncoder().encode("secret"))
				.clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
				.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
				.authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
				.authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
//				.authorizationGrantType(AuthorizationGrantType.PASSWORD)
				.redirectUri("http://127.0.0.1:4003/login/oauth2/code/messaging-client-oidc")
				.redirectUri("http://127.0.0.1:4003/authorized")
				.postLogoutRedirectUri("http://127.0.0.1:4003/logged-out")
				.scope(OidcScopes.OPENID)
				.scope(OidcScopes.PROFILE)
				.scope("message.read")
				.scope("message.write")
				.clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
				.build();

		RegisteredClient deviceClient = RegisteredClient
				.withId(IdGenerator.generateId())
				.clientId("device-messaging-client")
				.clientAuthenticationMethod(ClientAuthenticationMethod.NONE)
				.authorizationGrantType(AuthorizationGrantType.DEVICE_CODE)
				.authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
				.scope("message.read")
				.scope("message.write")
				.build();

		// Save registered client's in db as if in-memory
		JdbcRegisteredClientRepository registeredClientRepository = new JdbcRegisteredClientRepository(jdbcTemplate);
//		registeredClientRepository.save(registeredClient);
//		registeredClientRepository.save(deviceClient);

		return registeredClientRepository;
	}
	// @formatter:on

    @Bean
    public OAuth2AuthorizationService authorizationService(JdbcTemplate jdbcTemplate,
                                                           RegisteredClientRepository registeredClientRepository) {
        return new JdbcOAuth2AuthorizationService(jdbcTemplate, registeredClientRepository);
    }

    @Bean
    public OAuth2AuthorizationConsentService authorizationConsentService(JdbcTemplate jdbcTemplate,
                                                                         RegisteredClientRepository registeredClientRepository) {
        // Will be used by the ConsentController
        return new JdbcOAuth2AuthorizationConsentService(jdbcTemplate, registeredClientRepository);
    }

    @Bean
    public OAuth2TokenCustomizer<JwtEncodingContext> idTokenCustomizer() {
        return new FederatedIdentityIdTokenCustomizer();
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        RSAKey rsaKey = Jwks.generateRsa();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
    }

    @Bean
    public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
        return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
    }

    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder().build();
    }
}
