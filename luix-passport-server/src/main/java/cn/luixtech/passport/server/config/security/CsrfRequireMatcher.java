package cn.luixtech.passport.server.config.security;

import cn.luixtech.passport.server.utils.AuthUtils;
import com.google.common.collect.ImmutableList;
import com.luixtech.utilities.encryption.JasyptEncryptUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.net.URI;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Solve form csrf issue, add below
 * <th:input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
 */
@Slf4j
public class CsrfRequireMatcher implements RequestMatcher {
    private static final Pattern      ALLOWED_METHODS = Pattern.compile("^(GET|HEAD|TRACE|OPTIONS)$");
    private static final List<String> IGNORED_PATHS   = ImmutableList.of("swagger-ui/index.html");

    @Override
    public boolean matches(HttpServletRequest request) {
        // CSRF disabled on GET, HEAD, TRACE, OPTIONS (i.e. enabled for POST, PUT, DELETE)
        if (ALLOWED_METHODS.matcher(request.getMethod()).matches()) {
            return false;
        }

        // CSRF not required when swagger-ui is referer
        final String referer = request.getHeader("Referer");
        log.info("Referer: {}", referer);
        if (referer != null && IGNORED_PATHS.stream().anyMatch(referer::contains)) {
            String query = URI.create(referer).getQuery();
            String tokenValue = query.substring(query.indexOf("token=") + 6);
            String decryptedValue = JasyptEncryptUtils.decrypt(tokenValue);
            if (AuthUtils.getCurrentUsername().equals(decryptedValue)) {
                return false;
            }
        }
        // otherwise, CSRF is required
        return true;
    }
}