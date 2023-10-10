package com.luixtech.sso.starter.filter;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.session.SessionException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.LogoutFilter;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.util.Locale;

@Slf4j
@AllArgsConstructor
public class SsoClientLogoutFilter extends LogoutFilter {
    private final String serverUrl;

    @Override
    protected boolean preHandle(ServletRequest req, ServletResponse response) {
        HttpServletResponse res = (HttpServletResponse) response;
        res.setHeader("Access-Control-Allow-Origin", serverUrl);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Max-Age", "3600");
        res.setHeader("Access-Control-Allow-Headers", "x-requested-with");

        Subject subject = getSubject(req, res);

        // Check if POST only logout is enabled
        if (isPostOnlyLogout()) {
            // check if the current request's method is a POST, if not redirect
            if (!WebUtils.toHttp(req).getMethod().toUpperCase(Locale.ENGLISH).equals("POST")) {
                return onLogoutRequestNotAPost(req, res);
            }
        }

        //try/catch added for SHIRO-298:
        try {
            log.info("Log out for user: {}", subject.getPrincipal());
            subject.logout();
        } catch (SessionException ise) {
            log.debug("Encountered session exception during logout. This can generally safely be ignored.", ise);
        }
        return false;
    }
}
