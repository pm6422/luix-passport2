package cn.luixtech.passport.server.config.security;

import cn.luixtech.passport.server.utils.AuthUtils;
import com.google.common.collect.ImmutableList;
import com.luixtech.utilities.encryption.JasyptEncryptUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.regex.Pattern;

/**
 * Solve form csrf issue, add below
 * <th:input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
 */
@Slf4j
public class CsrfRequestMatcher implements RequestMatcher {
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
            MultiValueMap<String, String> parameters = UriComponentsBuilder.fromUriString(referer).build().getQueryParams();
            if (MapUtils.isNotEmpty(parameters) && StringUtils.isNotEmpty(parameters.getFirst("token"))) {
                String tokenValue = parameters.getFirst("token");
                try {
                    String decryptedValue = JasyptEncryptUtils.decrypt(tokenValue);
                    if (AuthUtils.getCurrentUsername().equals(decryptedValue)) {
                        return false;
                    }
                } catch (Exception ex) {
                    // ignore
                }
            }
        }
        // otherwise, CSRF is required
        return true;
    }
}