package cn.luixtech.passport.server.config.formauth.event;

import jakarta.servlet.http.HttpSessionEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Slf4j
@Component
public class FormLogoutSuccessEventListener implements Consumer<HttpSessionEvent> {
    @Override
    public void accept(HttpSessionEvent event) {
        SecurityContextHolder.getContext().getAuthentication()
        log.info("Logged out successfully for user: {}", event);
    }
}
