package cn.luixtech.passport.server.config.security;

import com.google.common.collect.ImmutableList;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.List;
import java.util.regex.Pattern;

/**
 * Solve form csrf issue, add below
 * <th:input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
 */
@Slf4j
public class CsrfRequireMatcher implements RequestMatcher {
    private static final Pattern      ALLOWED_METHODS    = Pattern.compile("^(GET|HEAD|TRACE|OPTIONS)$");
    private static final List<String> LOCALHOST_PATTERNS = ImmutableList.of("127.0.0.1", "0:0:0:0:0:0:0:1");
    private static final List<String> IGNORED_PATHS      = ImmutableList.of("swagger-ui/index.html");

    @Override
    public boolean matches(HttpServletRequest request) {
        // CSRF disabled on GET, HEAD, TRACE, OPTIONS (i.e. enabled for POST, PUT, DELETE)
        if (ALLOWED_METHODS.matcher(request.getMethod()).matches()) {
            return false;
        }

        // CSRF not required on localhost when swagger-ui is referer
        final String remoteHost = request.getRemoteHost();
        log.info("Remote host: {}", remoteHost);
        final String referer = request.getHeader("Referer");
        log.info("Referer: {}", referer);
        if (remoteHost != null
                && referer != null
                && LOCALHOST_PATTERNS.contains(remoteHost)
                && IGNORED_PATHS.stream().anyMatch(referer::contains)) {
            return false;
        }
        // otherwise, CSRF is required
        return true;
    }
}