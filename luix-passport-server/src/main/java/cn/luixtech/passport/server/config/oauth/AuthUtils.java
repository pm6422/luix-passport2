package cn.luixtech.passport.server.config.oauth;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.OAuth2AccessToken;

import java.util.Arrays;


/**
 * Utility class for Spring Security.
 */
@Slf4j
public abstract class AuthUtils {
    /**
     * Get the name of the current logged user.
     */
    public static String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = null;
        if (authentication != null) {
            if (authentication.getPrincipal() instanceof User) {
                User springSecurityUser = (User) authentication.getPrincipal();
                username = springSecurityUser.getUsername();
            } else if (authentication.getPrincipal() instanceof String) {
                username = (String) authentication.getPrincipal();
            }
        }
        return username;
    }

    /**
     * Get the current logged user.
     */
    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = null;
        if (authentication != null) {
            if (authentication.getPrincipal() instanceof User) {
                user = (User) authentication.getPrincipal();
            } else if (authentication.getPrincipal() instanceof String) {
                user = new User((String) authentication.getPrincipal(), "protected",
                        Arrays.asList(new SimpleGrantedAuthority("unknown")));
            }
        }
        return user;
    }

    /**
     * Get access token from {@link HttpServletRequest}.
     *
     * @param request the request to extract the token from
     * @return the token if found, or empty string if not found
     */
    public static String getAccessToken(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.isNotEmpty(token) && token.toLowerCase().startsWith(OAuth2AccessToken.TokenType.BEARER.getValue().toLowerCase())) {
            return StringUtils.substringAfter(token, OAuth2AccessToken.TokenType.BEARER.getValue()).trim();
        }
        log.warn("Couldn't find access token in request headers!");
        return StringUtils.EMPTY;
    }
}
