package cn.luixtech.passport.server.config.formauth.handler;

import cn.luixtech.passport.server.config.AuthUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import java.io.IOException;
import java.util.function.Consumer;

public class FormLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private Consumer<AuthUser> signedInListener;

    public FormLoginSuccessHandler(Consumer signedInListener) {
        this.signedInListener = signedInListener;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        // todo: convert
        signedInListener.accept(null);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
