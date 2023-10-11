package cn.luixtech.passport.server.config.formauth.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import java.io.IOException;

@Deprecated
public class FormLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

    public FormLogoutSuccessHandler(String logoutSuccessUrl) {
        super.setDefaultTargetUrl(logoutSuccessUrl);
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request,
                                HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println();
        super.onLogoutSuccess(request, response, authentication);
    }
}