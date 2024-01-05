package cn.luixtech.passport.server.config.oauth.authentication;

import java.util.function.Function;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.server.authorization.OAuth2Authorization;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.oidc.authentication.OidcUserInfoAuthenticationContext;
import org.springframework.security.oauth2.server.authorization.oidc.authentication.OidcUserInfoAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.AbstractOAuth2TokenAuthenticationToken;
import org.springframework.util.Assert;

/**
 * An {@link AuthenticationProvider} implementation for OpenID Connect 1.0 UserInfo Endpoint.
 *
 * @author Steve Riesenberg
 * @see OAuth2AuthorizationService
 * @see <a href="https://openid.net/specs/openid-connect-core-1_0.html#UserInfo">5.3. UserInfo Endpoint</a>
 * @since 0.2.1
 */
public final class DefaultOidcUserInfoAuthenticationProvider implements AuthenticationProvider {
    private final Log                                                       logger         = LogFactory.getLog(getClass());
    private final OAuth2AuthorizationService                                authorizationService;
    private       Function<OidcUserInfoAuthenticationContext, OidcUserInfo> userInfoMapper = new DefaultOidcUserInfoMapper();

    /**
     * Constructs an {@code OidcUserInfoAuthenticationProvider} using the provided parameters.
     *
     * @param authorizationService the authorization service
     */
    public DefaultOidcUserInfoAuthenticationProvider(OAuth2AuthorizationService authorizationService) {
        Assert.notNull(authorizationService, "authorizationService cannot be null");
        this.authorizationService = authorizationService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        OidcUserInfoAuthenticationToken authenticationToken = (OidcUserInfoAuthenticationToken) authentication;

        AbstractOAuth2TokenAuthenticationToken<?> accessTokenAuthentication = null;
        if (AbstractOAuth2TokenAuthenticationToken.class.isAssignableFrom(authenticationToken.getPrincipal().getClass())) {
            accessTokenAuthentication = (AbstractOAuth2TokenAuthenticationToken<?>) authenticationToken.getPrincipal();
        }
        if (accessTokenAuthentication == null || !accessTokenAuthentication.isAuthenticated()) {
            throw new OAuth2AuthenticationException(OAuth2ErrorCodes.INVALID_TOKEN);
        }

        String accessTokenValue = accessTokenAuthentication.getToken().getTokenValue();

        OAuth2Authorization authorization = this.authorizationService.findByToken(
                accessTokenValue, OAuth2TokenType.ACCESS_TOKEN);
        if (authorization == null) {
            throw new OAuth2AuthenticationException(OAuth2ErrorCodes.INVALID_TOKEN);
        }

        if (this.logger.isTraceEnabled()) {
            this.logger.trace("Retrieved authorization with access token");
        }

        OAuth2Authorization.Token<OAuth2AccessToken> authorizedAccessToken = authorization.getAccessToken();
        if (!authorizedAccessToken.isActive()) {
            throw new OAuth2AuthenticationException(OAuth2ErrorCodes.INVALID_TOKEN);
        }

        if (!authorizedAccessToken.getToken().getScopes().contains(OidcScopes.OPENID)) {
            throw new OAuth2AuthenticationException(OAuth2ErrorCodes.INSUFFICIENT_SCOPE);
        }

        OAuth2Authorization.Token<OidcIdToken> idToken = authorization.getToken(OidcIdToken.class);
        if (idToken == null) {
            throw new OAuth2AuthenticationException(OAuth2ErrorCodes.INVALID_TOKEN);
        }

        if (this.logger.isTraceEnabled()) {
            this.logger.trace("Validated user info request");
        }

        OidcUserInfoAuthenticationContext authenticationContext =
                OidcUserInfoAuthenticationContext.with(authenticationToken)
                        .accessToken(authorizedAccessToken.getToken())
                        .authorization(authorization)
                        .build();
        OidcUserInfo userInfo = this.userInfoMapper.apply(authenticationContext);

        if (this.logger.isTraceEnabled()) {
            this.logger.trace("Authenticated user info request");
        }

        return new OidcUserInfoAuthenticationToken(accessTokenAuthentication, userInfo);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return OidcUserInfoAuthenticationToken.class.isAssignableFrom(authentication);
    }

    /**
     * Sets the {@link Function} used to extract claims from {@link OidcUserInfoAuthenticationContext}
     * to an instance of {@link OidcUserInfo} for the UserInfo response.
     *
     * <p>
     * The {@link OidcUserInfoAuthenticationContext} gives the mapper access to the {@link OidcUserInfoAuthenticationToken},
     * as well as, the following context attributes:
     * <ul>
     * <li>{@link OidcUserInfoAuthenticationContext#getAccessToken()} containing the bearer token used to make the request.</li>
     * <li>{@link OidcUserInfoAuthenticationContext#getAuthorization()} containing the {@link OidcIdToken} and
     * {@link OAuth2AccessToken} associated with the bearer token used to make the request.</li>
     * </ul>
     *
     * @param userInfoMapper the {@link Function} used to extract claims from {@link OidcUserInfoAuthenticationContext} to an instance of {@link OidcUserInfo}
     */
    public void setUserInfoMapper(Function<OidcUserInfoAuthenticationContext, OidcUserInfo> userInfoMapper) {
        Assert.notNull(userInfoMapper, "userInfoMapper cannot be null");
        this.userInfoMapper = userInfoMapper;
    }
}
