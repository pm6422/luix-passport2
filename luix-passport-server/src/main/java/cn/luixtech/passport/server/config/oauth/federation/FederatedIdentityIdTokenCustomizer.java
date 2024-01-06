package cn.luixtech.passport.server.config.oauth.federation;

import cn.luixtech.passport.server.config.oauth.AuthUser;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.core.oidc.endpoint.OidcParameterNames;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.server.authorization.authentication.OAuth2AccessTokenAuthenticationToken;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * An {@link OAuth2TokenCustomizer} to map claims from a federated identity to
 * the {@code id_token} produced by this authorization server.
 */
public final class FederatedIdentityIdTokenCustomizer implements OAuth2TokenCustomizer<JwtEncodingContext> {
    @Override
    public void customize(JwtEncodingContext context) {
        if (OidcParameterNames.ID_TOKEN.equals(context.getTokenType().getValue())) {
            Map<String, Object> thirdPartyClaims = extractClaims(context.getPrincipal(), context.getAuthorizedScopes());
            context.getClaims().claims(existingClaims -> {
                // Remove conflicting claims set by this authorization server
                existingClaims.keySet().forEach(thirdPartyClaims::remove);

                // Remove standard id_token claims that could cause problems with clients
                LuixClaimNames.ID_TOKEN_CLAIMS.forEach(thirdPartyClaims::remove);

                // Add all other claims directly to id_token
                existingClaims.putAll(thirdPartyClaims);
            });
        }
    }

    private Map<String, Object> extractClaims(Authentication authentication, Set<String> authorizedScopes) {
        Map<String, Object> claims;
        if (authentication.getPrincipal() instanceof OidcUser oidcUser) {
            OidcIdToken idToken = oidcUser.getIdToken();
            claims = idToken.getClaims();
        } else if (authentication.getPrincipal() instanceof OAuth2User oauth2User) {
            claims = oauth2User.getAttributes();
        } else if (authentication.getPrincipal() instanceof AuthUser) {
            claims = new HashMap<>(32);
            appendAuthorities(claims, authentication);
            appendCommons(claims, authentication, authorizedScopes);
        } else {
            claims = Collections.emptyMap();
        }
        return new HashMap<>(claims);
    }

    private void appendAuthorities(Map<String, Object> claims, Authentication authentication) {
        if (CollectionUtils.isNotEmpty(authentication.getAuthorities())) {
            Set<String> authorities = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());
            claims.put(LuixClaimNames.CLAIM_NAMES_AUTHORITIES, authorities);
        }
    }

    private void appendCommons(Map<String, Object> claims, Authentication authentication, Set<String> authorizedScopes) {
        if (CollectionUtils.isNotEmpty(authorizedScopes)) {
            claims.put(OAuth2ParameterNames.SCOPE, authorizedScopes);
        }
        if (authentication instanceof UsernamePasswordAuthenticationToken) {
            putUserInfo(claims, authentication.getPrincipal());
        }
        if (authentication instanceof OAuth2AccessTokenAuthenticationToken) {
            Object details = authentication.getDetails();
            putUserInfo(claims, details);
        }
        claims.put("company", "https://luixtech.cn");
    }

    private void putUserInfo(Map<String, Object> claims, Object object) {
        if (object != null && object instanceof AuthUser user) {
            claims.put(StandardClaimNames.NAME, user.getUsername());
            claims.put(StandardClaimNames.EMAIL, user.getEmail());
            claims.put(StandardClaimNames.EMAIL_VERIFIED, true);
            claims.put(StandardClaimNames.PICTURE, user.getPhotoUrl());
            claims.put(StandardClaimNames.LOCALE, user.getLocale());
            claims.put(LuixClaimNames.ROLES, user.getRoles());
        }
    }
}
