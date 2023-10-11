package cn.luixtech.passport.server.config.formauth.event;

import jakarta.servlet.http.HttpSessionEvent;
import lombok.AllArgsConstructor;
import org.springframework.security.web.session.HttpSessionEventPublisher;

@AllArgsConstructor
public class LogoutHttpSessionEventPublisher extends HttpSessionEventPublisher {

    private final FormLogoutSuccessEventListener formLogoutSuccessEventListener;

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        super.sessionDestroyed(event);
        formLogoutSuccessEventListener.accept(event);
    }
}
