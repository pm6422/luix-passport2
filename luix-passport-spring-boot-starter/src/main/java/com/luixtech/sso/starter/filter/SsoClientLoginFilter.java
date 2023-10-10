package com.luixtech.sso.starter.filter;

import com.luixtech.springbootframework.utils.NetworkUtils;
import com.luixtech.sso.starter.utils.AuthUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.web.filter.authc.UserFilter;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@AllArgsConstructor
public class SsoClientLoginFilter extends UserFilter {
    public static final String REDIRECT_URL_PARAM = "redirect_url";
    private final       String serverUrl;
    private final       String serverLoginPath;
    private final       String successPath;

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        // If current user is NOT null, then the user is known and should be allowed access.
        return AuthUtils.getCurrentUser() != null;
    }

    @Override
    protected void redirectToLogin(ServletRequest request, ServletResponse response) throws IOException {
        String clientBaseUrl = NetworkUtils.getRequestUrl((HttpServletRequest) request);
        String redirectUrl = serverUrl + serverLoginPath + "?" + REDIRECT_URL_PARAM + "=" + clientBaseUrl + successPath;
        WebUtils.issueRedirect(request, response, redirectUrl);
        log.info("Redirect when login with URL: {}", redirectUrl);
    }
}
